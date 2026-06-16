import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Check, Hotel, Map, MapPin, Utensils } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { getVillageGuide, villageGuides } from "@/data/guide-data";
import { hotels, restaurants } from "@/data/mock-data";

export function generateStaticParams() {
  return villageGuides.map((village) => ({ slug: village.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const village = getVillageGuide((await params).slug);
  return { title: village ? `${village.name} Guide` : "Village Guide" };
}

export default async function VillagePage({ params }: { params: Promise<{ slug: string }> }) {
  const village = getVillageGuide((await params).slug);
  if (!village) notFound();
  const villageRestaurants = restaurants.filter((item) => item.village === village.name).slice(0, 3);
  const villageHotels = hotels.filter((item) => item.village === village.name).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Village guide" title={village.name} description={village.tagline} />
      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="eyebrow">Overview</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold">Get to know {village.name}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-aegean-950/60">{village.overview}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {village.thingsToDo.map((item) => <p key={item} className="flex items-center gap-3 rounded-2xl bg-sand p-4 text-sm font-bold"><Check size={17} className="text-aegean-700" />{item}</p>)}
            </div>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-[2rem]">
            {village.imageUrl ? (
              <Image src={village.imageUrl} alt={village.imageAlt} fill priority className="object-cover" />
            ) : (
              <div role="img" aria-label={village.imageAlt} className="absolute inset-0 grid place-items-center bg-gradient-to-br from-aegean-100 via-white to-sand text-center">
                <div className="px-6"><p className="font-display text-2xl font-extrabold">Image coming soon</p><p className="mt-2 text-sm text-aegean-950/45">TODO: add verified free Megalochori image</p></div>
              </div>
            )}
            <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/85 px-3 py-2 text-xs font-semibold text-aegean-950/60 backdrop-blur">Image: {village.imageCredit}</p>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16">
        <div className="section-shell">
          <SectionHeading eyebrow="Eat nearby" title={`Restaurants in ${village.name}`} />
          {villageRestaurants.length ? (
            <div className="grid gap-4 md:grid-cols-3">{villageRestaurants.map((item) => <VillageListing key={item.id} icon={Utensils} title={item.name} detail={`${item.cuisine} · ${item.priceRange}`} href="/restaurants" />)}</div>
          ) : <EmptyVillageListings icon={Utensils} label="Restaurant listings for this village are ready for future data." href="/restaurants" />}
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading eyebrow="Stay nearby" title={`Hotels in ${village.name}`} />
        {villageHotels.length ? (
          <div className="grid gap-4 md:grid-cols-3">{villageHotels.map((item) => <VillageListing key={item.id} icon={Hotel} title={item.name} detail={`From €${item.priceFrom}/${item.priceUnit}`} href="/hotels" />)}</div>
        ) : <EmptyVillageListings icon={Hotel} label="Hotel listings for this village are ready for future data." href="/hotels" />}
      </section>

      <section className="bg-aegean-950 py-16 text-white">
        <div className="section-shell grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-[#79c8ff]"><Camera size={22} /></span>
            <h2 className="mt-5 font-display text-2xl font-extrabold">Live camera placeholder</h2>
            <div className="mt-5 grid aspect-video place-items-center rounded-2xl border border-dashed border-white/20 bg-black/15 text-center">
              <div><Camera className="mx-auto text-white/35" /><p className="mt-2 text-sm font-bold text-white/55">No camera connected</p></div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/55">{village.cameraDescription} Only approved and embeddable sources will be used.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-[#79c8ff]"><Map size={22} /></span>
            <h2 className="mt-5 font-display text-2xl font-extrabold">Map placeholder</h2>
            <div className="dot-grid mt-5 grid aspect-video place-items-center rounded-2xl bg-white/5 text-center">
              <div><MapPin className="mx-auto text-sunset" /><p className="mt-2 text-sm font-bold">{village.name}, Santorini</p><p className="mt-1 text-xs text-white/40">Google Maps integration ready</p></div>
            </div>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(`${village.name}, Santorini`)}`} target="_blank" rel="noreferrer" className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-aegean-950">Open external map <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading eyebrow="Close by" title="Nearby attractions" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{village.nearbyAttractions.map((item) => <div key={item} className="rounded-2xl border border-aegean-900/10 bg-white p-5"><MapPin size={18} className="text-sunset" /><p className="mt-3 font-display font-extrabold">{item}</p></div>)}</div>
      </section>
    </>
  );
}

function VillageListing({ icon: Icon, title, detail, href }: { icon: typeof Utensils; title: string; detail: string; href: string }) {
  return <Link href={href} className="rounded-3xl bg-white p-5 shadow-sm"><Icon size={20} className="text-aegean-700" /><h3 className="mt-4 font-display text-lg font-extrabold">{title}</h3><p className="mt-1 text-sm text-aegean-950/50">{detail}</p><span className="mt-4 flex items-center gap-2 text-xs font-bold text-aegean-700">View listings <ArrowRight size={14} /></span></Link>;
}

function EmptyVillageListings({ icon: Icon, label, href }: { icon: typeof Utensils; label: string; href: string }) {
  return <div className="rounded-3xl border border-dashed border-aegean-900/15 bg-white p-7 text-center"><Icon className="mx-auto text-aegean-700" /><p className="mt-3 text-sm text-aegean-950/50">{label}</p><Link href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-aegean-700">Browse all listings <ArrowRight size={15} /></Link></div>;
}
