"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="grid min-h-[420px] place-items-center rounded-3xl bg-aegean-50 p-10 text-center">
        <div>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-aegean-700 text-2xl text-white">✓</span>
          <h2 className="mt-5 font-display text-2xl font-extrabold">Message received</h2>
          <p className="mt-2 text-aegean-950/55">We’ll get back to you within one island day.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-aegean-900/10 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-aegean-950">Name<input required className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" placeholder="Your name" /></label>
        <label className="text-sm font-bold text-aegean-950">Email<input required type="email" className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" placeholder="you@example.com" /></label>
      </div>
      <label className="mt-5 block text-sm font-bold text-aegean-950">I’m interested in
        <select className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none">
          <option>General question</option><option>Posting a listing</option><option>Business partnership</option><option>Advertising</option>
        </select>
      </label>
      <label className="mt-5 block text-sm font-bold text-aegean-950">Message<textarea required rows={5} className="mt-2 w-full resize-none rounded-xl border border-aegean-900/10 bg-sand px-4 py-3.5 font-normal outline-none focus:border-aegean-500" placeholder="Tell us how we can help..." /></label>
      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-aegean-700 px-6 py-4 font-bold text-white hover:bg-aegean-800"><Send size={18} /> Send message</button>
    </form>
  );
}
