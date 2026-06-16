import { NextResponse } from "next/server";
import { stripeConfig } from "@/lib/stripe-checkout";

export async function POST() {
  if (!stripeConfig.webhookSecret) {
    return NextResponse.json(
      { configured: false, message: "Set STRIPE_WEBHOOK_SECRET before enabling real webhook processing." },
      { status: 501 },
    );
  }

  return NextResponse.json({ configured: true, message: "Replace mock handler with Stripe signature verification and request payment updates." });
}
