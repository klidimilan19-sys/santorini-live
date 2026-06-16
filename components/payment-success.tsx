"use client";

import Link from "next/link";
import { Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function PaymentSuccess({ requestId }: { requestId?: string }) {
  const [state, setState] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!requestId) {
      setState("error");
      return;
    }
    fetch("/api/stripe/mock-confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId }),
    }).then((response) => setState(response.ok ? "success" : "error"));
  }, [requestId]);

  return (
    <div className="rounded-[2rem] border border-aegean-900/10 bg-white p-8 text-center shadow-card sm:p-12">
      {state === "loading" && <LoaderCircle className="mx-auto animate-spin text-aegean-700" size={42} />}
      {state === "success" && <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-600 text-white"><Check size={29} /></span>}
      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight">{state === "loading" ? "Confirming payment..." : state === "success" ? "Paid / Pending Admin Review" : "Payment confirmation unavailable"}</h1>
      <p className="mx-auto mt-3 max-w-lg leading-7 text-aegean-950/55">{state === "success" ? "Your request is paid and waiting for an administrator to review and manually publish it. No account is needed." : "This is a mock Stripe flow. Return to the request form and try again."}</p>
      <Link href="/" className="mt-7 inline-flex rounded-xl bg-aegean-950 px-6 py-3 text-sm font-bold text-white">Return home</Link>
    </div>
  );
}
