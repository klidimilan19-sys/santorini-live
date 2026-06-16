"use client";

import Image from "next/image";
import { AlertTriangle, Flag, ImageIcon, MapPin, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import type { MarketplaceListing } from "@/data/mock-data";

export function MarketplaceCard({ listing }: { listing: MarketplaceListing }) {
  const [reported, setReported] = useState(false);

  return (
    <article className={`card-lift relative overflow-hidden rounded-3xl border bg-white ${
      listing.featured ? "border-aegean-500/40 shadow-card" : "border-aegean-900/10"
    }`}>
      <div className="relative h-52 bg-gradient-to-br from-aegean-50 to-sand">
        {listing.image ? (
          <Image src={listing.image} alt={listing.title} fill className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-center text-aegean-950/25">
            <div><ImageIcon className="mx-auto" size={36} /><p className="mt-2 text-xs font-bold uppercase tracking-wider">Photo placeholder</p></div>
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {listing.featured && <span className="flex items-center gap-1 rounded-full bg-aegean-700 px-3 py-1.5 text-xs font-bold text-white"><Star size={12} fill="currentColor" /> Featured</span>}
          {listing.urgent && <span className="flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white"><AlertTriangle size={12} /> Urgent sale</span>}
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-aegean-700">{listing.category}</p>
        <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight">{listing.title}</h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-display text-2xl font-extrabold text-aegean-700">{listing.price === 0 ? "Free" : `€${listing.price.toLocaleString()}`}</p>
          <span className="rounded-full bg-sand px-3 py-1.5 text-xs font-bold text-aegean-950/60">{listing.condition}</span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-aegean-950/50"><MapPin size={15} />{listing.village}</p>
        <div className="mt-5 border-t border-aegean-900/10 pt-4">
          <p className="text-xs text-aegean-950/40">Seller</p>
          <p className="mt-1 text-sm font-bold">{listing.sellerName} · {listing.sellerContact}</p>
        </div>
        <a href={listing.whatsappUrl} target="_blank" rel="noreferrer" className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white hover:bg-[#1fb958]"><MessageCircle size={17} /> WhatsApp seller</a>
        <button type="button" onClick={() => setReported(true)} disabled={reported} className="mt-2 flex w-full min-h-10 items-center justify-center gap-2 rounded-xl text-xs font-bold text-aegean-950/40 hover:bg-red-50 hover:text-red-700 disabled:cursor-default disabled:text-red-600">
          <Flag size={14} /> {reported ? "Listing reported" : "Report listing"}
        </button>
      </div>
    </article>
  );
}
