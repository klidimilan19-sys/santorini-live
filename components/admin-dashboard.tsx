"use client";

import { Check, CreditCard, Edit3, Eye, EyeOff, FileText, Home, LoaderCircle, LogOut, Plus, Save, Star, Trash2, UserRound } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminContentItem, AdminContentType } from "@/lib/content-repository";
import type { SubmissionRequest } from "@/lib/request-repository";
import type { WorkerProfile } from "@/lib/worker-profile-repository";

type DashboardData = {
  requests: SubmissionRequest[];
  workerProfiles: WorkerProfile[];
  content: AdminContentItem[];
  contentTypes: AdminContentType[];
};

export function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData>({ requests: [], workerProfiles: [], content: [], contentTypes: [] });
  const [active, setActive] = useState<"Paid Requests" | "Worker Profiles" | AdminContentType>("Paid Requests");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState("");

  async function refresh() {
    const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    setData(await response.json());
    setLoading(false);
  }

  useEffect(() => { void refresh(); }, []);

  const filteredContent = useMemo(() => data.content.filter((item) => item.type === active), [active, data.content]);

  async function createItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (active === "Paid Requests") return;
    const form = new FormData(event.currentTarget);
    await fetch("/api/admin/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: active, title: form.get("title"), description: form.get("description") }),
    });
    event.currentTarget.reset();
    await refresh();
  }

  async function patchItem(id: string, patch: Partial<AdminContentItem>) {
    await fetch(`/api/admin/content/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    setEditingId("");
    await refresh();
  }

  async function deleteItem(id: string) {
    await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function setRequestStatus(id: string, status: SubmissionRequest["status"]) {
    await fetch(`/api/admin/requests/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await refresh();
  }

  async function setWorkerStatus(id: string, status: WorkerProfile["status"]) {
    await fetch(`/api/admin/workers/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await refresh();
  }

  async function deleteWorker(id: string) {
    await fetch(`/api/admin/workers/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const tabs: Array<"Paid Requests" | "Worker Profiles" | AdminContentType> = ["Paid Requests", "Worker Profiles", ...data.contentTypes];

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl bg-aegean-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-wider text-white/40">Admin session</p><h1 className="mt-1 font-display text-2xl font-extrabold">Santorini Live Dashboard</h1></div>
        <button onClick={logout} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 text-sm font-bold"><LogOut size={17} /> Log out</button>
      </div>

      <nav className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold ${active === tab ? "bg-aegean-700 text-white" : "bg-white text-aegean-950/55"}`}>{tab}</button>)}
      </nav>

      {loading ? <div className="grid min-h-64 place-items-center"><LoaderCircle className="animate-spin text-aegean-700" /></div> : active === "Paid Requests" ? (
        <div className="mt-5 grid gap-4">
          {data.requests.map((request) => (
            <article key={request.id} className="rounded-3xl border border-aegean-900/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{request.status}</span><h2 className="mt-3 font-display text-xl font-extrabold">{request.packageName}</h2><p className="mt-1 text-sm text-aegean-950/50">{request.category} · {request.village}</p></div>
                <div className="text-right"><p className="flex items-center gap-1 text-xs font-bold text-aegean-950/35"><CreditCard size={14} /> {request.paymentStatus}</p><p className="mt-1 font-display text-2xl font-extrabold">€{request.amount}</p></div>
              </div>
              <p className="mt-4 rounded-2xl bg-sand p-4 text-sm leading-6 text-aegean-950/60">{request.description}</p>
              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                <p className="flex items-center gap-2"><UserRound size={15} className="text-aegean-700" />{request.fullName}</p><p>{request.phone}</p><p>{request.email}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={() => setRequestStatus(request.id, "Published")} className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white"><Check size={16} /> Publish</button>
                <button onClick={() => setRequestStatus(request.id, "Rejected")} className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-700">Reject</button>
                <button onClick={() => setRequestStatus(request.id, "Paid / Pending Admin Review")} className="rounded-xl border border-aegean-900/10 px-4 py-2.5 text-sm font-bold">Return to review</button>
              </div>
            </article>
          ))}
        </div>
      ) : active === "Worker Profiles" ? (
        <div className="mt-5 grid gap-4">
          {data.workerProfiles.map((profile) => (
            <article key={profile.id} className="rounded-3xl border border-aegean-900/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    profile.status === "Published"
                      ? "bg-emerald-50 text-emerald-700"
                      : profile.status === "Rejected"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                  }`}>{profile.status}</span>
                  <h2 className="mt-3 font-display text-xl font-extrabold">{profile.fullName}</h2>
                  <p className="mt-1 text-sm font-bold text-aegean-700">{profile.desiredPosition}</p>
                </div>
                <div className="text-right text-sm text-aegean-950/50">
                  <p>{profile.currentVillage}</p>
                  <p className="mt-1">{profile.experienceYears} years · {profile.workType}</p>
                </div>
              </div>
              {profile.appliedJobTitle && <p className="mt-4 rounded-xl bg-aegean-50 p-3 text-sm font-bold text-aegean-700">Applied for: {profile.appliedJobTitle}</p>}
              <p className="mt-4 rounded-2xl bg-sand p-4 text-sm leading-6 text-aegean-950/60">{profile.about}</p>
              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <p>{profile.phone}</p><p>{profile.email}</p><p>Languages: {profile.languages.join(", ")}</p><p>Available: {profile.availableFrom}</p>
              </div>
              {profile.cvFileName && <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-aegean-700"><FileText size={16} />{profile.cvFileName} <span className="text-xs font-normal text-aegean-950/35">(mock file)</span></p>}
              <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <button onClick={() => setWorkerStatus(profile.id, "Published")} className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white"><Check size={16} /> Publish</button>
                <button onClick={() => setWorkerStatus(profile.id, "Rejected")} className="min-h-10 rounded-xl border border-red-200 px-4 text-sm font-bold text-red-700">Reject</button>
                <button onClick={() => setWorkerStatus(profile.id, "Pending Admin Review")} className="min-h-10 rounded-xl border border-aegean-900/10 px-4 text-sm font-bold">Review</button>
                <button onClick={() => deleteWorker(profile.id)} className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-bold text-red-700"><Trash2 size={15} /> Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <form onSubmit={createItem} className="h-fit rounded-3xl border border-aegean-900/10 bg-white p-5">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aegean-700"><Plus size={15} /> Create manually</p>
            <h2 className="mt-2 font-display text-xl font-extrabold">{active}</h2>
            <input required name="title" placeholder="Title" className="mt-4 w-full rounded-xl bg-sand px-4 py-3 text-sm outline-none" />
            <textarea required name="description" rows={5} placeholder="Description" className="mt-3 w-full resize-none rounded-xl bg-sand px-4 py-3 text-sm outline-none" />
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-aegean-950 px-4 py-3 text-sm font-bold text-white"><Plus size={16} /> Create draft</button>
          </form>
          <div className="space-y-4">
            {filteredContent.map((item) => (
              <ContentAdminCard key={item.id} item={item} editing={editingId === item.id} onEdit={() => setEditingId(item.id)} onSave={patchItem} onDelete={deleteItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentAdminCard({ item, editing, onEdit, onSave, onDelete }: { item: AdminContentItem; editing: boolean; onEdit: () => void; onSave: (id: string, patch: Partial<AdminContentItem>) => Promise<void>; onDelete: (id: string) => Promise<void> }) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  return (
    <article className="rounded-3xl border border-aegean-900/10 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.published ? "Published" : "Draft"}</span>
        {item.featured && <span className="rounded-full bg-aegean-50 px-3 py-1 text-xs font-bold text-aegean-700">Featured</span>}
        {item.homepageFeatured && <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-sunset">Homepage</span>}
      </div>
      {editing ? (
        <div className="mt-4"><input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-xl bg-sand px-4 py-3 font-bold outline-none" /><textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} className="mt-3 w-full resize-none rounded-xl bg-sand px-4 py-3 text-sm outline-none" /><button onClick={() => onSave(item.id, { title, description })} className="mt-3 flex items-center gap-2 rounded-xl bg-aegean-700 px-4 py-2.5 text-sm font-bold text-white"><Save size={16} /> Save changes</button></div>
      ) : (
        <><h3 className="mt-4 font-display text-xl font-extrabold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-aegean-950/55">{item.description}</p></>
      )}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <ActionButton icon={item.published ? EyeOff : Eye} label={item.published ? "Unpublish" : "Publish"} onClick={() => onSave(item.id, { published: !item.published })} />
        <ActionButton icon={Star} label={item.featured ? "Unfeature" : "Feature"} onClick={() => onSave(item.id, { featured: !item.featured })} />
        <ActionButton icon={Home} label={item.homepageFeatured ? "Remove home" : "Homepage"} onClick={() => onSave(item.id, { homepageFeatured: !item.homepageFeatured })} />
        <ActionButton icon={Edit3} label="Edit" onClick={onEdit} />
        <ActionButton icon={Trash2} label="Delete" onClick={() => onDelete(item.id)} danger />
      </div>
    </article>
  );
}

function ActionButton({ icon: Icon, label, onClick, danger = false }: { icon: typeof Star; label: string; onClick: () => void; danger?: boolean }) {
  return <button onClick={onClick} className={`flex min-h-10 items-center justify-center gap-1.5 rounded-xl border px-3 text-xs font-bold ${danger ? "border-red-200 text-red-700" : "border-aegean-900/10 text-aegean-950/65"}`}><Icon size={14} />{label}</button>;
}
