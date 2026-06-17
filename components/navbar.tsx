"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Waves, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

const links = [
  { href: "/", label: "Home" },
  { href: "/guide", label: "Guide" },
  { href: "/jobs", label: "Jobs" },
  { href: "/workers", label: "Workers" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/rentals", label: "Rentals" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/weather", label: "Weather" },
  { href: "/live", label: "Live" },
  { href: "/advertise", label: "Advertise" },
];

const accommodationLinks = [
  { href: "/hotels", label: "Hotels" },
  { href: "/villas", label: "Villas" },
  { href: "/local-rentals", label: "Local Rentals" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-aegean-900/5 bg-white/90 backdrop-blur-xl">
      <div className="section-shell flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-xl bg-aegean-600 text-white shadow-lg shadow-aegean-600/20">
            <Waves size={22} strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-[-0.04em] text-aegean-950">
            Santorini<span className="text-sunset">Live</span>
          </span>
        </Link>

        <nav className="ml-8 hidden items-center gap-5 lg:flex xl:ml-10">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition hover:text-aegean-600 ${
                  active ? "text-aegean-600" : "text-aegean-950/65"
                }`}
              >
                {t(link.label)}
              </Link>
            );
          })}
          <details className="group relative">
            <summary className={`flex cursor-pointer list-none items-center gap-1 text-sm font-semibold transition hover:text-aegean-600 ${
              accommodationLinks.some((link) => pathname.startsWith(link.href)) ? "text-aegean-600" : "text-aegean-950/65"
            }`}>
              {t("Stay")} <ChevronDown size={14} className="transition group-open:rotate-180" />
            </summary>
            <div className="absolute right-0 top-8 w-52 rounded-2xl border border-aegean-900/10 bg-white p-2 shadow-card">
              {accommodationLinks.map((link) => <Link key={link.href} href={link.href} className="block rounded-xl px-4 py-3 text-sm font-semibold text-aegean-950/65 hover:bg-aegean-50 hover:text-aegean-700">{t(link.label)}</Link>)}
            </div>
          </details>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/submit-request"
            className="rounded-full bg-aegean-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-aegean-700"
          >
            {t("Submit request")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-xl bg-aegean-50 text-aegean-950"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-aegean-900/5 bg-white px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3.5 font-semibold ${
                  (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                    ? "bg-aegean-50 text-aegean-700"
                    : "text-aegean-950/70"
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
            <p className="px-4 pb-1 pt-4 text-xs font-bold uppercase tracking-wider text-aegean-950/35">{t("Accommodation")}</p>
            {accommodationLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3.5 font-semibold ${pathname.startsWith(link.href) ? "bg-aegean-50 text-aegean-700" : "text-aegean-950/70"}`}>{t(link.label)}</Link>
            ))}
            <div className="mt-4 px-4"><LanguageSwitcher /></div>
            <Link href="/submit-request" onClick={() => setOpen(false)} className="mt-4 rounded-xl bg-aegean-950 px-4 py-3.5 text-center font-bold text-white">{t("Submit request")}</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
