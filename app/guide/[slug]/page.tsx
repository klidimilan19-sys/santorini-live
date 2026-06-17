import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CarFront, CheckCircle2, Clock3, Hotel, Map, MapPin, Sparkles, Utensils } from "lucide-react";
import { notFound } from "next/navigation";
import { GuideHighlights } from "@/components/guide-cards";
import { PageHero } from "@/components/page-hero";
import { getGuideTopic, guideTopics } from "@/data/guide-data";
import { getGuidePlace, guidePlaces } from "@/data/guidePlaces";
import { hotels, rentals, restaurants } from "@/data/mock-data";

export function generateStaticParams() {
  return [...guideTopics.map((topic) => ({ slug: topic.slug })), ...guidePlaces.map((place) => ({ slug: place.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const place = getGuidePlace(slug);
  const topic = getGuideTopic(slug);
  return { title: place?.name ?? topic?.title ?? "Guide" };
}

export default async function GuideTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const place = getGuidePlace(slug);
  if (place) {
    const nearbyRestaurants = restaurants.filter((item) => item.village === place.village).slice(0, 3);
    const nearbyHotels = hotels.filter((item) => item.village === place.village).slice(0, 3);
    const nearbyRentals = rentals.filter((item) => item.village === place.village).slice(0, 3);

    return (
      <>
        <section className="relative min-h-[520px] overflow-hidden bg-aegean-950 text-white">
          <Image src={place.heroImage} alt={place.heroImageAlt} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-aegean-950 via-aegean-950/70 to-aegean-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-aegean-950/75 via-transparent to-transparent" />
          <div className="section-shell relative flex min-h-[520px] items-end py-14">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
                <MapPin size={15} /> {place.category} · {place.village}
              </span>
              <h1 className="mt-6 font-display text-5xl font-extrabold tracking-[-0.055em] sm:text-6xl">{place.name}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">{place.overview}</p>
              <p className="mt-6 text-xs font-semibold text-white/55">Image: {place.imageCredit}</p>
            </div>
          </div>
        </section>

        <section className="section-shell py-14">
          <Link href="/guide" className="inline-flex items-center gap-2 rounded-xl border border-aegean-900/10 bg-white px-4 py-3 text-sm font-bold text-aegean-700 hover:bg-aegean-50">
            <ArrowLeft size={16} /> Back to Guide
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.36fr]">
            <div className="space-y-8">
              <InfoSection title="Overview" body={place.overview} />
              <InfoSection title="History" body={place.history} />
              <ListSection title="Famous checkpoints" items={place.famousPoints} />
              <ListSection title="Best photo spots" items={place.photoSpots} />
              <InfoSection title="Best time to visit" body={place.bestTime} />
              <ListSection title="Nearby places" items={place.nearbyPlaces} />
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl border border-aegean-900/10 bg-sand p-6">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aegean-700"><Clock3 size={15} /> Best time</span>
                <p className="mt-3 text-sm leading-6 text-aegean-950/60">{place.bestTime}</p>
              </div>
              <div className="rounded-3xl border border-aegean-900/10 bg-white p-6">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aegean-700"><Map size={15} /> Map placeholder</span>
                <div className="mt-4 grid h-44 place-items-center rounded-2xl bg-aegean-50 text-center text-sm font-bold text-aegean-950/45">
                  <span>
                    Google Maps placeholder
                    <span className="mt-1 block text-aegean-950/35">{place.name}</span>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-sand py-14">
          <div className="section-shell">
            <span className="eyebrow">Photo gallery</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.04em]">Different times of day</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {place.galleryImages.map((image) => (
                <article key={image.time} className="overflow-hidden rounded-3xl border border-aegean-900/10 bg-white">
                  <div className="relative h-56">
                    <Image src={image.imageUrl} alt={image.alt} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-extrabold capitalize">{image.time}</h3>
                    <p className="mt-2 text-[11px] text-aegean-950/35">Image: {image.credit}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-14">
          <span className="eyebrow">Nearby places</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.04em]">{place.name}</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <NearbyPanel icon="restaurant" title="Nearby restaurants" items={nearbyRestaurants.length ? nearbyRestaurants.map((item) => `${item.name} · ${item.cuisine}`) : restaurants.slice(0, 3).map((item) => `${item.name} · ${item.village}`)} />
            <NearbyPanel icon="hotel" title="Nearby hotels" items={nearbyHotels.length ? nearbyHotels.map((item) => `${item.name} · from €${item.priceFrom}`) : hotels.slice(0, 3).map((item) => `${item.name} · ${item.village}`)} />
            <NearbyPanel icon="rental" title="Nearby rentals" items={nearbyRentals.length ? nearbyRentals.map((item) => `${item.businessName} · ${item.category}`) : rentals.slice(0, 3).map((item) => `${item.businessName} · ${item.village}`)} />
          </div>
        </section>
      </>
    );
  }

  const topic = getGuideTopic(slug);
  if (!topic) notFound();

  return (
    <>
      <PageHero eyebrow={topic.eyebrow} title={topic.title} description={topic.description}>
        <Link href="/guide/trip-planner" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-sunset px-5 py-3 text-sm font-bold text-white"><Sparkles size={16} /> Personalize this trip</Link>
      </PageHero>
      <section className="section-shell py-16">
        <p className="mb-10 max-w-3xl font-display text-2xl font-bold leading-9 text-aegean-950/80">{topic.intro}</p>
        <GuideHighlights topic={topic} />
      </section>
      <section className="bg-sand py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <span className="eyebrow">Good to know</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold">Local planning tips</h2>
            <div className="mt-7 grid gap-3">
              {topic.tips.map((tip) => <p key={tip} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-aegean-950/60"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-aegean-700" />{tip}</p>)}
            </div>
          </div>
          <div className="rounded-3xl bg-aegean-950 p-7 text-white">
            <h2 className="font-display text-2xl font-extrabold">Keep exploring</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">Compare villages and combine this guide with live weather, transport updates and local listings.</p>
            <Link href="/guide/villages" className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-aegean-950">Explore villages <ArrowRight size={16} /></Link>
            <Link href="/weather" className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-bold">Check live weather <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-3xl border border-aegean-900/10 bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl font-extrabold">{title}</h2>
      <p className="mt-3 leading-7 text-aegean-950/60">{body}</p>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-aegean-900/10 bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl font-extrabold">{title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <p key={item} className="flex items-start gap-3 rounded-2xl bg-aegean-50 p-4 text-sm font-semibold leading-6 text-aegean-950/65">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-aegean-700" /> {item}
          </p>
        ))}
      </div>
    </section>
  );
}

function NearbyPanel({ icon, title, items }: { icon: "restaurant" | "hotel" | "rental"; title: string; items: string[] }) {
  const Icon = icon === "restaurant" ? Utensils : icon === "hotel" ? Hotel : CarFront;
  return (
    <article className="rounded-3xl border border-aegean-900/10 bg-white p-6 shadow-sm">
      <span className="grid size-11 place-items-center rounded-xl bg-aegean-50 text-aegean-700"><Icon size={21} /></span>
      <h3 className="mt-5 font-display text-xl font-extrabold">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => <p key={item} className="rounded-2xl bg-sand px-4 py-3 text-sm font-semibold text-aegean-950/60">{item}</p>)}
      </div>
    </article>
  );
}
