import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CarFront,
  CreditCard,
  Hotel,
  Megaphone,
  MousePointerClick,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Umbrella,
  Utensils,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const businessCategories = [
  { title: "Hotels & Villas", icon: Hotel },
  { title: "Restaurants", icon: Utensils },
  { title: "Bars & Beach Clubs", icon: Umbrella },
  { title: "Car & ATV Rentals", icon: CarFront },
  { title: "Shops", icon: ShoppingBag },
  { title: "Tours & Experiences", icon: Sparkles },
  { title: "Local Services", icon: Store },
];

const benefits = [
  "Reach tourists searching for Santorini information",
  "Get more calls, bookings and website visits",
  "Appear in featured sections",
  "Mobile-friendly exposure",
  "Fast approval by admin",
];

const pricing = [
  { name: "Basic Listing", price: "€10", period: "/month", detail: "Simple business presence with contact details and category placement." },
  { name: "Featured Listing", price: "€25", period: "/month", detail: "Higher visibility in relevant listing pages and featured sections." },
  { name: "Homepage Featured", price: "€50", period: "/month", detail: "Prominent homepage exposure for seasonal campaigns and offers.", featured: true },
  { name: "Premium Banner", price: "€75", period: "/month", detail: "Top-tier banner placement for maximum brand awareness." },
];

const steps = [
  { title: "Submit your business", description: "Send your business details, village, description and image placeholder.", icon: Send },
  { title: "Choose advertising package", description: "Pick the monthly package that matches your visibility goals.", icon: BadgeCheck },
  { title: "Pay by card", description: "Stripe Checkout is prepared with placeholder keys for future real payments.", icon: CreditCard },
  { title: "Admin reviews and publishes your listing", description: "Nothing goes live automatically. Admin approval keeps quality high.", icon: ShieldCheck },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[680px] overflow-hidden bg-aegean-950 text-white">
        <Image src="/images/santorini-hero.png" alt="Santorini businesses at sunset" fill priority className="object-cover object-[66%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-aegean-950 via-aegean-950/82 to-aegean-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-aegean-950/80 via-transparent to-transparent" />
        <div className="section-shell relative flex min-h-[680px] items-center py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
              <Megaphone size={15} /> Santorini business advertising
            </span>
            <h1 className="mt-7 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Advertise Your Business in Santorini
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-xl">
              Promote your hotel, restaurant, bar, rental company, shop or experience to tourists visiting Santorini.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/submit-request" className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-sunset px-6 text-sm font-bold text-white hover:bg-orange-600">
                Advertise Now <ArrowRight size={17} />
              </Link>
              <Link href="/advertise" className="flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur hover:bg-white/15">
                View Pricing
              </Link>
            </div>
            <div className="mt-9 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
              <span className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="block text-lg text-white">Tourist ready</strong> Mobile-first exposure</span>
              <span className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="block text-lg text-white">Admin approved</strong> Quality listings only</span>
              <span className="rounded-2xl border border-white/10 bg-white/5 p-4"><strong className="block text-lg text-white">Card payments</strong> Stripe-ready flow</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell relative z-10 -mt-14 pb-20">
        <div className="grid gap-3 rounded-3xl bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {businessCategories.map(({ title, icon: Icon }) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl bg-sand p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-aegean-50 text-aegean-700"><Icon size={22} /></span>
              <h2 className="font-display font-extrabold">{title}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <SectionHeading eyebrow="Why advertise with us" title="Turn Santorini searches into customers." description="Santorini Live is built for tourists using their phones to decide where to stay, eat, rent, shop and book experiences." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <article key={benefit} className="rounded-3xl border border-aegean-900/10 bg-white p-5 shadow-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-sunset"><MousePointerClick size={20} /></span>
              <p className="mt-5 text-sm font-bold leading-6 text-aegean-950/70">{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Pricing" title="Simple monthly advertising packages." description="Start small, feature your business, or take premium visibility during high season." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map((plan) => (
              <article key={plan.name} className={`relative rounded-[2rem] border p-6 ${plan.featured ? "border-sunset bg-white shadow-card" : "border-aegean-900/10 bg-white"}`}>
                {plan.featured && <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-sunset px-3 py-1 text-xs font-bold text-white"><Star size={12} fill="currentColor" /> Popular</span>}
                <h3 className="pr-20 font-display text-xl font-extrabold">{plan.name}</h3>
                <p className="mt-5"><span className="font-display text-4xl font-extrabold text-aegean-700">{plan.price}</span><span className="text-sm font-bold text-aegean-950/40">{plan.period}</span></p>
                <p className="mt-4 min-h-20 text-sm leading-6 text-aegean-950/55">{plan.detail}</p>
                <Link href={`/submit-request?package=${encodeURIComponent(plan.name.toLowerCase().replaceAll(" ", "-"))}`} className={`mt-6 flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-bold ${plan.featured ? "bg-sunset text-white" : "bg-aegean-950 text-white"}`}>
                  Choose package
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <SectionHeading eyebrow="How it works" title="From request to live listing in four steps." description="Businesses submit details and pay by card. Admin reviews every request before anything is published." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <article key={title} className="rounded-3xl border border-aegean-900/10 bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-aegean-50 text-aegean-700"><Icon size={22} /></span>
                <span className="font-display text-4xl font-extrabold text-aegean-950/10">0{index + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-aegean-950/55">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-aegean-950 p-8 text-white sm:p-12 lg:flex lg:items-center lg:justify-between">
          <div className="absolute -right-12 -top-28 size-72 rounded-full border-[50px] border-white/5" />
          <div className="relative max-w-2xl">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#79c8ff]"><Building2 size={16} /> Business growth</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to promote your business?</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">Submit your advertising request today and prepare your listing for admin review.</p>
          </div>
          <Link href="/submit-request" className="relative mt-7 flex min-h-13 items-center justify-center gap-2 rounded-xl bg-sunset px-6 text-sm font-bold text-white lg:mt-0">
            Submit Advertising Request <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
