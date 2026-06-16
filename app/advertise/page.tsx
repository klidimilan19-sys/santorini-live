import type { Metadata } from "next";
import Link from "next/link";
import { Check, UserRound, WalletCards } from "lucide-react";
import { AdvertisingPricing } from "@/components/advertising-pricing";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Advertise With Us" };

export default function AdvertisePage() {
  return (
    <>
      <PageHero eyebrow="Simple local promotion" title="Advertise with Santorini Live." description="Choose a clear package, submit your details without creating an account, and pay securely by card." />
      <section className="section-shell py-16">
        <div className="mb-10 grid gap-4 rounded-[2rem] border border-aegean-900/10 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-emerald-50 p-5">
            <span className="grid size-11 place-items-center rounded-xl bg-white text-emerald-700"><UserRound size={21} /></span>
            <h2 className="mt-5 font-display text-2xl font-extrabold">Job seekers never pay</h2>
            <p className="mt-2 text-sm leading-6 text-aegean-950/60">Workers can browse jobs, view salaries, check accommodation details, contact employers and apply completely free.</p>
            <Link href="/jobs" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700"><Check size={16} /> Browse free jobs</Link>
          </div>
          <div className="rounded-3xl bg-orange-50 p-5">
            <span className="grid size-11 place-items-center rounded-xl bg-white text-sunset"><WalletCards size={21} /></span>
            <h2 className="mt-5 font-display text-2xl font-extrabold">Pricing is for employers</h2>
            <p className="mt-2 text-sm leading-6 text-aegean-950/60">Job post pricing applies only to businesses, hotels, restaurants, bars, rental companies and employers advertising vacancies.</p>
            <Link href="/submit-request?package=job-basic" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sunset"><Check size={16} /> Post a paid job ad</Link>
          </div>
        </div>
        <AdvertisingPricing />
      </section>
    </>
  );
}
