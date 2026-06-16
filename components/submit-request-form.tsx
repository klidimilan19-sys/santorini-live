"use client";

import { CreditCard, ImagePlus, LoaderCircle, ShieldCheck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { advertisingPackages } from "@/data/advertising";

const categories = ["Job", "Marketplace", "Restaurant", "Rental", "Event", "Other"];
const villages = ["Fira", "Oia", "Imerovigli", "Kamari", "Perissa", "Pyrgos", "Vlychada", "Other"];

export function SubmitRequestForm() {
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package");
  const [packageId, setPackageId] = useState(
    advertisingPackages.some((item) => item.id === initialPackage) ? initialPackage! : advertisingPackages[0].id,
  );
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selectedPackage = useMemo(() => advertisingPackages.find((item) => item.id === packageId)!, [packageId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const requestResponse = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        businessName: form.get("businessName"),
        phone: form.get("phone"),
        email: form.get("email"),
        category: form.get("category"),
        village: form.get("village"),
        description: form.get("description"),
        packageId,
        imageName,
      }),
    });

    if (!requestResponse.ok) {
      setError("Please complete all required fields.");
      setLoading(false);
      return;
    }

    const created = await requestResponse.json() as { id: string };
    const checkoutResponse = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: created.id }),
    });
    const checkout = await checkoutResponse.json() as { url?: string };
    if (!checkout.url) {
      setError("Checkout could not be created.");
      setLoading(false);
      return;
    }
    window.location.assign(checkout.url);
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-aegean-900/10 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" placeholder="Your full name" />
        <Field label="Business name" name="businessName" placeholder="Optional for individuals" required={false} />
        <Field label="Phone" name="phone" type="tel" placeholder="+30 ..." />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" />
        <SelectField label="Category" name="category" options={categories} />
        <SelectField label="Village" name="village" options={villages} />
      </div>
      <label className="mt-5 block text-sm font-bold">Description<textarea required name="description" rows={6} className="mt-2 w-full resize-none rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" placeholder="Include all details the admin needs to prepare the listing..." /></label>

      <label className="mt-5 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-aegean-900/15 bg-aegean-50/50 text-center">
        <ImagePlus size={25} className="text-aegean-700" />
        <span className="mt-2 text-sm font-bold">{imageName || "Upload image placeholder"}</span>
        <span className="mt-1 text-xs text-aegean-950/40">File is not uploaded in mock mode</span>
        <input type="file" accept="image/*" className="hidden" onChange={(event) => setImageName(event.target.files?.[0]?.name ?? "")} />
      </label>

      <label className="mt-5 block text-sm font-bold">Package selection
        <select value={packageId} onChange={(event) => setPackageId(event.target.value)} className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none">
          {advertisingPackages.map((item) => <option key={item.id} value={item.id}>{item.name} · €{item.price}{item.billing === "month" ? "/month" : ""}</option>)}
        </select>
      </label>

      <div className="mt-6 rounded-2xl border border-aegean-900/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-wider text-aegean-950/35">Payment status</p><p className="mt-1 font-bold text-amber-700">Payment Pending</p></div>
          <p className="font-display text-3xl font-extrabold">€{selectedPackage.price}</p>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-aegean-50 p-3 text-xs leading-5 text-aegean-950/55"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-aegean-700" />Stripe Checkout is prepared with placeholder keys. This demo uses a mock success page and does not collect card details.</div>
      </div>
      <p className="mt-4 rounded-xl bg-orange-50 px-4 py-3 text-xs font-semibold leading-5 text-aegean-950/60">
        Job advertising prices apply only to employers posting vacancies. Workers looking for employment can browse jobs and submit CV profiles for free.
      </p>
      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sunset px-6 py-4 font-bold text-white disabled:opacity-50">{loading ? <LoaderCircle size={18} className="animate-spin" /> : <CreditCard size={18} />} Continue to card payment</button>
      <p className="mt-3 text-center text-xs text-aegean-950/40">No account required. Admin reviews all paid requests before publishing.</p>
    </form>
  );
}

function Field({ label, name, placeholder, type = "text", required = true }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return <label className="text-sm font-bold">{label}<input required={required} name={name} type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" /></label>;
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return <label className="text-sm font-bold">{label}<select name={name} className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
