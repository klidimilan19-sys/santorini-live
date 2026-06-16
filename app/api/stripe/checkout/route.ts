import { NextRequest, NextResponse } from "next/server";
import { requestRepository } from "@/lib/request-repository";
import { stripeCheckoutProvider } from "@/lib/stripe-checkout";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { requestId?: string };
  const submission = requestRepository.get(body.requestId ?? "");
  if (!submission) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  const session = await stripeCheckoutProvider.createCheckoutSession({
    requestId: submission.id,
    packageId: submission.packageId,
    origin: request.nextUrl.origin,
  });
  return NextResponse.json(session);
}
