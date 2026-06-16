"use client";

import { LockKeyhole, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    if (!response.ok) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-aegean-900/10 bg-white p-6 shadow-card sm:p-8">
      <span className="grid size-12 place-items-center rounded-2xl bg-aegean-50 text-aegean-700"><LockKeyhole size={22} /></span>
      <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">Admin login</h1>
      <p className="mt-2 text-sm leading-6 text-aegean-950/50">Only Santorini Live administrators can sign in.</p>
      <label className="mt-6 block text-sm font-bold">Email<input required type="email" name="email" autoComplete="username" className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" /></label>
      <label className="mt-5 block text-sm font-bold">Password<input required type="password" name="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" /></label>
      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-aegean-950 px-5 py-3.5 text-sm font-bold text-white disabled:opacity-50">{loading && <LoaderCircle size={17} className="animate-spin" />} Sign in</button>
      <div className="mt-5 rounded-xl bg-aegean-50 p-4 text-xs text-aegean-950/55">
        <p><strong>Email:</strong> admin@santorinilive.com</p>
        <p className="mt-1"><strong>Password:</strong> admin123</p>
      </div>
    </form>
  );
}
