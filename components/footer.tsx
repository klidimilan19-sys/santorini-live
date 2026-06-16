import Link from "next/link";
import { Instagram, Mail, MapPin, Waves } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-aegean-950 text-white">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-5 flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-white text-aegean-700">
              <Waves size={22} />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">
              Santorini<span className="text-sunset">Live</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-6 text-white/60">
            The local pulse of Santorini. Live, work, eat and explore like you belong here.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-display font-bold">Explore</h3>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <Link href="/guide" className="hover:text-white">Santorini Guide</Link>
            <Link href="/guide/trip-planner" className="hover:text-white">AI Trip Planner</Link>
            <Link href="/jobs" className="hover:text-white">Find a job</Link>
            <Link href="/workers" className="hover:text-white">Workers looking for work</Link>
            <Link href="/restaurants" className="hover:text-white">Where to eat</Link>
            <Link href="/rentals" className="hover:text-white">Find a home</Link>
            <Link href="/marketplace" className="hover:text-white">Island marketplace</Link>
            <Link href="/weather" className="hover:text-white">Island weather</Link>
            <Link href="/live" className="hover:text-white">Live updates</Link>
            <Link href="/hotels" className="hover:text-white">Hotels</Link>
            <Link href="/villas" className="hover:text-white">Villas</Link>
            <Link href="/local-rentals" className="hover:text-white">Local rentals</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-display font-bold">Submit & advertise</h3>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <Link href="/submit-request" className="hover:text-white">Submit request</Link>
            <Link href="/advertise" className="hover:text-white">Advertising pricing</Link>
            <Link href="/contact" className="hover:text-white">Contact support</Link>
            <Link href="/admin/login" className="hover:text-white">Admin login</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-display font-bold">Stay connected</h3>
          <div className="space-y-3 text-sm text-white/60">
            <p className="flex items-center gap-2"><MapPin size={16} /> Fira, Santorini, Greece</p>
            <p className="flex items-center gap-2"><Mail size={16} /> hello@santorini.live</p>
            <p className="flex items-center gap-2"><Instagram size={16} /> @santorinilive</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Santorini Live. Made with sun in the Cyclades.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
