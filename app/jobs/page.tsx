import type { Metadata } from "next";
import Link from "next/link";
import { Check, Search } from "lucide-react";
import { JobsBrowser } from "@/components/jobs-browser";
import { PageHero } from "@/components/page-hero";
import { featuredFirstJobs } from "@/data/mock-data";

export const metadata: Metadata = { title: "Jobs" };

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Jobs for workers"
        title="Find Work in Santorini"
        description="Browse seasonal and year-round jobs from hotels, restaurants, bars, rentals and local businesses."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/workers/submit" className="flex items-center gap-2 rounded-xl bg-aegean-950 px-5 py-3 text-sm font-bold text-white hover:bg-aegean-700">
            <Search size={16} /> I am looking for work
          </Link>
        </div>
      </PageHero>

      <section className="section-shell py-16">
        <div className="mb-10 rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-emerald-700">
              <Check size={21} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold">Free for job seekers</h2>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-aegean-950/65">
                Job seekers use this section for free. No payment is required to search or apply for jobs.
              </p>
            </div>
          </div>
        </div>

        <JobsBrowser jobs={featuredFirstJobs} />
      </section>
    </>
  );
}
