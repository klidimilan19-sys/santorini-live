import { AlertTriangle, CloudSun, Info, Ship, TrafficCone } from "lucide-react";
import type { LiveUpdate } from "@/data/mock-data";

const icons = {
  Weather: CloudSun,
  Transport: Ship,
  Traffic: TrafficCone,
  "Local news": Info,
};

export function SearchLiveUpdateCard({ update }: { update: LiveUpdate }) {
  const Icon = update.severity === "important" ? AlertTriangle : icons[update.category];

  return (
    <article className="flex gap-4 rounded-3xl border border-aegean-900/10 bg-white p-5">
      <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${update.severity === "important" ? "bg-red-50 text-red-700" : "bg-aegean-50 text-aegean-700"}`}><Icon size={20} /></span>
      <div>
        <div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-wider text-aegean-700">{update.category}</span><span className="text-xs text-aegean-950/35">Updated {formatDate(update.lastUpdated)}</span></div>
        <h3 className="mt-1 font-display text-lg font-extrabold">{update.title}</h3>
        <p className="mt-2 text-sm leading-6 text-aegean-950/55">{update.summary}</p>
      </div>
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Athens" }).format(new Date(value));
}
