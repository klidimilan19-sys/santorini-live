import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { VillageCard } from "@/components/guide-cards";
import { villageGuides } from "@/data/guide-data";

export const metadata: Metadata = { title: "Santorini Villages" };

export default function VillagesPage() {
  return (
    <>
      <PageHero eyebrow="Village guide" title="Meet Santorini village by village." description="Explore eight distinct bases, from caldera icons and beach towns to traditional hilltop communities." />
      <section className="section-shell py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{villageGuides.map((village) => <VillageCard key={village.slug} village={village} />)}</div>
      </section>
    </>
  );
}
