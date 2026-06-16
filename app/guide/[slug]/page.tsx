import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { GuideHighlights } from "@/components/guide-cards";
import { PageHero } from "@/components/page-hero";
import { getGuideTopic, guideTopics } from "@/data/guide-data";

export function generateStaticParams() {
  return guideTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const topic = getGuideTopic((await params).slug);
  return { title: topic?.title ?? "Guide" };
}

export default async function GuideTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const topic = getGuideTopic((await params).slug);
  if (!topic) notFound();

  return (
    <>
      <PageHero eyebrow={topic.eyebrow} title={topic.title} description={topic.description}>
        <Link href="/guide/trip-planner" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-sunset px-5 py-3 text-sm font-bold text-white"><Sparkles size={16} /> Personalize this trip</Link>
      </PageHero>
      <section className="section-shell py-16">
        <p className="mb-10 max-w-3xl font-display text-2xl font-bold leading-9 text-aegean-950/80">{topic.intro}</p>
        <GuideHighlights topic={topic} />
      </section>
      <section className="bg-sand py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <span className="eyebrow">Good to know</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold">Local planning tips</h2>
            <div className="mt-7 grid gap-3">
              {topic.tips.map((tip) => <p key={tip} className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-aegean-950/60"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-aegean-700" />{tip}</p>)}
            </div>
          </div>
          <div className="rounded-3xl bg-aegean-950 p-7 text-white">
            <h2 className="font-display text-2xl font-extrabold">Keep exploring</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">Compare villages and combine this guide with live weather, transport updates and local listings.</p>
            <Link href="/guide/villages" className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-aegean-950">Explore villages <ArrowRight size={16} /></Link>
            <Link href="/weather" className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-bold">Check live weather <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
