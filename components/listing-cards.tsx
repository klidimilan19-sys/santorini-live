import Image from "next/image";
import { BriefcaseBusiness, Check, Clock3, ExternalLink, Heart, House, MapPin, Navigation, Phone, Star, Utensils } from "lucide-react";
import type { Job, Rental, Restaurant } from "@/data/mock-data";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className={`card-lift relative overflow-hidden rounded-3xl border p-6 ${
      job.featured
        ? "border-sunset/40 bg-gradient-to-br from-orange-50 via-white to-aegean-50 shadow-card"
        : "border-aegean-900/10 bg-white"
    }`}>
      {job.featured && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sunset to-amber-400" />}
      <div className="flex items-start justify-between gap-4">
        <span className={`grid size-12 place-items-center rounded-2xl font-display text-lg font-extrabold ${
          job.featured ? "bg-sunset text-white" : "bg-aegean-50 text-aegean-700"
        }`}>
          {job.company.charAt(0)}
        </span>
        {job.featured && <span className="flex items-center gap-1 rounded-full bg-sunset px-3 py-1 text-xs font-bold text-white"><Star size={12} fill="currentColor" /> Featured</span>}
      </div>
      <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight text-aegean-950">{job.title}</h3>
      <p className="mt-1 text-sm font-medium text-aegean-950/55">{job.company}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-aegean-950/60">
        <span className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-2"><MapPin size={14} />{job.village}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-2"><BriefcaseBusiness size={14} />{job.position}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-aegean-950/55">
        {job.accommodationIncluded && <span className="flex items-center gap-1.5"><House size={14} className="text-aegean-700" /> Accommodation</span>}
        {job.foodIncluded && <span className="flex items-center gap-1.5"><Utensils size={14} className="text-sunset" /> Food included</span>}
        {!job.accommodationIncluded && !job.foodIncluded && <span className="flex items-center gap-1.5"><Check size={14} /> Verified employer</span>}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-aegean-900/10 pt-5">
        <p className="font-bold text-aegean-700">{job.salary}</p>
        <p className="flex items-center gap-1 text-xs text-aegean-950/40"><Clock3 size={13} />{job.posted}</p>
      </div>
      <a href={job.contact.includes("@") ? `mailto:${job.contact}` : `tel:${job.contact.replace(/\s/g, "")}`} className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-aegean-950 px-4 text-sm font-bold text-white hover:bg-aegean-700">
        Contact employer
      </a>
    </article>
  );
}

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <article className="card-lift overflow-hidden rounded-3xl border border-aegean-900/10 bg-white">
      <div className="relative h-52">
        <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" />
        <button aria-label={`Save ${restaurant.name}`} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-aegean-950 backdrop-blur">
          <Heart size={18} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-extrabold tracking-tight">{restaurant.name}</h3>
            <p className="mt-1 text-sm text-aegean-950/50">{restaurant.cuisine} · {restaurant.priceRange}</p>
          </div>
          <span className="flex items-center gap-1 font-bold text-aegean-950"><Star size={15} className="fill-sunset text-sunset" />{restaurant.rating}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-aegean-700"><MapPin size={15} />{restaurant.village}</p>
          <a href={`tel:${restaurant.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-xs font-bold text-aegean-950/55"><Phone size={14} /> Call</a>
        </div>
        <a href={restaurant.mapUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-aegean-950 px-4 text-sm font-bold text-white hover:bg-aegean-700"><Navigation size={16} /> View on map</a>
        <p className="mt-3 text-center text-[11px] text-aegean-950/35">Ratings updated {formatUpdated(restaurant.lastUpdated)}</p>
      </div>
    </article>
  );
}

function formatUpdated(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Athens" }).format(new Date(value));
}

export function RentalCard({ rental }: { rental: Rental }) {
  return (
    <article className="card-lift overflow-hidden rounded-3xl border border-aegean-900/10 bg-white">
      <div className="relative h-52">
        <Image src={rental.image} alt={rental.businessName} fill className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-aegean-700 backdrop-blur">{rental.category}</span>
        <button aria-label={`Save ${rental.businessName}`} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 backdrop-blur"><Heart size={18} /></button>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-extrabold tracking-tight">{rental.businessName}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-aegean-950/50"><MapPin size={15} />{rental.village}</p>
        <div className="mt-4 flex items-center justify-between">
          <p><span className="text-xs font-semibold uppercase tracking-wider text-aegean-950/35">From </span><span className="font-display text-xl font-extrabold text-aegean-700">€{rental.priceFrom}</span><span className="text-sm text-aegean-950/40">/{rental.priceUnit}</span></p>
          <p className="text-xs font-semibold text-aegean-950/45">{rental.phone}</p>
        </div>
        <a href={rental.contactUrl} className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sunset px-4 text-sm font-bold text-white hover:bg-orange-600"><Phone size={16} /> Contact business <ExternalLink size={14} /></a>
      </div>
    </article>
  );
}
