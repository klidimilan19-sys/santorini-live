import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { SubmitRequestForm } from "@/components/submit-request-form";

export const metadata: Metadata = { title: "Submit Request" };

export default function SubmitRequestPage() {
  return (
    <>
      <PageHero eyebrow="No account required" title="Send your request. We’ll handle the publishing." description="Submit the details, choose a package, and continue to card payment. Every paid request is reviewed manually." />
      <section className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16"><Suspense><SubmitRequestForm /></Suspense></section>
    </>
  );
}
