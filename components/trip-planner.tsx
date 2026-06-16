"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, LoaderCircle, Route, Sparkles } from "lucide-react";
import type { TripPlan, TripPlannerInput } from "@/lib/trip-planner";

const initialInput: TripPlannerInput = {
  days: 3,
  budget: "Moderate",
  travelStyle: "Balanced",
  transportation: "Public transport",
};

export function TripPlanner() {
  const [input, setInput] = useState(initialInput);
  const [plan, setPlan] = useState<TripPlan>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/trip-planner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    setLoading(false);
    if (!response.ok) {
      setError("The planner could not create an itinerary. Please check your choices.");
      return;
    }
    setPlan(await response.json() as TripPlan);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <form onSubmit={submit} className="h-fit rounded-[2rem] border border-aegean-900/10 bg-white p-6 shadow-card sm:p-8">
        <span className="grid size-12 place-items-center rounded-2xl bg-aegean-50 text-aegean-700"><Sparkles size={23} /></span>
        <h2 className="mt-5 font-display text-2xl font-extrabold">Build your island plan</h2>
        <p className="mt-2 text-sm leading-6 text-aegean-950/50">Choose your travel preferences and generate a mock itinerary instantly.</p>
        <div className="mt-6 grid gap-5">
          <label className="text-sm font-bold">Number of days
            <input type="number" min={1} max={14} value={input.days} onChange={(event) => setInput({ ...input, days: Number(event.target.value) })} className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" />
          </label>
          <PlannerSelect label="Budget" value={input.budget} options={["Budget", "Moderate", "Luxury"]} onChange={(value) => setInput({ ...input, budget: value as TripPlannerInput["budget"] })} />
          <PlannerSelect label="Travel style" value={input.travelStyle} options={["Relaxed", "Balanced", "Active", "Romantic", "Family"]} onChange={(value) => setInput({ ...input, travelStyle: value as TripPlannerInput["travelStyle"] })} />
          <PlannerSelect label="Transportation" value={input.transportation} options={["Public transport", "Rental car", "ATV / Scooter", "Private transfers"]} onChange={(value) => setInput({ ...input, transportation: value as TripPlannerInput["transportation"] })} />
        </div>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sunset px-5 py-4 font-bold text-white disabled:opacity-50">
          {loading ? <LoaderCircle size={18} className="animate-spin" /> : <Sparkles size={18} />}
          Generate itinerary
        </button>
        <p className="mt-3 text-center text-xs text-aegean-950/35">Mock suggestions only. Check live opening times, weather and transport.</p>
      </form>

      <div>
        {!plan ? (
          <div className="grid min-h-[460px] place-items-center rounded-[2rem] border-2 border-dashed border-aegean-900/10 bg-sand p-8 text-center">
            <div>
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-white text-aegean-700"><Route size={29} /></span>
              <h2 className="mt-5 font-display text-2xl font-extrabold">Your itinerary will appear here</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-aegean-950/50">The future AI integration will use the same form and itinerary structure, with richer personalized recommendations.</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="rounded-3xl bg-aegean-950 p-6 text-white">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#79c8ff]"><Sparkles size={15} /> Suggested itinerary</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold">{plan.summary}</h2>
              <p className="mt-2 text-xs text-white/45">Generated with mock planner data</p>
            </div>
            <div className="mt-4 space-y-4">
              {plan.days.map((day) => (
                <article key={day.day} className="rounded-3xl border border-aegean-900/10 bg-white p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sunset font-display font-extrabold text-white">{day.day}</span>
                    <div><p className="text-xs font-bold uppercase tracking-wider text-aegean-700">Day {day.day}</p><h3 className="mt-1 font-display text-xl font-extrabold">{day.title}</h3></div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <PlanBlock label="Morning" text={day.morning} />
                    <PlanBlock label="Afternoon" text={day.afternoon} />
                    <PlanBlock label="Evening" text={day.evening} />
                  </div>
                  <p className="mt-4 flex items-start gap-2 rounded-xl bg-aegean-50 p-3 text-xs leading-5 text-aegean-950/55"><CalendarDays size={15} className="mt-0.5 shrink-0 text-aegean-700" />{day.tip}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlannerSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="text-sm font-bold">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function PlanBlock({ label, text }: { label: string; text: string }) {
  return <div className="rounded-2xl bg-sand p-4"><p className="text-xs font-bold uppercase tracking-wider text-aegean-700">{label}</p><p className="mt-2 text-sm leading-6 text-aegean-950/60">{text}</p></div>;
}
