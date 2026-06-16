import type { Metadata } from "next";
import { AccommodationCard } from "@/components/accommodation-cards";
import { AccommodationNav } from "@/components/accommodation-nav";
import { PageHero } from "@/components/page-hero";
import { villas } from "@/data/mock-data";

export const metadata: Metadata = { title: "Airbnb & Villas" };

export default function VillasPage() {
  return (
    <>
      <PageHero eyebrow="Private island stays" title="Airbnb homes and Santorini villas." description="Mock private stays with room for couples, families and groups across the island." />
      <section className="section-shell -mt-7 pb-16"><AccommodationNav /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{villas.map((villa) => <AccommodationCard key={villa.id} item={villa} />)}</div></section>
    </>
  );
}
