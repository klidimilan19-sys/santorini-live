export type RequestCategory = "Job" | "Marketplace" | "Restaurant" | "Rental" | "Event" | "Other";
export type RequestStatus = "Payment Pending" | "Paid / Pending Admin Review" | "Published" | "Rejected";
export type PaymentStatus = "Unpaid" | "Paid" | "Refunded";

export type SubmissionRequest = {
  id: string;
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  category: RequestCategory;
  village: string;
  description: string;
  imageName?: string;
  packageId: string;
  packageName: string;
  amount: number;
  paymentStatus: PaymentStatus;
  status: RequestStatus;
  createdAt: string;
  lastUpdated: string;
};

declare global {
  // eslint-disable-next-line no-var
  var santoriniRequestStore: SubmissionRequest[] | undefined;
}

const seed: SubmissionRequest[] = [
  {
    id: "request-seed-job",
    fullName: "Maria K.",
    businessName: "Caldera View Hotel",
    phone: "+30 690 555 0101",
    email: "maria@example.com",
    category: "Job",
    village: "Imerovigli",
    description: "Seasonal front desk role with accommodation included.",
    packageId: "job-featured",
    packageName: "Featured job post",
    amount: 10,
    paymentStatus: "Paid",
    status: "Paid / Pending Admin Review",
    createdAt: "2026-06-15T09:00:00.000Z",
    lastUpdated: "2026-06-15T09:05:00.000Z",
  },
];

const store = globalThis.santoriniRequestStore ?? seed.map((item) => ({ ...item }));
globalThis.santoriniRequestStore = store;

export const requestRepository = {
  list() {
    return [...store].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  },
  get(id: string) {
    const item = store.find((request) => request.id === id);
    return item ? { ...item } : undefined;
  },
  create(input: Omit<SubmissionRequest, "id" | "paymentStatus" | "status" | "createdAt" | "lastUpdated">) {
    const now = new Date().toISOString();
    const request: SubmissionRequest = {
      ...input,
      id: crypto.randomUUID(),
      paymentStatus: "Unpaid",
      status: "Payment Pending",
      createdAt: now,
      lastUpdated: now,
    };
    store.unshift(request);
    return { ...request };
  },
  markPaid(id: string) {
    const request = store.find((item) => item.id === id);
    if (!request) return undefined;
    request.paymentStatus = "Paid";
    request.status = "Paid / Pending Admin Review";
    request.lastUpdated = new Date().toISOString();
    return { ...request };
  },
  updateStatus(id: string, status: RequestStatus) {
    const request = store.find((item) => item.id === id);
    if (!request) return undefined;
    request.status = status;
    request.lastUpdated = new Date().toISOString();
    return { ...request };
  },
};
