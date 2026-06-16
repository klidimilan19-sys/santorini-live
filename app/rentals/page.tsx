import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RentalsBrowser } from "@/components/tourism-browsers";
import { rentals } from "@/data/mock-data";

export const metadata: Metadata = { title: "Rentals" };

export default function RentalsPage() {
  return (
    <>
      <PageHero eyebrow="Explore the island" title="Your Santorini ride starts here." description="Compare trusted local businesses for cars, ATVs, scooters, buggies and boats." />
      <section className="section-shell py-16">
        <div className="mb-7"><p className="text-sm font-bold text-aegean-700">{rentals.length} trusted operators</p><h2 className="mt-1 font-display text-2xl font-extrabold">Choose how you explore</h2></div>
        <RentalsBrowser rentals={rentals} />
      </section>
    </>
  );
}
