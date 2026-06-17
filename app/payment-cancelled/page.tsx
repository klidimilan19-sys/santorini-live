import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata: Metadata = { title: "Payment Cancelled" };

export default function PaymentCancelledPage() {
  return (
    <section className="min-h-[70vh] bg-sand py-16">
      <div className="mx-auto max-w-2xl px-5">
        <div className="rounded-[2rem] border border-aegean-900/10 bg-white p-8 text-center shadow-card sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-red-50 text-red-700"><XCircle size={31} /></span>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight">Payment cancelled</h1>
          <p className="mx-auto mt-3 max-w-lg leading-7 text-aegean-950/55">
            Your advertising request is still saved as Pending Payment. You can return to the form and start checkout again when ready.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/submit-request" className="rounded-xl bg-sunset px-6 py-3 text-sm font-bold text-white">Try checkout again</Link>
            <Link href="/" className="rounded-xl border border-aegean-900/10 px-6 py-3 text-sm font-bold text-aegean-700">Return home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
