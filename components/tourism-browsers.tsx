"use client";

import { useState } from "react";
import { RentalCard, RestaurantCard } from "@/components/listing-cards";
import type { Rental, Restaurant } from "@/data/mock-data";

const villages = ["All", "Oia", "Fira", "Imerovigli", "Kamari", "Perissa", "Pyrgos"] as const;
const categories = ["All", "Cars", "ATV", "Scooters", "Buggies", "Boats"] as const;

export function RestaurantsBrowser({ restaurants }: { restaurants: Restaurant[] }) {
  const [village, setVillage] = useState<(typeof villages)[number]>("All");
  const filtered = village === "All" ? restaurants : restaurants.filter((restaurant) => restaurant.village === village);

  return (
    <>
      <FilterTabs label="Filter restaurants by village" options={villages} selected={village} onSelect={setVillage} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>
    </>
  );
}

export function RentalsBrowser({ rentals }: { rentals: Rental[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const filtered = category === "All" ? rentals : rentals.filter((rental) => rental.category === category);

  return (
    <>
      <FilterTabs label="Filter rentals by category" options={categories} selected={category} onSelect={setCategory} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((rental) => <RentalCard key={rental.id} rental={rental} />)}</div>
    </>
  );
}

function FilterTabs<T extends string>({ label, options, selected, onSelect }: { label: string; options: readonly T[]; selected: T; onSelect: (option: T) => void }) {
  return (
    <div aria-label={label} className="flex gap-2 overflow-x-auto pb-2">
      {options.map((option) => (
        <button key={option} type="button" onClick={() => onSelect(option)} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${selected === option ? "bg-aegean-700 text-white" : "bg-sand text-aegean-950/60 hover:bg-aegean-50"}`}>
          {option}
        </button>
      ))}
    </div>
  );
}
