import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { WorkerProfilesBrowser } from "@/components/worker-profiles-browser";
import { workerProfileRepository } from "@/lib/worker-profile-repository";

export const metadata: Metadata = { title: "Workers Looking for Work" };
export const dynamic = "force-dynamic";

export default function WorkersPage() {
  const profiles = workerProfileRepository.listPublished();

  return (
    <>
      <PageHero
        eyebrow="Santorini talent"
        title="Workers ready for their next opportunity."
        description="Browse admin-approved worker profiles or add your own CV without creating an account."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/workers/submit" className="flex items-center gap-2 rounded-xl bg-sunset px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">
            Add your CV <ArrowRight size={16} />
          </Link>
          <span className="flex items-center gap-2 rounded-xl border border-aegean-900/10 bg-white px-5 py-3 text-sm font-bold text-aegean-700">
            <ShieldCheck size={16} /> Admin-approved profiles
          </span>
        </div>
      </PageHero>
      <section className="section-shell py-14 sm:py-16">
        <WorkerProfilesBrowser profiles={profiles} />
      </section>
    </>
  );
}
