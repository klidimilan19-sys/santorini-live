import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import type { GuideTopic, VillageGuide } from "@/data/guide-data";

export function GuideLinkCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="group flex min-h-44 flex-col justify-between rounded-3xl border border-aegean-900/10 bg-white p-6 transition hover:-translate-y-1 hover:border-aegean-300 hover:shadow-card">
      <div>
        <h3 className="font-display text-xl font-extrabold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-aegean-950/50">{description}</p>
      </div>
      <span className="mt-6 flex items-center gap-2 text-sm font-bold text-aegean-700">Explore guide <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
    </Link>
  );
}

export function VillageCard({ village }: { village: VillageGuide }) {
  return (
    <Link href={`/guide/villages/${village.slug}`} className="card-lift group overflow-hidden rounded-3xl border border-aegean-900/10 bg-white">
      <div className="relative h-52 overflow-hidden">
        {village.imageUrl ? (
          <Image src={village.imageUrl} alt={village.imageAlt} fill className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <VillageImagePlaceholder alt={village.imageAlt} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-aegean-950/70 via-transparent to-transparent" />
        <h3 className="absolute bottom-4 left-5 font-display text-2xl font-extrabold text-white">{village.name}</h3>
      </div>
      <div className="p-5">
        <p className="text-sm leading-6 text-aegean-950/55">{village.tagline}</p>
        <p className="mt-3 text-[11px] text-aegean-950/35">Image: {village.imageCredit}</p>
        <span className="mt-4 flex items-center gap-2 text-sm font-bold text-aegean-700">Village guide <ArrowRight size={16} /></span>
      </div>
    </Link>
  );
}

function VillageImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div role="img" aria-label={alt} className="absolute inset-0 grid place-items-center bg-gradient-to-br from-aegean-100 via-white to-sand text-center">
      <div className="px-6">
        <p className="font-display text-xl font-extrabold text-aegean-950">Image coming soon</p>
        <p className="mt-2 text-xs font-semibold text-aegean-950/45">Verified free source needed</p>
      </div>
    </div>
  );
}

export function GuideHighlights({ topic }: { topic: GuideTopic }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {topic.highlights.map((highlight, index) => (
        <article key={highlight.title} className="rounded-3xl border border-aegean-900/10 bg-white p-6">
          <span className="grid size-10 place-items-center rounded-xl bg-aegean-50 font-display font-extrabold text-aegean-700">{index + 1}</span>
          <h2 className="mt-5 font-display text-xl font-extrabold">{highlight.title}</h2>
          <p className="mt-2 text-sm leading-6 text-aegean-950/55">{highlight.description}</p>
          <div className="mt-5 space-y-2 border-t border-aegean-900/10 pt-4 text-xs font-semibold text-aegean-950/45">
            <p className="flex items-center gap-2"><MapPin size={14} className="text-aegean-700" />{highlight.location}</p>
            <p className="flex items-center gap-2"><Clock3 size={14} className="text-aegean-700" />{highlight.duration}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
