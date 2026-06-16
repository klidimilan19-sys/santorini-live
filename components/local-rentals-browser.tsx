"use client";

import { useMemo, useState } from "react";
import { LocalRentalCard } from "@/components/accommodation-cards";
import type { LocalRental } from "@/data/mock-data";

const propertyTypes = ["All types", "Room", "Studio", "Apartment", "Shared house"];

export function LocalRentalsBrowser({ rentals }: { rentals: LocalRental[] }) {
  const [propertyType, setPropertyType] = useState("All types");
  const [workersOnly, setWorkersOnly] = useState(false);
  const filtered = useMemo(() => rentals.filter((rental) =>
    (propertyType === "All types" || rental.propertyType === propertyType) &&
    (!workersOnly || rental.suitableForWorkers)
  ), [propertyType, rentals, workersOnly]);

  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl bg-sand p-3 sm:flex-row sm:items-center">
        <select value={propertyType} onChange={(event) => setPropertyType(event.target.value)} className="min-h-12 flex-1 rounded-xl bg-white px-4 text-sm font-bold outline-none">{propertyTypes.map((type) => <option key={type}>{type}</option>)}</select>
        <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl bg-white px-4 text-sm font-bold"><input type="checkbox" checked={workersOnly} onChange={(event) => setWorkersOnly(event.target.checked)} className="size-4 accent-aegean-700" /> Suitable for workers only</label>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((rental) => <LocalRentalCard key={rental.id} rental={rental} />)}</div>
    </>
  );
}
