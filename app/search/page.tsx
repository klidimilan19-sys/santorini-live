import type { Metadata } from "next";
import Link from "next/link";
import { BriefcaseBusiness, CarFront, CloudSun, Compass, Home, SearchX, ShoppingBag, Utensils } from "lucide-react";
import { AccommodationCard, LocalRentalCard } from "@/components/accommodation-cards";
import { GlobalSearchForm } from "@/components/global-search-form";
import { JobCard, RentalCard, RestaurantCard } from "@/components/listing-cards";
import { MarketplaceCard } from "@/components/marketplace-card";
import { SearchLiveUpdateCard } from "@/components/search-live-update-card";
import { countSearchResults, searchSantorini } from "@/lib/global-search";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; village?: string }> }) {
  const { q = "", village = "All Santorini" } = await searchParams;
  const results = searchSantorini(q, village);
  const total = countSearchResults(results);

  return (
    <>
      <section className="bg-sand py-12 sm:py-16">
        <div className="section-shell">
          <span className="eyebrow">Smart global search</span>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Results for “{q || "your search"}”</h1>
          <p className="mt-3 text-aegean-950/50">{total} result{total === 1 ? "" : "s"}{village !== "All Santorini" ? ` in ${village}` : " across Santorini Live"}</p>
          <div className="mt-7 max-w-4xl"><GlobalSearchForm defaultQuery={q} defaultVillage={village} /></div>
        </div>
      </section>

      <section className="section-shell py-14 sm:py-16">
        {total === 0 ? <NoResults /> : (
          <div className="space-y-16">
            <ResultGroup title="Santorini Guide" icon={Compass} count={results.guide.length}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.guide.map((result) => {
                  if (result.kind === "village") {
                    return <Link key={`village-${result.item.slug}`} href={`/guide/villages/${result.item.slug}`} className="rounded-3xl border border-aegean-900/10 bg-white p-5"><Compass size={19} className="text-aegean-700" /><h3 className="mt-4 font-display text-xl font-extrabold">{result.item.name}</h3><p className="mt-2 text-sm leading-6 text-aegean-950/50">{result.item.tagline}</p></Link>;
                  }
                  return <Link key={`topic-${result.item.slug}`} href={`/guide/${result.item.slug}`} className="rounded-3xl border border-aegean-900/10 bg-white p-5"><Compass size={19} className="text-aegean-700" /><h3 className="mt-4 font-display text-xl font-extrabold">{result.item.title}</h3><p className="mt-2 text-sm leading-6 text-aegean-950/50">{result.item.description}</p></Link>;
                })}
              </div>
            </ResultGroup>
            <ResultGroup title="Restaurants" icon={Utensils} count={results.restaurants.length}>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.restaurants.map((item) => <RestaurantCard key={item.id} restaurant={item} />)}</div>
            </ResultGroup>
            <ResultGroup title="Jobs" icon={BriefcaseBusiness} count={results.jobs.length}>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.jobs.map((item) => <JobCard key={item.id} job={item} />)}</div>
            </ResultGroup>
            <ResultGroup title="Rentals" icon={CarFront} count={results.rentals.length}>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.rentals.map((item) => <RentalCard key={item.id} rental={item} />)}</div>
            </ResultGroup>
            <ResultGroup title="Accommodation" icon={Home} count={results.accommodation.length}>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {results.accommodation.map((result) => result.kind === "hotel"
                  ? <AccommodationCard key={`hotel-${result.item.id}`} item={result.item} />
                  : <LocalRentalCard key={`local-${result.item.id}`} rental={result.item} />)}
              </div>
            </ResultGroup>
            <ResultGroup title="Marketplace" icon={ShoppingBag} count={results.marketplace.length}>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.marketplace.map((item) => <MarketplaceCard key={item.id} listing={item} />)}</div>
            </ResultGroup>
            <ResultGroup title="Live Updates" icon={CloudSun} count={results.liveUpdates.length}>
              <div className="grid gap-4 md:grid-cols-2">{results.liveUpdates.map((item) => <SearchLiveUpdateCard key={item.id} update={item} />)}</div>
            </ResultGroup>
          </div>
        )}
      </section>
    </>
  );
}

function ResultGroup({ title, icon: Icon, count, children }: { title: string; icon: typeof Utensils; count: number; children: React.ReactNode }) {
  if (!count) return null;
  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-aegean-50 text-aegean-700"><Icon size={21} /></span>
        <div><h2 className="font-display text-2xl font-extrabold">{title}</h2><p className="text-xs text-aegean-950/40">{count} matching result{count === 1 ? "" : "s"}</p></div>
      </div>
      {children}
    </section>
  );
}

function NoResults() {
  const suggestions = [
    ["Santorini Guide", "sunset"],
    ["Restaurants", "dinner"],
    ["Jobs", "work"],
    ["Rentals", "scooter"],
    ["Accommodation", "room"],
    ["Marketplace", "marketplace"],
    ["Live Updates", "weather"],
  ];

  return (
    <div className="rounded-[2rem] bg-sand px-6 py-14 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-white text-aegean-700"><SearchX size={28} /></span>
      <h2 className="mt-5 font-display text-3xl font-extrabold">No results found</h2>
      <p className="mt-2 text-aegean-950/50">Try a broader term or explore one of these popular categories.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {suggestions.map(([label, query]) => <Link key={label} href={`/search?q=${encodeURIComponent(query)}`} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-aegean-700 shadow-sm hover:bg-aegean-50">{label}</Link>)}
      </div>
    </div>
  );
}
