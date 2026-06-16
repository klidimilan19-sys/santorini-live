import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TripPlanner } from "@/components/trip-planner";

export const metadata: Metadata = { title: "AI Trip Planner" };

export default function TripPlannerPage() {
  return (
    <>
      <PageHero eyebrow="AI Trip Planner" title="Build a Santorini itinerary around you." description="Choose your days, budget, travel style and transportation. The mock planner creates an instant suggested route, ready for future AI integration." />
      <section className="section-shell py-14 sm:py-16"><TripPlanner /></section>
    </>
  );
}
