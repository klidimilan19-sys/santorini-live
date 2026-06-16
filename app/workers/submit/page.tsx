import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { WorkerProfileForm } from "@/components/worker-profile-form";

export const metadata: Metadata = { title: "Submit Your CV" };

export default function SubmitWorkerProfilePage() {
  return (
    <>
      <PageHero
        eyebrow="No account required"
        title="Tell Santorini employers you are available."
        description="Create a CV-style work profile or apply to a job. Every submission is reviewed by an admin before it can be published."
      />
      <section className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <Suspense><WorkerProfileForm /></Suspense>
      </section>
    </>
  );
}
