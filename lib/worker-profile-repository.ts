export type WorkerProfileStatus = "Pending Admin Review" | "Published" | "Rejected";
export type WorkerWorkType = "Seasonal" | "Full-time" | "Part-time" | "Any";

export type WorkerProfile = {
  id: string;
  fullName: string;
  desiredPosition: string;
  experienceYears: number;
  currentVillage: string;
  availableFrom: string;
  workType: WorkerWorkType;
  languages: string[];
  accommodationNeeded: boolean;
  about: string;
  phone: string;
  email: string;
  whatsapp: string;
  cvFileName?: string;
  appliedJobId?: number;
  appliedJobTitle?: string;
  status: WorkerProfileStatus;
  createdAt: string;
  lastUpdated: string;
};

declare global {
  // eslint-disable-next-line no-var
  var santoriniWorkerProfileStore: WorkerProfile[] | undefined;
}

const seed: WorkerProfile[] = [
  {
    id: "worker-seed-1",
    fullName: "Elena M.",
    desiredPosition: "Waitress / Host",
    experienceYears: 3,
    currentVillage: "Perissa",
    availableFrom: "Available now",
    workType: "Seasonal",
    languages: ["English", "Greek", "Romanian"],
    accommodationNeeded: true,
    about: "Hospitality professional with restaurant and hotel experience, comfortable in busy guest-facing roles.",
    phone: "+30 690 400 1001",
    email: "elena.worker@example.com",
    whatsapp: "+306904001001",
    status: "Published",
    createdAt: "2026-06-14T10:00:00.000Z",
    lastUpdated: "2026-06-15T08:00:00.000Z",
  },
  {
    id: "worker-seed-2",
    fullName: "Nikos P.",
    desiredPosition: "Cook / Kitchen Assistant",
    experienceYears: 5,
    currentVillage: "Fira",
    availableFrom: "July 1, 2026",
    workType: "Full-time",
    languages: ["Greek", "English"],
    accommodationNeeded: false,
    about: "Experienced with Greek and Mediterranean kitchens, food preparation, stock control and service.",
    phone: "+30 690 400 1002",
    email: "nikos.worker@example.com",
    whatsapp: "+306904001002",
    status: "Published",
    createdAt: "2026-06-13T09:00:00.000Z",
    lastUpdated: "2026-06-15T08:10:00.000Z",
  },
  {
    id: "worker-seed-review",
    fullName: "Sofia D.",
    desiredPosition: "Front Desk Agent",
    experienceYears: 2,
    currentVillage: "Kamari",
    availableFrom: "Available now",
    workType: "Seasonal",
    languages: ["English", "Italian"],
    accommodationNeeded: true,
    about: "Customer-focused receptionist looking for a seasonal hotel opportunity.",
    phone: "+30 690 400 1003",
    email: "sofia.worker@example.com",
    whatsapp: "+306904001003",
    cvFileName: "sofia-cv.pdf",
    status: "Pending Admin Review",
    createdAt: "2026-06-15T09:30:00.000Z",
    lastUpdated: "2026-06-15T09:30:00.000Z",
  },
];

const store = globalThis.santoriniWorkerProfileStore ?? seed.map((item) => ({ ...item, languages: [...item.languages] }));
globalThis.santoriniWorkerProfileStore = store;

export const workerProfileRepository = {
  list() {
    return [...store].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  },
  listPublished() {
    return this.list().filter((profile) => profile.status === "Published");
  },
  create(input: Omit<WorkerProfile, "id" | "status" | "createdAt" | "lastUpdated">) {
    const now = new Date().toISOString();
    const profile: WorkerProfile = {
      ...input,
      id: crypto.randomUUID(),
      status: "Pending Admin Review",
      createdAt: now,
      lastUpdated: now,
    };
    store.unshift(profile);
    return { ...profile, languages: [...profile.languages] };
  },
  updateStatus(id: string, status: WorkerProfileStatus) {
    const profile = store.find((item) => item.id === id);
    if (!profile) return undefined;
    profile.status = status;
    profile.lastUpdated = new Date().toISOString();
    return { ...profile, languages: [...profile.languages] };
  },
  delete(id: string) {
    const index = store.findIndex((item) => item.id === id);
    if (index < 0) return false;
    store.splice(index, 1);
    return true;
  },
};
