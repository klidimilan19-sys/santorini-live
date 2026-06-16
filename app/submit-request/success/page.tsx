import type { Metadata } from "next";
import { PaymentSuccess } from "@/components/payment-success";

export const metadata: Metadata = { title: "Payment Complete" };

export default async function SubmitSuccessPage({ searchParams }: { searchParams: Promise<{ requestId?: string }> }) {
  const { requestId } = await searchParams;
  return <section className="min-h-[70vh] bg-sand py-16"><div className="mx-auto max-w-2xl px-5"><PaymentSuccess requestId={requestId} /></div></section>;
}
