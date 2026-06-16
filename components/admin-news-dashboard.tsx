"use client";

import { Check, FileText, LoaderCircle, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { NewsPost } from "@/data/mock-data";

export function AdminNewsDashboard() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function refresh() {
    const response = await fetch("/api/admin/news", { cache: "no-store" });
    setPosts(await response.json());
    setLoading(false);
  }

  useEffect(() => { void refresh(); }, []);

  async function createDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    await fetch("/api/admin/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.get("title"), sourceText: form.get("sourceText") }),
    });
    event.currentTarget.reset();
    await refresh();
    setSaving(false);
  }

  async function approve(id: string) {
    await fetch(`/api/admin/news/${id}/approve`, { method: "PATCH" });
    await refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={createDraft} className="h-fit rounded-3xl border border-aegean-900/10 bg-white p-6 shadow-card">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aegean-700"><Sparkles size={16} /> AI summary draft</span>
        <h2 className="mt-3 font-display text-2xl font-extrabold">Create review draft</h2>
        <p className="mt-2 text-sm leading-6 text-aegean-950/50">Generated summaries are always saved as drafts. An admin must approve them separately.</p>
        <label className="mt-5 block text-sm font-bold">Headline<input required name="title" className="mt-2 w-full rounded-xl border border-aegean-900/10 bg-sand px-4 py-3 outline-none" placeholder="Update headline" /></label>
        <label className="mt-5 block text-sm font-bold">Source text<textarea required name="sourceText" rows={7} className="mt-2 w-full resize-none rounded-xl border border-aegean-900/10 bg-sand px-4 py-3 font-normal outline-none" placeholder="Paste verified source notes here..." /></label>
        <button disabled={saving} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-aegean-950 px-5 py-3.5 text-sm font-bold text-white disabled:opacity-50">{saving ? <LoaderCircle size={17} className="animate-spin" /> : <Sparkles size={17} />} Generate draft</button>
      </form>

      <div>
        <div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-bold text-aegean-700">Editorial queue</p><h2 className="font-display text-2xl font-extrabold">News posts</h2></div>{loading && <LoaderCircle className="animate-spin text-aegean-700" />}</div>
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="rounded-3xl border border-aegean-900/10 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${post.status === "draft" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{post.status === "draft" ? "Draft · approval required" : "Published"}</span>
                <span className="text-xs text-aegean-950/35">Updated {formatDate(post.lastUpdated)}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-extrabold">{post.title}</h3>
              <div className="mt-3 rounded-2xl bg-aegean-50 p-4"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aegean-700"><FileText size={14} /> Generated summary</p><p className="mt-2 text-sm leading-6 text-aegean-950/60">{post.summary}</p></div>
              {post.status === "draft" && <button onClick={() => approve(post.id)} className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white"><Check size={16} /> Approve and publish</button>}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Athens" }).format(new Date(value));
}
