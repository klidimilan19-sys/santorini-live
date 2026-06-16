import Image from "next/image";
import Link from "next/link";
import { Check, ImageIcon, MapPin, MessageCircle, Star, Users } from "lucide-react";
import type { Accommodation, LocalRental } from "@/data/mock-data";

export function AccommodationCard({ item }: { item: Accommodation }) {
  return (
    <article className="card-lift overflow-hidden rounded-3xl border border-aegean-900/10 bg-white">
      <div className="relative h-56 bg-gradient-to-br from-aegean-50 to-sand">
        {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" /> : <PhotoPlaceholder />}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-aegean-700 backdrop-blur">{item.category}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div><h2 className="font-display text-xl font-extrabold tracking-tight">{item.name}</h2><p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-aegean-700"><MapPin size={15} />{item.village}</p></div>
          <span className="flex items-center gap-1 font-bold"><Star size={15} className="fill-sunset text-sunset" />{item.rating}</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-aegean-950/55">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{item.features.map((feature) => <span key={feature} className="flex items-center gap-1 rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-aegean-950/55"><Check size={13} />{feature}</span>)}</div>
        <div className="mt-5 flex items-center justify-between border-t border-aegean-900/10 pt-4">
          <p><span className="text-xs font-semibold text-aegean-950/35">From </span><span className="font-display text-2xl font-extrabold text-aegean-700">€{item.priceFrom}</span><span className="text-xs text-aegean-950/40">/{item.priceUnit}</span></p>
          <Link href={item.contactUrl} className="rounded-xl bg-aegean-950 px-4 py-2.5 text-xs font-bold text-white">Request listing</Link>
        </div>
      </div>
    </article>
  );
}

export function LocalRentalCard({ rental }: { rental: LocalRental }) {
  return (
    <article className="card-lift overflow-hidden rounded-3xl border border-aegean-900/10 bg-white">
      <div className="relative h-52 bg-gradient-to-br from-aegean-50 to-sand">
        {rental.image ? <Image src={rental.image} alt={rental.title} fill className="object-cover" /> : <PhotoPlaceholder />}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-aegean-700 backdrop-blur">{rental.propertyType}</span>
        {rental.suitableForWorkers && <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"><Users size={12} /> Worker friendly</span>}
      </div>
      <div className="p-5">
        <h2 className="font-display text-xl font-extrabold tracking-tight">{rental.title}</h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-aegean-700"><MapPin size={15} />{rental.village}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-sand p-4 text-sm">
          <div><p className="text-xs text-aegean-950/35">Monthly price</p><p className="mt-1 font-display text-xl font-extrabold">€{rental.monthlyPrice}</p></div>
          <div><p className="text-xs text-aegean-950/35">Available from</p><p className="mt-1 font-bold">{rental.availableFrom}</p></div>
        </div>
        <p className="mt-4 text-sm font-semibold text-aegean-950/55">Contact: {rental.contactPhone}</p>
        <a href={rental.whatsappUrl} target="_blank" rel="noreferrer" className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white hover:bg-[#1fb958]"><MessageCircle size={17} /> WhatsApp</a>
      </div>
    </article>
  );
}

function PhotoPlaceholder() {
  return <div className="grid h-full place-items-center text-center text-aegean-950/25"><div><ImageIcon className="mx-auto" size={36} /><p className="mt-2 text-xs font-bold uppercase tracking-wider">Photos placeholder</p></div></div>;
}
