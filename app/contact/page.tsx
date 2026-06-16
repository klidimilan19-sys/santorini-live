import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Talk to a local" title="Let’s make island life easier." description="Questions, listings, partnerships or a good local tip. Our small Santorini team is here to help." />
      <section className="section-shell grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-sm font-bold text-aegean-700">Get in touch</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">We’re based on the island.</h2>
          <p className="mt-4 leading-7 text-aegean-950/55">No call center, no generic replies. Just people who know Santorini and care about building a useful local platform.</p>
          <div className="mt-8 space-y-4">
            {[
              [Mail, "Email us", "hello@santorini.live"],
              [MessageCircle, "WhatsApp", "+30 690 000 0000"],
              [MapPin, "Find us", "Fira, Santorini 847 00"],
              [Clock3, "Response time", "Usually within 1 business day"],
            ].map(([Icon, label, value]) => {
              const InfoIcon = Icon as typeof Mail;
              return <div key={label as string} className="flex items-center gap-4 rounded-2xl bg-sand p-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-aegean-700"><InfoIcon size={20} /></span><div><p className="text-xs font-bold uppercase tracking-wider text-aegean-950/35">{label as string}</p><p className="mt-1 text-sm font-bold">{value as string}</p></div></div>;
            })}
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
