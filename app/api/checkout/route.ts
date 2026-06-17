import { NextRequest, NextResponse } from "next/server";
import { requestRepository } from "@/lib/request-repository";
import { stripeCheckoutProvider, stripeConfig } from "@/lib/stripe-checkout";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { requestId?: string };
  const submission = requestRepository.get(body.requestId ?? "");
  if (!submission) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }
  if (submission.paymentStatus === "Paid") {
    return NextResponse.json({ error: "Request is already paid." }, { status: 400 });
  }

  try {
    const session = await stripeCheckoutProvider.createCheckoutSession({
      requestId: submission.id,
      packageId: submission.packageId,
      origin: request.nextUrl.origin,
    });
    requestRepository.setStripeSession(submission.id, session.sessionId);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout could not be created." },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id") ?? "";
  const requestId = request.nextUrl.searchParams.get("requestId") ?? "";

  if (sessionId.startsWith("mock_")) {
    const updated = requestRepository.markPaid(requestId);
    return updated
      ? NextResponse.json(updated)
      : NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  if (!sessionId || !stripeConfig.secretKey) {
    return NextResponse.json({ error: "Stripe session cannot be confirmed." }, { status: 400 });
  }

  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${stripeConfig.secretKey}` },
  });
  const session = await response.json() as {
    id?: string;
    payment_status?: string;
    status?: string;
    metadata?: { requestId?: string };
    error?: { message?: string };
  };

  if (!response.ok || !session.id) {
    return NextResponse.json({ error: session.error?.message ?? "Stripe session not found." }, { status: 400 });
  }

  if (session.payment_status === "paid" || session.status === "complete") {
    const updated = requestRepository.markPaid(session.metadata?.requestId ?? "");
    return updated
      ? NextResponse.json(updated)
      : NextResponse.json({ error: "Request not found for Stripe session." }, { status: 404 });
  }

  return NextResponse.json({ error: "Payment is not complete yet." }, { status: 409 });
}
