export const advertisingPackages = [
  { id: "basic-listing", name: "Basic Listing", price: 10, billing: "month", category: "Other", description: "Monthly business listing for hotels, restaurants, rentals, shops and local services." },
  { id: "featured-listing", name: "Featured Listing", price: 25, billing: "month", category: "Other", description: "Monthly featured placement with stronger visibility in relevant sections." },
  { id: "homepage-featured", name: "Homepage Featured", price: 50, billing: "month", category: "Other", description: "Monthly homepage feature for high-priority campaigns." },
  { id: "premium-banner", name: "Premium Banner", price: 75, billing: "month", category: "Other", description: "Monthly premium banner placement for maximum visibility." },
  { id: "job-basic", name: "Job Post", price: 5, billing: "one-time", category: "Job", description: "Employer job advertisement. Free for workers to browse and apply." },
  { id: "job-featured", name: "Featured Job Post", price: 10, billing: "one-time", category: "Job", description: "Employer job ad with priority placement. Workers still apply free." },
  { id: "job-section-featured", name: "Featured + Jobs Section", price: 15, billing: "one-time", category: "Job", description: "Employer vacancy promoted at the top of the jobs section." },
] as const;

export type AdvertisingPackageId = (typeof advertisingPackages)[number]["id"];

export function getAdvertisingPackage(id: string) {
  return advertisingPackages.find((item) => item.id === id);
}
