import Link from "next/link";
import { Building2, Home, KeyRound } from "lucide-react";

const links = [
  { href: "/hotels", label: "Hotels", icon: Building2 },
  { href: "/villas", label: "Airbnb & Villas", icon: Home },
  { href: "/local-rentals", label: "Local Rentals", icon: KeyRound },
];

export function AccommodationNav() {
  return (
    <div className="grid gap-2 rounded-3xl bg-white p-3 shadow-card sm:grid-cols-3">
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className="flex min-h-14 items-center gap-3 rounded-2xl px-4 text-sm font-bold text-aegean-950/65 transition hover:bg-aegean-50 hover:text-aegean-700">
          <span className="grid size-9 place-items-center rounded-xl bg-aegean-50 text-aegean-700"><Icon size={18} /></span>
          {label}
        </Link>
      ))}
    </div>
  );
}
