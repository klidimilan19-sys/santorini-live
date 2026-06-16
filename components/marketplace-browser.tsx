"use client";

import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { MarketplaceCard } from "@/components/marketplace-card";
import { marketplaceCategories, type MarketplaceListing } from "@/data/mock-data";

const villages = ["All villages", "Fira", "Oia", "Pyrgos", "Perissa", "Kamari", "Imerovigli"];
const conditions = ["Any condition", "New", "Like new", "Good", "Used"];

export function MarketplaceBrowser({ listings }: { listings: MarketplaceListing[] }) {
  const [category, setCategory] = useState("All categories");
  const [village, setVillage] = useState("All villages");
  const [price, setPrice] = useState("Any price");
  const [condition, setCondition] = useState("Any condition");

  const filtered = useMemo(() => listings.filter((listing) => {
    const categoryMatch = category === "All categories" || listing.category === category;
    const villageMatch = village === "All villages" || listing.village === village;
    const conditionMatch = condition === "Any condition" || listing.condition === condition;
    const priceMatch =
      price === "Any price" ||
      (price === "Free" && listing.price === 0) ||
      (price === "Under €100" && listing.price > 0 && listing.price < 100) ||
      (price === "€100-€500" && listing.price >= 100 && listing.price <= 500) ||
      (price === "€500+" && listing.price > 500);
    return categoryMatch && villageMatch && conditionMatch && priceMatch;
  }), [category, condition, listings, price, village]);

  function reset() {
    setCategory("All categories");
    setVillage("All villages");
    setPrice("Any price");
    setCondition("Any condition");
  }

  return (
    <>
      <div className="grid gap-3 rounded-3xl border border-aegean-900/10 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5">
        <FilterSelect label="Category" value={category} options={["All categories", ...marketplaceCategories]} onChange={setCategory} />
        <FilterSelect label="Village" value={village} options={villages} onChange={setVillage} />
        <FilterSelect label="Price" value={price} options={["Any price", "Free", "Under €100", "€100-€500", "€500+"]} onChange={setPrice} />
        <FilterSelect label="Condition" value={condition} options={conditions} onChange={setCondition} />
        <button type="button" onClick={reset} className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-aegean-900/10 px-4 text-sm font-bold text-aegean-700 hover:bg-aegean-50"><SlidersHorizontal size={17} /> Reset</button>
      </div>

      <div className="mb-7 mt-10 flex items-end justify-between">
        <div><p className="text-sm font-bold text-aegean-700">{filtered.length} listings</p><h2 className="mt-1 font-display text-2xl font-extrabold">Recently listed</h2></div>
        <p className="hidden text-sm text-aegean-950/45 sm:block">Featured and urgent listings appear first</p>
      </div>
      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((listing) => <MarketplaceCard key={listing.id} listing={listing} />)}</div>
      ) : (
        <div className="rounded-3xl bg-sand px-6 py-16 text-center"><h3 className="font-display text-xl font-extrabold">No matching listings</h3><p className="mt-2 text-sm text-aegean-950/50">Try clearing one or two filters.</p></div>
      )}
    </>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="rounded-xl bg-sand px-4 py-2">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-aegean-950/35">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full bg-transparent text-sm font-bold outline-none">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
