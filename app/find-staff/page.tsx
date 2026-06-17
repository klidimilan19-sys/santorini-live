import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeEuro, CheckCircle2, CreditCard, FileText, Megaphone, ShieldCheck, Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Find Staff" };

const pricing = [
  {
    name: "Basic Job Post",
    price: 5,
    packageId: "job-basic",
    description: "Simple job advertisement for one open role.",
  },
  {
    name: "Featured Job Post",
    price: 10,
    packageId: "job-featured",
    description: "Priority placement above standard job posts.",
  },
  {
    name: "Featured + Jobs Homepage",
    price: 15,
    packageId: "job-section-featured",
    description: "Featured placement plus stronger visibility in the jobs section.",
  },
];

const benefits = [
  "Reach people actively looking for work in Santorini",
  "Show salary, village, accommodation and food details clearly",
  "Feature urgent vacancies for stronger visibility",
  "No public employer account required",
  "Fast admin review before publishing",
];

const steps = [
  { title: "Step 1: Submit job ad", description: "Send the position, company details and contact information.", icon: FileText },
  { title: "Step 2: Choose package", description: "Select Basic, Featured or Featured + Jobs Homepage.", icon: BadgeEuro },
  { title: "Step 3: Pay by card", description: "Continue through the prepared Stripe Checkout flow.", icon: CreditCard },
  { title: "Step 4: Admin reviews and publishes", description: "A site admin checks the ad before it goes live.", icon: ShieldCheck },
];

export default function FindStaffPage() {
  return (
    <>
      <PageHero
        eyebrow="For employers"
        title="Find Staff for Your Business"
        description="Post your job ad and reach people looking for work in Santorini."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/submit-request?package=job-basic" className="flex items-center gap-2 rounded-xl bg-sunset px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
            Post a Job Ad <ArrowRight size={16} />
          </Link>
          <Link href="#employer-pricing" className="flex items-center gap-2 rounded-xl border border-aegean-900/10 bg-white px-5 py-3 text-sm font-bold text-aegean-700 hover:bg-aegean-50">
            View Employer Pricing
          </Link>
        </div>
      </PageHero>

      <section className="section-shell py-16">
        <div className="rounded-[2rem] border border-orange-200 bg-orange-50/80 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-sunset">
              <Megaphone size={21} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold">Employer advertising notice</h2>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-aegean-950/65">
                Pricing applies only to businesses and employers posting job advertisements. Workers never pay to search for work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="employer-pricing" className="bg-sand py-16">
        <div className="section-shell">
          <span className="eyebrow">Employer pricing</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.04em]">Choose a job advertising package</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {pricing.map((item) => (
              <article key={item.packageId} className={`flex flex-col rounded-[2rem] border bg-white p-6 ${item.packageId === "job-featured" ? "border-sunset shadow-card" : "border-aegean-900/10"}`}>
                {item.packageId === "job-featured" && <span className="mb-4 flex w-fit items-center gap-1 rounded-full bg-sunset px-3 py-1 text-xs font-bold text-white"><Star size={12} fill="currentColor" /> Popular</span>}
                <h3 className="font-display text-2xl font-extrabold">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-aegean-950/55">{item.description}</p>
                <p className="mt-6 font-display text-4xl font-extrabold text-aegean-700">€{item.price}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-aegean-950/35">one-time</p>
                <Link href={`/submit-request?package=${item.packageId}`} className="mt-7 flex min-h-11 items-center justify-center rounded-xl bg-aegean-950 px-4 text-sm font-bold text-white hover:bg-aegean-700">
                  Select package
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">Business benefits</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.04em]">Why post on Santorini Live?</h2>
            <div className="mt-7 grid gap-3">
              {benefits.map((benefit) => (
                <p key={benefit} className="flex items-start gap-3 rounded-2xl border border-aegean-900/10 bg-white p-4 text-sm font-semibold leading-6 text-aegean-950/60">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-aegean-700" /> {benefit}
                </p>
              ))}
            </div>
          </div>

          <div>
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.04em]">From request to published ad</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="rounded-3xl border border-aegean-900/10 bg-white p-5 shadow-sm">
                    <span className="grid size-11 place-items-center rounded-xl bg-aegean-50 text-aegean-700"><Icon size={21} /></span>
                    <h3 className="mt-5 font-display text-xl font-extrabold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-aegean-950/55">{step.description}</p>
                  </article>
                );
              })}
            </div>
            <Link href="/submit-request?category=Job&package=job-basic" className="mt-7 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sunset px-5 text-sm font-bold text-white hover:bg-orange-600">
              Submit job request form <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
