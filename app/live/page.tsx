import type { Metadata } from "next";
import { LiveUpdatesFeed } from "@/components/live-updates-feed";
import { PageHero } from "@/components/page-hero";
import { liveUpdates } from "@/data/mock-data";

export const metadata: Metadata = { title: "Live Updates" };

export default function LiveUpdatesPage() {
  return (
    <>
      <PageHero eyebrow="Island now" title="Live updates from Santorini." description="Weather notices, transport conditions, traffic and admin-approved local news in one feed." />
      <section className="section-shell py-16"><LiveUpdatesFeed initialUpdates={liveUpdates} /></section>
    </>
  );
}
