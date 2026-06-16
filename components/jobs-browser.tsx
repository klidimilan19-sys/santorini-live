"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { JobCard } from "@/components/listing-cards";
import type { Job } from "@/data/mock-data";

const villages = ["All villages", "Oia", "Fira", "Vlychada", "Imerovigli", "Pyrgos", "Kamari"];
const positions = ["All positions", "Hospitality", "Kitchen", "Tourism", "Marketing", "Housekeeping"];

export function JobsBrowser({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState("");
  const [village, setVillage] = useState("All villages");
  const [position, setPosition] = useState("All positions");
  const [salary, setSalary] = useState("Any salary");
  const [accommodation, setAccommodation] = useState(false);
  const [food, setFood] = useState(false);

  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const matchesQuery = `${job.title} ${job.company}`.toLowerCase().includes(query.toLowerCase());
    const matchesVillage = village === "All villages" || job.village === village;
    const matchesPosition = position === "All positions" || job.position === position;
    const matchesSalary =
      salary === "Any salary" ||
      (salary === "€1,500+" ? job.salaryMin >= 1500 : job.salaryMin < 1500);
    return matchesQuery && matchesVillage && matchesPosition && matchesSalary &&
      (!accommodation || job.accommodationIncluded) && (!food || job.foodIncluded);
  }), [accommodation, food, jobs, position, query, salary, village]);

  return (
    <>
      <div className="relative z-10 -mt-8 rounded-3xl border border-aegean-900/10 bg-white p-4 shadow-card">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="flex min-h-12 items-center gap-3 rounded-xl bg-sand px-4 lg:col-span-2">
            <Search size={18} className="text-aegean-700" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Company or position" className="w-full bg-transparent text-sm outline-none placeholder:text-aegean-950/35" />
          </label>
          <FilterSelect label="Village" value={village} options={villages} onChange={setVillage} />
          <FilterSelect label="Position" value={position} options={positions} onChange={setPosition} />
          <FilterSelect label="Salary" value={salary} options={["Any salary", "Under €1,500", "€1,500+"]} onChange={setSalary} />
          <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl bg-sand px-4 text-sm font-bold">
            <input type="checkbox" checked={accommodation} onChange={(event) => setAccommodation(event.target.checked)} className="size-4 accent-aegean-700" /> Accommodation
          </label>
          <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl bg-sand px-4 text-sm font-bold">
            <input type="checkbox" checked={food} onChange={(event) => setFood(event.target.checked)} className="size-4 accent-aegean-700" /> Food included
          </label>
          <button type="button" onClick={() => { setQuery(""); setVillage("All villages"); setPosition("All positions"); setSalary("Any salary"); setAccommodation(false); setFood(false); }} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-aegean-900/10 px-4 text-sm font-bold text-aegean-700 hover:bg-aegean-50">
            <SlidersHorizontal size={17} /> Reset filters
          </button>
        </div>
      </div>

      <div className="mb-7 mt-12 flex items-end justify-between">
        <div><p className="text-sm font-bold text-aegean-700">{filteredJobs.length} open positions</p><h2 className="mt-1 font-display text-2xl font-extrabold">Latest island jobs</h2></div>
        <p className="hidden text-sm text-aegean-950/45 sm:block">Featured listings appear first</p>
      </div>
      {filteredJobs.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}</div>
      ) : (
        <div className="rounded-3xl bg-sand px-6 py-16 text-center"><h3 className="font-display text-xl font-extrabold">No matching jobs</h3><p className="mt-2 text-sm text-aegean-950/50">Try clearing one or two filters.</p></div>
      )}
    </>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="rounded-xl bg-sand px-4 py-2">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-aegean-950/35">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-0.5 w-full bg-transparent text-sm font-bold outline-none">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
