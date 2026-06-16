"use client";

import { CheckCircle2, FileText, LoaderCircle, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jobs } from "@/data/mock-data";

const villages = ["Fira", "Oia", "Imerovigli", "Kamari", "Perissa", "Pyrgos", "Vlychada", "Other"];

export function WorkerProfileForm() {
  const searchParams = useSearchParams();
  const requestedJobId = Number(searchParams.get("job"));
  const requestedJob = jobs.find((job) => job.id === requestedJobId);
  const [cvFileName, setCvFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/worker-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        desiredPosition: form.get("desiredPosition"),
        experienceYears: Number(form.get("experienceYears")),
        currentVillage: form.get("currentVillage"),
        availableFrom: form.get("availableFrom"),
        workType: form.get("workType"),
        languages: form.get("languages"),
        accommodationNeeded: form.get("accommodationNeeded") === "on",
        about: form.get("about"),
        phone: form.get("phone"),
        email: form.get("email"),
        whatsapp: form.get("whatsapp"),
        cvFileName,
        appliedJobId: requestedJob?.id,
        consent: form.get("consent") === "on",
      }),
    });

    setLoading(false);
    if (!response.ok) {
      setError("Please complete all required fields and accept the publishing consent.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-emerald-200 bg-white p-7 text-center shadow-card sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 size={28} /></span>
        <h2 className="mt-5 font-display text-2xl font-extrabold">Profile sent for review</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-aegean-950/55">
          Your CV profile is pending admin approval. It will not appear publicly until Santorini Live reviews and publishes it.
        </p>
        {requestedJob && <p className="mt-4 rounded-xl bg-aegean-50 p-3 text-sm font-bold text-aegean-700">Application: {requestedJob.title} at {requestedJob.company}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-aegean-900/10 bg-white p-6 shadow-card sm:p-8">
      {requestedJob && (
        <div className="mb-6 rounded-2xl bg-aegean-950 p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-white/45">Applying for</p>
          <p className="mt-1 font-display text-xl font-extrabold">{requestedJob.title}</p>
          <p className="mt-1 text-sm text-white/60">{requestedJob.company} · {requestedJob.village}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" placeholder="Your full name" />
        <Field label="Position wanted" name="desiredPosition" placeholder="Waiter, cook, receptionist..." defaultValue={requestedJob?.title} />
        <Field label="Years of experience" name="experienceYears" type="number" placeholder="0" min="0" />
        <SelectField label="Current village" name="currentVillage" options={villages} />
        <Field label="Available from" name="availableFrom" placeholder="Available now or a date" />
        <SelectField label="Work type" name="workType" options={["Seasonal", "Full-time", "Part-time", "Any"]} />
        <Field label="Phone" name="phone" type="tel" placeholder="+30 ..." />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" />
        <Field label="WhatsApp" name="whatsapp" type="tel" placeholder="+30 ... (optional)" required={false} />
        <Field label="Languages" name="languages" placeholder="English, Greek, Italian" />
      </div>

      <label className="mt-5 block text-sm font-bold">
        Work experience and skills
        <textarea required name="about" rows={6} className="mt-2 w-full resize-none rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" placeholder="Describe your previous roles, skills, certificates and the work you are looking for..." />
      </label>

      <label className="mt-5 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-aegean-900/15 bg-aegean-50/50 text-center">
        <FileText size={25} className="text-aegean-700" />
        <span className="mt-2 text-sm font-bold">{cvFileName || "Attach CV placeholder"}</span>
        <span className="mt-1 text-xs text-aegean-950/40">PDF or document · mock mode does not upload the file</span>
        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(event) => setCvFileName(event.target.files?.[0]?.name ?? "")} />
      </label>

      <label className="mt-5 flex items-start gap-3 rounded-xl bg-sand p-4 text-sm font-semibold">
        <input name="accommodationNeeded" type="checkbox" className="mt-0.5 size-4 accent-aegean-700" />
        I need staff accommodation
      </label>
      <label className="mt-3 flex items-start gap-3 rounded-xl bg-aegean-50 p-4 text-sm leading-6 text-aegean-950/65">
        <input required name="consent" type="checkbox" className="mt-1 size-4 shrink-0 accent-aegean-700" />
        I agree that an admin may review this information and publish my approved work profile. Contact details may be visible to employers.
      </label>

      <div className="mt-5 flex items-start gap-2 rounded-xl border border-aegean-200 p-4 text-xs leading-5 text-aegean-950/55">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-aegean-700" />
        No account or payment is required for workers. Profiles are never published automatically.
      </div>
      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sunset px-6 py-4 font-bold text-white disabled:opacity-50">
        {loading ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
        {requestedJob ? "Send application" : "Submit CV profile"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
  defaultValue,
  min,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  min?: string;
}) {
  return (
    <label className="text-sm font-bold">
      {label}
      <input required={required} name={name} type={type} min={min} defaultValue={defaultValue} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="text-sm font-bold">
      {label}
      <select name={name} className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
