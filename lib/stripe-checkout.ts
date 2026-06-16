import { getAdvertisingPackage } from "@/data/advertising";

export type CheckoutSessionInput = {
  requestId: string;
  packageId: string;
  origin: string;
};

export interface StripeCheckoutProvider {
  createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string; sessionId: string; mode: "mock" | "stripe" }>;
}

export class MockStripeCheckoutProvider implements StripeCheckoutProvider {
  async createCheckoutSession(input: CheckoutSessionInput) {
    const selectedPackage = getAdvertisingPackage(input.packageId);
    if (!selectedPackage) throw new Error("Unknown advertising package.");

    return {
      url: `${input.origin}/submit-request/success?requestId=${encodeURIComponent(input.requestId)}&session_id=mock_${crypto.randomUUID()}`,
      sessionId: `mock_${crypto.randomUUID()}`,
      mode: "mock" as const,
    };
  }
}

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

export const stripeCheckoutProvider: StripeCheckoutProvider = new MockStripeCheckoutProvider();
