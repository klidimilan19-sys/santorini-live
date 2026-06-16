"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function FilterBar({
  placeholder,
  options,
}: {
  placeholder: string;
  options: string[];
}) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-card sm:flex-row">
      <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-sand px-4">
        <Search size={18} className="text-aegean-700" />
        <input
          type="search"
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium text-aegean-950 outline-none placeholder:text-aegean-950/35"
        />
      </label>
      <select
        aria-label="Filter listings"
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        className="min-h-12 rounded-xl border-0 bg-sand px-4 text-sm font-bold text-aegean-950 outline-none"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <button className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-aegean-700 px-6 text-sm font-bold text-white hover:bg-aegean-800">
        <SlidersHorizontal size={17} /> Search
      </button>
    </div>
  );
}
