export const advertisingPackages = [
  { id: "job-basic", name: "Job post", price: 5, billing: "one-time", category: "Job", description: "Employer job advertisement. Free for workers to browse and apply." },
  { id: "job-featured", name: "Featured job post", price: 10, billing: "one-time", category: "Job", description: "Employer job ad with priority placement. Workers still apply free." },
  { id: "job-homepage", name: "Featured + Homepage", price: 15, billing: "one-time", category: "Job", description: "Employer vacancy promoted with homepage visibility." },
  { id: "marketplace-basic", name: "Marketplace listing", price: 2, billing: "one-time", category: "Marketplace", description: "Standard local marketplace listing." },
  { id: "marketplace-featured", name: "Featured marketplace listing", price: 5, billing: "one-time", category: "Marketplace", description: "Highlighted marketplace listing." },
  { id: "business-monthly", name: "Business listing", price: 10, billing: "month", category: "Other", description: "Restaurant, rental or local business profile." },
  { id: "homepage-banner", name: "Homepage banner", price: 25, billing: "month", category: "Other", description: "Prominent promotional banner on the homepage." },
] as const;

export type AdvertisingPackageId = (typeof advertisingPackages)[number]["id"];

export function getAdvertisingPackage(id: string) {
  return advertisingPackages.find((item) => item.id === id);
}
