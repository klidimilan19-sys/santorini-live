"use client";

import { AlertTriangle, CloudSun, Info, LoaderCircle, Ship, TrafficCone } from "lucide-react";
import { useEffect, useState } from "react";
import type { LiveUpdate } from "@/data/mock-data";

const categoryIcon = {
  Weather: CloudSun,
  Transport: Ship,
  Traffic: TrafficCone,
  "Local news": Info,
};

export function LiveUpdatesFeed({ initialUpdates }: { initialUpdates: LiveUpdate[] }) {
  const [updates, setUpdates] = useState(initialUpdates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/live-updates", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: LiveUpdate[]) => setUpdates(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-aegean-950/45">{updates.length} published updates</p>
        {loading && <span className="flex items-center gap-2 text-xs text-aegean-950/40"><LoaderCircle size={14} className="animate-spin" /> Refreshing</span>}
      </div>
      <div className="grid gap-4">
        {updates.map((update) => {
          const Icon = update.severity === "important" ? AlertTriangle : categoryIcon[update.category];
          return (
            <article key={update.id} className="flex gap-4 rounded-3xl border border-aegean-900/10 bg-white p-5">
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${update.severity === "important" ? "bg-red-50 text-red-700" : "bg-aegean-50 text-aegean-700"}`}><Icon size={20} /></span>
              <div>
                <div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-wider text-aegean-700">{update.category}</span><span className="text-xs text-aegean-950/35">Updated {formatDate(update.lastUpdated)}</span></div>
                <h2 className="mt-1 font-display text-xl font-extrabold">{update.title}</h2>
                <p className="mt-2 text-sm leading-6 text-aegean-950/55">{update.summary}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", month: "short", day: "numeric", timeZone: "Europe/Athens" }).format(new Date(value));
}
