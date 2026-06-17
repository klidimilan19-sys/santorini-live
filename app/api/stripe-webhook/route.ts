import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requestRepository } from "@/lib/request-repository";
import { stripeConfig } from "@/lib/stripe-checkout";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  if (!stripeConfig.webhookSecret) {
    return NextResponse.json(
      { configured: false, message: "Set STRIPE_WEBHOOK_SECRET before enabling Stripe webhook verification." },
      { status: 501 },
    );
  }

  if (!isValidStripeSignature(rawBody, signature, stripeConfig.webhookSecret)) {
    return NextResponse.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as {
    type?: string;
    data?: { object?: { id?: string; payment_status?: string; status?: string; metadata?: { requestId?: string } } };
  };

  if (event.type === "checkout.session.completed") {
    const session = event.data?.object;
    if (session?.metadata?.requestId && (session.payment_status === "paid" || session.status === "complete")) {
      requestRepository.markPaid(session.metadata.requestId);
    }
  }

  return NextResponse.json({ received: true });
}

function isValidStripeSignature(rawBody: string, signatureHeader: string, secret: string) {
  const entries = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key, value];
    }),
  );
  const timestamp = entries.t;
  const signature = entries.v1;
  if (!timestamp || !signature) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
