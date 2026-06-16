import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Map, Sparkles } from "lucide-react";
import { GuideLinkCard, VillageCard } from "@/components/guide-cards";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { guideCategories, itineraryGuides, villageGuides } from "@/data/guide-data";

export const metadata: Metadata = { title: "Santorini Guide" };

export default function GuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Santorini Guide"
        title="Plan the island your way."
        description="Explore villages, beaches, experiences and practical itineraries built for every kind of Santorini trip."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/guide/trip-planner" className="flex items-center gap-2 rounded-xl bg-sunset px-5 py-3 text-sm font-bold text-white"><Sparkles size={17} /> AI Trip Planner</Link>
          <Link href="/guide/villages" className="flex items-center gap-2 rounded-xl border border-aegean-900/10 bg-white px-5 py-3 text-sm font-bold text-aegean-700"><Map size={17} /> Explore villages</Link>
        </div>
      </PageHero>

      <section className="section-shell py-16">
        <SectionHeading eyebrow="Island essentials" title="Find your Santorini" description="Start with the kind of day you want, then follow the guide into villages and local listings." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{guideCategories.map((item) => <GuideLinkCard key={item.href} {...item} />)}</div>
      </section>

      <section className="bg-sand py-16">
        <div className="section-shell">
          <SectionHeading eyebrow="Village by village" title="Eight places, eight personalities" description="From Oia's cliff paths to the traditional lanes of Megalochori." href="/guide/villages" linkLabel="View every village" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{villageGuides.slice(0, 4).map((village) => <VillageCard key={village.slug} village={village} />)}</div>
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading eyebrow="Ready-made plans" title="Choose your travel style" description="Use a practical day-by-day guide or generate a custom mock itinerary." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{itineraryGuides.map((item) => <GuideLinkCard key={item.href} {...item} />)}</div>
      </section>

      <section className="section-shell pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-aegean-950 p-7 text-white sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div className="absolute -right-10 -top-24 size-64 rounded-full border-[42px] border-white/5" />
          <div className="relative max-w-2xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#79c8ff]"><Compass size={16} /> Smart planning</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold">Not sure where to begin?</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">Tell the planner your days, budget, travel style and transport. It will build a suggested itinerary from mock island data.</p>
          </div>
          <Link href="/guide/trip-planner" className="relative mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sunset px-6 text-sm font-bold lg:mt-0">Plan my trip <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
