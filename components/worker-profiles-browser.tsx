"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  Languages,
  Mail,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { WorkerProfile } from "@/lib/worker-profile-repository";

export function WorkerProfilesBrowser({ profiles }: { profiles: WorkerProfile[] }) {
  const [query, setQuery] = useState("");
  const [village, setVillage] = useState("All villages");
  const villages = ["All villages", ...Array.from(new Set(profiles.map((profile) => profile.currentVillage)))];

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return profiles.filter((profile) => {
      const searchable = [
        profile.fullName,
        profile.desiredPosition,
        profile.workType,
        profile.languages.join(" "),
        profile.about,
      ].join(" ").toLowerCase();
      return (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (village === "All villages" || profile.currentVillage === village);
    });
  }, [profiles, query, village]);

  return (
    <>
      <div className="grid gap-3 rounded-3xl border border-aegean-900/10 bg-white p-4 shadow-card sm:grid-cols-[1fr_220px]">
        <label className="flex min-h-12 items-center gap-3 rounded-xl bg-sand px-4">
          <Search size={18} className="text-aegean-700" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Position, skill or language"
            className="w-full bg-transparent text-sm outline-none placeholder:text-aegean-950/35"
          />
        </label>
        <label className="rounded-xl bg-sand px-4 py-2">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-aegean-950/35">Village</span>
          <select value={village} onChange={(event) => setVillage(event.target.value)} className="mt-0.5 w-full bg-transparent text-sm font-bold outline-none">
            {villages.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="mb-7 mt-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-aegean-700">{filteredProfiles.length} available workers</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold">People looking for work</h2>
        </div>
        <Link href="/workers/submit" className="hidden rounded-xl bg-sunset px-4 py-3 text-sm font-bold text-white sm:block">Add your CV</Link>
      </div>

      {filteredProfiles.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.map((profile) => <WorkerProfileCard key={profile.id} profile={profile} />)}
        </div>
      ) : (
        <div className="rounded-3xl bg-sand px-6 py-16 text-center">
          <h3 className="font-display text-xl font-extrabold">No matching worker profiles</h3>
          <p className="mt-2 text-sm text-aegean-950/50">Try another skill or village.</p>
        </div>
      )}
    </>
  );
}

function WorkerProfileCard({ profile }: { profile: WorkerProfile }) {
  return (
    <article className="card-lift rounded-3xl border border-aegean-900/10 bg-white p-6">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-aegean-50 text-aegean-700">
          <UserRound size={23} />
        </span>
        <div>
          <h3 className="font-display text-xl font-extrabold">{profile.fullName}</h3>
          <p className="mt-1 font-bold text-aegean-700">{profile.desiredPosition}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-2 text-sm text-aegean-950/55">
        <p className="flex items-center gap-2"><MapPin size={15} className="text-aegean-700" />{profile.currentVillage}</p>
        <p className="flex items-center gap-2"><BriefcaseBusiness size={15} className="text-aegean-700" />{profile.experienceYears} years experience · {profile.workType}</p>
        <p className="flex items-center gap-2"><CalendarDays size={15} className="text-aegean-700" />{profile.availableFrom}</p>
        <p className="flex items-start gap-2"><Languages size={15} className="mt-0.5 text-aegean-700" />{profile.languages.join(", ")}</p>
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-aegean-950/55">{profile.about}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {profile.accommodationNeeded && <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-sunset">Needs accommodation</span>}
        <span className="rounded-full bg-aegean-50 px-3 py-1.5 text-xs font-bold text-aegean-700">Admin approved</span>
      </div>
      <a href={`mailto:${profile.email}`} className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-aegean-950 px-4 text-sm font-bold text-white hover:bg-aegean-700">
        <Mail size={16} /> Contact worker
      </a>
    </article>
  );
}
