import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeEuro, Check, UserRoundSearch } from "lucide-react";
import { JobsBrowser } from "@/components/jobs-browser";
import { PageHero } from "@/components/page-hero";
import { featuredFirstJobs } from "@/data/mock-data";

export const metadata: Metadata = { title: "Jobs" };

export default function JobsPage() {
  return (
    <>
      <PageHero eyebrow="Island opportunities" title="Find work that feels like living." description="Seasonal roles, year-round careers and flexible work from trusted Santorini businesses.">
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/workers/submit" className="rounded-xl bg-aegean-950 px-5 py-3 text-sm font-bold text-white hover:bg-aegean-700">I am looking for work</Link>
          <Link href="/submit-request?package=job-basic" className="rounded-xl bg-sunset px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">Post a job ad</Link>
          <Link href="/advertise" className="flex items-center gap-2 rounded-xl border border-aegean-900/10 bg-white px-5 py-3 text-sm font-bold text-aegean-700">Employer pricing <ArrowRight size={16} /></Link>
        </div>
      </PageHero>
      <section className="section-shell py-16">
        <div className="mb-10 grid gap-4 rounded-[2rem] border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white text-emerald-700"><Check size={21} /></span>
              <h2 className="font-display text-2xl font-extrabold">Workers apply for free</h2>
            </div>
            <div className="mt-5 grid gap-2 text-sm font-semibold text-aegean-950/65">
              <p>✓ Search jobs for free</p>
              <p>✓ View salaries</p>
              <p>✓ View accommodation information</p>
              <p>✓ Contact employers</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white text-sunset"><BadgeEuro size={21} /></span>
              <h2 className="font-display text-2xl font-extrabold">Employers pay to advertise</h2>
            </div>
            <div className="mt-5 grid gap-2 text-sm font-semibold text-aegean-950/65">
              <p>✓ Post job advertisements</p>
              <p>✓ Promote vacancies</p>
              <p>✓ Feature listings for greater visibility</p>
            </div>
          </div>
        </div>
        <div className="mb-10 flex flex-col gap-5 rounded-3xl bg-aegean-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10"><UserRoundSearch size={23} /></span>
            <div><h2 className="font-display text-xl font-extrabold">Looking to hire?</h2><p className="mt-1 max-w-xl text-sm leading-6 text-white/60">Browse admin-approved CV profiles from workers currently available in Santorini.</p></div>
          </div>
          <Link href="/workers" className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-aegean-950">View workers <ArrowRight size={16} /></Link>
        </div>
        <JobsBrowser jobs={featuredFirstJobs} />
      </section>
    </>
  );
}
