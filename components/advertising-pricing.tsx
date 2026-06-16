import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { advertisingPackages } from "@/data/advertising";

export function AdvertisingPricing() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {advertisingPackages.map((item) => (
        <article key={item.id} className={`flex flex-col rounded-[2rem] border bg-white p-6 ${item.id === "job-featured" ? "border-sunset shadow-card" : "border-aegean-900/10"}`}>
          <span className="grid size-10 place-items-center rounded-xl bg-aegean-50 text-aegean-700"><Check size={19} /></span>
          <h2 className="mt-5 font-display text-xl font-extrabold tracking-tight">{item.name}</h2>
          <p className="mt-2 min-h-12 text-sm leading-6 text-aegean-950/50">{item.description}</p>
          <p className="mt-5"><span className="font-display text-4xl font-extrabold">€{item.price}</span><span className="text-sm text-aegean-950/40">{item.billing === "month" ? "/month" : ""}</span></p>
          <Link href={`/submit-request?package=${item.id}`} className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-aegean-950 px-5 text-sm font-bold text-white hover:bg-aegean-700">Select package <ArrowRight size={16} /></Link>
        </article>
      ))}
    </div>
  );
}
