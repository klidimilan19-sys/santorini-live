import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Camera,
  CarFront,
  CloudSun,
  Compass,
  Hotel,
  MapPin,
  Music,
  Ship,
  Sparkles,
  Sun,
  Umbrella,
  Utensils,
  Waves,
  Wind,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { santoriniGallery, topCheckpoints } from "@/data/homepage-discovery";
import { islandStatus } from "@/data/mock-data";

const quickCategories = [
  { title: "Hotels & Villas", href: "/hotels", icon: Hotel, color: "bg-blue-50 text-aegean-700" },
  { title: "Restaurants", href: "/restaurants", icon: Utensils, color: "bg-orange-50 text-sunset" },
  { title: "Bars & Beach Clubs", href: "/guide/experiences", icon: Umbrella, color: "bg-cyan-50 text-cyan-700" },
  { title: "Rentals", href: "/rentals", icon: CarFront, color: "bg-violet-50 text-violet-700" },
  { title: "Guide", href: "/guide", icon: Compass, color: "bg-emerald-50 text-emerald-700" },
  { title: "Live Updates", href: "/live", icon: CloudSun, color: "bg-amber-50 text-amber-700" },
  { title: "Jobs & Staff", href: "/jobs", icon: BriefcaseBusiness, color: "bg-sand text-aegean-700" },
];

const todayCards = [
  { label: "Weather", value: `${islandStatus.temperature}°C`, detail: islandStatus.condition, icon: Sun },
  { label: "Wind", value: `${islandStatus.windSpeed} km/h`, detail: islandStatus.windDirection, icon: Wind },
  { label: "Ferry status", value: islandStatus.ferryStatus, detail: "Athinios port", icon: Ship },
  { label: "Live cameras", value: "Placeholders", detail: "External sources only", icon: Camera },
  { label: "Events today", value: "Updated soon", detail: "Admin-approved listings", icon: Music },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-aegean-950 text-white">
        <Image src="/images/santorini-hero.png" alt="Santorini caldera view at sunset" fill priority className="object-cover object-[66%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-aegean-950 via-aegean-950/72 to-aegean-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-aegean-950/70 via-transparent to-transparent" />
        <div className="section-shell relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
              <Waves size={15} /> Santorini visitor guide
            </span>
            <h1 className="mt-7 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
              Discover Santorini
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-xl">
              Explore the best villages, viewpoints, beaches, restaurants, rentals and live island updates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/guide" className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-sunset px-6 text-sm font-bold text-white hover:bg-orange-600">
                Start Exploring <ArrowRight size={17} />
              </Link>
              <Link href="#top-checkpoints" className="flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur hover:bg-white/15">
                View Top Checkpoints
              </Link>
            </div>
            <div className="mt-9 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
              <span className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="block text-lg text-white">8 villages</strong> Caldera, beach and hilltop routes</span>
              <span className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="block text-lg text-white">Live status</strong> Weather, wind and ferry notes</span>
              <span className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="block text-lg text-white">Local listings</strong> Food, stays, rentals and staff</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10 -mt-14 pb-20">
        <div className="grid gap-3 rounded-3xl bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-7">
          {quickCategories.map(({ title, href, icon: Icon, color }) => (
            <Link key={title} href={href} className="group flex items-center gap-4 rounded-2xl p-4 transition hover:bg-sand lg:flex-col lg:items-start">
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${color}`}><Icon size={22} /></span>
              <span className="font-display font-extrabold">{title}</span>
              <ArrowRight size={16} className="ml-auto text-aegean-950/25 transition group-hover:translate-x-1 group-hover:text-aegean-700 lg:ml-0" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <SectionHeading eyebrow="Santorini gallery" title="Picture your island route." description="A quick visual tour across blue domes, caldera cliffs, black beaches, red volcanic coast and traditional villages." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {santoriniGallery.map((item, index) => (
            <article key={item.title} className={`group overflow-hidden rounded-3xl border border-aegean-900/10 bg-white ${index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}>
              <div className={`relative ${index === 0 ? "h-80 lg:h-full" : "h-56"}`}>
                <Image src={item.imageUrl} alt={item.imageAlt} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-aegean-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <h3 className="font-display text-xl font-extrabold text-white">{item.title}</h3>
                  <p className="mt-1 text-[11px] text-white/60">Image: {item.imageCredit}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="top-checkpoints" className="bg-sand py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Top checkpoints to visit" title="Save these Santorini stops." description="From famous viewpoints to volcanic beaches and archaeological landmarks." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topCheckpoints.map((checkpoint) => (
              <article key={checkpoint.name} className="card-lift overflow-hidden rounded-3xl border border-aegean-900/10 bg-white">
                <div className="relative h-56">
                  <Image src={checkpoint.imageUrl} alt={checkpoint.imageAlt} fill className="object-cover" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-aegean-700 backdrop-blur">{checkpoint.location}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-extrabold">{checkpoint.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-aegean-950/55">{checkpoint.description}</p>
                  <p className="mt-4 flex items-center gap-2 rounded-xl bg-aegean-50 p-3 text-xs font-bold text-aegean-700"><MapPin size={15} /> Best time: {checkpoint.bestTime}</p>
                  <p className="mt-3 text-[11px] text-aegean-950/35">Image: {checkpoint.imageCredit}</p>
                  <Link href={checkpoint.guideHref} className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-aegean-950 px-4 text-sm font-bold text-white hover:bg-aegean-700">
                    View Guide <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading eyebrow="Today in Santorini" title="Know before you go." description="Fast island status cards for planning your beach day, ferry timing or sunset route." href="/live" linkLabel="View live updates" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {todayCards.map(({ label, value, detail, icon: Icon }) => (
            <article key={label} className="rounded-3xl border border-aegean-900/10 bg-white p-5 shadow-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-aegean-50 text-aegean-700"><Icon size={21} /></span>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-aegean-950/35">{label}</p>
              <h3 className="mt-1 font-display text-xl font-extrabold">{value}</h3>
              <p className="mt-1 text-xs text-aegean-950/45">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-aegean-950 p-8 text-white sm:p-12 lg:flex lg:items-center lg:justify-between">
          <div className="absolute -right-12 -top-28 size-72 rounded-full border-[50px] border-white/5" />
          <div className="relative max-w-2xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#79c8ff]"><Building2 size={16} /> Local businesses</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Own a business in Santorini?</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">Advertise your hotel, restaurant, bar or rental company on Santorini Live.</p>
          </div>
          <Link href="/advertise" className="relative mt-7 flex min-h-13 items-center justify-center gap-2 rounded-xl bg-sunset px-6 text-sm font-bold text-white lg:mt-0">
            Advertise With Us <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
