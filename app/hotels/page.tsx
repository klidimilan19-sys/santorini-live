import type { Metadata } from "next";
import { AccommodationCard } from "@/components/accommodation-cards";
import { AccommodationNav } from "@/components/accommodation-nav";
import { PageHero } from "@/components/page-hero";
import { hotels } from "@/data/mock-data";

export const metadata: Metadata = { title: "Hotels" };

export default function HotelsPage() {
  return (
    <>
      <PageHero eyebrow="Stay in Santorini" title="Hotels for every island plan." description="Mock hotel listings across caldera villages, beach towns and quieter local neighborhoods." />
      <section className="section-shell -mt-7 pb-16"><AccommodationNav /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{hotels.map((hotel) => <AccommodationCard key={hotel.id} item={hotel} />)}</div></section>
    </>
  );
}
