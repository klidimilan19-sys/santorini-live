import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { MarketplaceBrowser } from "@/components/marketplace-browser";
import { MarketplaceSafetyNotice } from "@/components/marketplace-safety";
import { PageHero } from "@/components/page-hero";
import { marketplaceFeaturedFirst } from "@/data/mock-data";

export const metadata: Metadata = { title: "Marketplace" };

export default function MarketplacePage() {
  return (
    <>
      <PageHero eyebrow="Island marketplace" title="Buy, sell, pass it on." description="Useful finds, leaving-island sales and local deals from people across Santorini.">
        <Link href="/submit-request?package=marketplace-basic" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-sunset px-5 py-3 text-sm font-bold text-white hover:bg-orange-600"><Plus size={17} /> Submit a listing request</Link>
      </PageHero>
      <section className="section-shell py-12 sm:py-16">
        <MarketplaceSafetyNotice />
        <div className="mt-8"><MarketplaceBrowser listings={marketplaceFeaturedFirst} /></div>
      </section>
    </>
  );
}
