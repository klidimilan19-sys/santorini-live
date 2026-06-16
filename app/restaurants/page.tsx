import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { RestaurantsBrowser } from "@/components/tourism-browsers";
import { restaurants } from "@/data/mock-data";

export const metadata: Metadata = { title: "Restaurants" };

export default function RestaurantsPage() {
  return (
    <>
      <PageHero eyebrow="Taste Santorini" title="Good tables. Great stories." description="Independent tavernas, sunset terraces and trusted places across Oia, Fira, Imerovigli, Kamari, Perissa and Pyrgos." />
      <section className="section-shell py-16">
        <div className="mb-7"><p className="text-sm font-bold text-aegean-700">Locally curated</p><h2 className="mt-1 font-display text-2xl font-extrabold">Places worth a reservation</h2></div>
        <RestaurantsBrowser restaurants={restaurants} />
      </section>
    </>
  );
}
