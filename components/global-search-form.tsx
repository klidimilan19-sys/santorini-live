import { MapPin, Search } from "lucide-react";

const villages = ["All Santorini", "Oia", "Fira", "Imerovigli", "Kamari", "Perissa", "Pyrgos", "Vlychada"];

export function GlobalSearchForm({
  defaultQuery = "",
  defaultVillage = "All Santorini",
  dark = false,
}: {
  defaultQuery?: string;
  defaultVillage?: string;
  dark?: boolean;
}) {
  return (
    <form action="/search" method="get" className={`flex w-full flex-col gap-3 rounded-2xl p-3 shadow-2xl sm:flex-row ${dark ? "bg-white text-aegean-950" : "border border-aegean-900/10 bg-white"}`}>
      <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-sand px-4">
        <Search size={19} className="text-aegean-600" />
        <input name="q" defaultValue={defaultQuery} required type="search" className="w-full bg-transparent text-sm outline-none placeholder:text-aegean-950/35" placeholder="Try dinner, waiter, scooter, room or ferry..." />
      </label>
      <label className="flex min-h-12 items-center gap-2 rounded-xl bg-sand px-4 sm:w-48">
        <MapPin size={18} className="text-aegean-600" />
        <select name="village" defaultValue={defaultVillage} className="w-full bg-transparent text-sm font-semibold outline-none">
          {villages.map((village) => <option key={village}>{village}</option>)}
        </select>
      </label>
      <button className="min-h-12 rounded-xl bg-sunset px-7 text-sm font-bold text-white hover:bg-orange-600">Search</button>
    </form>
  );
}
