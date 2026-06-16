export const adminContentTypes = [
  "Jobs",
  "Marketplace",
  "Restaurants",
  "Rentals",
  "Events",
  "Live Updates",
  "Homepage Banners",
] as const;

export type AdminContentType = (typeof adminContentTypes)[number];

export type AdminContentItem = {
  id: string;
  type: AdminContentType;
  title: string;
  description: string;
  published: boolean;
  featured: boolean;
  homepageFeatured: boolean;
  createdAt: string;
  lastUpdated: string;
};

declare global {
  // eslint-disable-next-line no-var
  var santoriniContentStore: AdminContentItem[] | undefined;
}

const seed: AdminContentItem[] = [
  { id: "content-job-1", type: "Jobs", title: "Guest Experience Host", description: "Seasonal role in Oia.", published: true, featured: true, homepageFeatured: true, createdAt: "2026-06-15T08:00:00.000Z", lastUpdated: "2026-06-15T08:00:00.000Z" },
  { id: "content-market-1", type: "Marketplace", title: "Honda SH 150 scooter", description: "Good condition, available in Fira.", published: true, featured: true, homepageFeatured: true, createdAt: "2026-06-15T08:10:00.000Z", lastUpdated: "2026-06-15T08:10:00.000Z" },
  { id: "content-restaurant-1", type: "Restaurants", title: "Ammoudi Table", description: "Greek seafood in Oia.", published: true, featured: false, homepageFeatured: false, createdAt: "2026-06-15T08:20:00.000Z", lastUpdated: "2026-06-15T08:20:00.000Z" },
  { id: "content-rental-1", type: "Rentals", title: "Aegean Wheels", description: "Car rentals from Fira.", published: true, featured: false, homepageFeatured: false, createdAt: "2026-06-15T08:30:00.000Z", lastUpdated: "2026-06-15T08:30:00.000Z" },
  { id: "content-event-1", type: "Events", title: "Pyrgos sunset music night", description: "Mock event draft.", published: false, featured: false, homepageFeatured: false, createdAt: "2026-06-15T08:40:00.000Z", lastUpdated: "2026-06-15T08:40:00.000Z" },
  { id: "content-live-1", type: "Live Updates", title: "Ferries operating normally", description: "Athinios services are on schedule.", published: true, featured: false, homepageFeatured: false, createdAt: "2026-06-15T08:50:00.000Z", lastUpdated: "2026-06-15T08:50:00.000Z" },
  { id: "content-banner-1", type: "Homepage Banners", title: "Summer local business banner", description: "Mock homepage campaign.", published: false, featured: false, homepageFeatured: true, createdAt: "2026-06-15T09:00:00.000Z", lastUpdated: "2026-06-15T09:00:00.000Z" },
];

const store = globalThis.santoriniContentStore ?? seed.map((item) => ({ ...item }));
globalThis.santoriniContentStore = store;

export const contentRepository = {
  list() {
    return [...store].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  },
  create(input: Pick<AdminContentItem, "type" | "title" | "description">) {
    const now = new Date().toISOString();
    const item: AdminContentItem = {
      ...input,
      id: crypto.randomUUID(),
      published: false,
      featured: false,
      homepageFeatured: false,
      createdAt: now,
      lastUpdated: now,
    };
    store.unshift(item);
    return { ...item };
  },
  update(id: string, patch: Partial<Pick<AdminContentItem, "title" | "description" | "published" | "featured" | "homepageFeatured">>) {
    const item = store.find((entry) => entry.id === id);
    if (!item) return undefined;
    Object.assign(item, patch, { lastUpdated: new Date().toISOString() });
    return { ...item };
  },
  delete(id: string) {
    const index = store.findIndex((entry) => entry.id === id);
    if (index < 0) return false;
    store.splice(index, 1);
    return true;
  },
};
