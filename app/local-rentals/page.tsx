import type { Metadata } from "next";
import { AccommodationNav } from "@/components/accommodation-nav";
import { LocalRentalsBrowser } from "@/components/local-rentals-browser";
import { PageHero } from "@/components/page-hero";
import { localRentals } from "@/data/mock-data";

export const metadata: Metadata = { title: "Local Rentals" };

export default function LocalRentalsPage() {
  return (
    <>
      <PageHero eyebrow="Live on the island" title="Long-term rentals for locals and workers." description="Rooms, studios, apartments and shared houses with clear monthly pricing and direct contact." />
      <section className="section-shell -mt-7 pb-16"><AccommodationNav /><div className="mt-12"><LocalRentalsBrowser rentals={localRentals} /></div></section>
    </>
  );
}
