import { getAdvertisingPackage } from "@/data/advertising";

export type CheckoutSessionInput = {
  requestId: string;
  packageId: string;
  origin: string;
};

export interface StripeCheckoutProvider {
  createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string; sessionId: string; mode: "mock" | "stripe" }>;
}

export class StripeRestCheckoutProvider implements StripeCheckoutProvider {
  async createCheckoutSession(input: CheckoutSessionInput) {
    const selectedPackage = getAdvertisingPackage(input.packageId);
    if (!selectedPackage) throw new Error("Unknown advertising package.");
    if (!stripeConfig.secretKey) {
      const sessionId = `mock_${crypto.randomUUID()}`;
      return {
        url: `${input.origin}/payment-success?requestId=${encodeURIComponent(input.requestId)}&session_id=${sessionId}`,
        sessionId,
        mode: "mock" as const,
      };
    }

    const params = new URLSearchParams({
      mode: selectedPackage.billing === "month" ? "subscription" : "payment",
      success_url: `${input.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${input.origin}/payment-cancelled?requestId=${encodeURIComponent(input.requestId)}`,
      "metadata[requestId]": input.requestId,
      "metadata[packageId]": selectedPackage.id,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "eur",
      "line_items[0][price_data][product_data][name]": selectedPackage.name,
      "line_items[0][price_data][product_data][description]": selectedPackage.description,
      "line_items[0][price_data][unit_amount]": String(selectedPackage.price * 100),
    });

    if (selectedPackage.billing === "month") {
      params.set("line_items[0][price_data][recurring][interval]", "month");
    }

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeConfig.secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const session = await response.json() as { id?: string; url?: string; error?: { message?: string } };
    if (!response.ok || !session.id || !session.url) {
      throw new Error(session.error?.message ?? "Stripe Checkout session could not be created.");
    }

    return { url: session.url, sessionId: session.id, mode: "stripe" as const };
  }
}

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

export const stripeCheckoutProvider: StripeCheckoutProvider = new StripeRestCheckoutProvider();
