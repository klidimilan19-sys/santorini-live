import { ShieldCheck } from "lucide-react";

export function MarketplaceSafetyNotice() {
  return (
    <div className="flex gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:items-center">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700"><ShieldCheck size={22} /></span>
      <div><h2 className="font-display text-lg font-extrabold">Buy and sell safely</h2><p className="mt-1 text-sm leading-6 text-aegean-950/55">Meet in well-lit public places, inspect items before buying, and avoid advance payments or sending sensitive personal information.</p></div>
    </div>
  );
}
