export type Job = {
  id: number;
  title: string;
  company: string;
  village: string;
  position: string;
  type: "Full-time" | "Part-time" | "Seasonal";
  salary: string;
  salaryMin: number;
  accommodationIncluded: boolean;
  foodIncluded: boolean;
  startDate: string;
  languages: string[];
  contact: string;
  posted: string;
  featured?: boolean;
  homepageFeatured?: boolean;
};

export type Restaurant = {
  id: number;
  name: string;
  village: "Oia" | "Fira" | "Imerovigli" | "Kamari" | "Perissa" | "Pyrgos";
  cuisine: string;
  priceRange: string;
  rating: string;
  phone: string;
  mapUrl: string;
  image: string;
  tags: string[];
  placeId?: string;
  reviewCount?: number;
  reviews: RestaurantReview[];
  lastUpdated: string;
};

export type RestaurantReview = {
  author: string;
  rating: number;
  text: string;
  publishedAt: string;
};

export type Rental = {
  id: number;
  businessName: string;
  category: "Cars" | "ATV" | "Scooters" | "Buggies" | "Boats";
  priceFrom: number;
  priceUnit: "day" | "hour";
  village: string;
  phone: string;
  contactUrl: string;
  image: string;
};

export type WeatherUpdate = {
  day: string;
  date: string;
  condition: "Sunny" | "Partly cloudy" | "Windy";
  high: number;
  low: number;
  wind: number;
  icon: "sun" | "cloud" | "wind";
};

export type IslandStatus = {
  temperature: number;
  condition: string;
  feelsLike: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  uvLevel: string;
  ferryStatus: "Operating normally" | "Minor delays" | "Disrupted";
  airportStatus: "On schedule" | "Minor delays" | "Disrupted";
  cruiseArrivals: number;
  trafficStatus: string;
  trafficDetail: string;
  lastUpdated: string;
};

export type EmergencyContact = {
  label: string;
  phone: string;
  detail: string;
};

export type LiveUpdate = {
  id: string;
  title: string;
  summary: string;
  category: "Weather" | "Transport" | "Traffic" | "Local news";
  severity: "info" | "notice" | "important";
  status: "published";
  lastUpdated: string;
};

export type NewsPost = {
  id: string;
  title: string;
  sourceText: string;
  summary: string;
  status: "draft" | "published";
  generatedByAi: boolean;
  createdAt: string;
  lastUpdated: string;
  publishedAt?: string;
};

export const marketplaceCategories = [
  "Vehicles",
  "Electronics",
  "Furniture",
  "Room Items",
  "Clothes",
  "Work Equipment",
  "Bikes",
  "Free Stuff",
  "Leaving Santorini Sale",
] as const;

export type MarketplaceCategory = (typeof marketplaceCategories)[number];
export type MarketplaceCondition = "New" | "Like new" | "Good" | "Used";

export type MarketplaceListing = {
  id: number;
  title: string;
  price: number;
  village: string;
  category: MarketplaceCategory;
  condition: MarketplaceCondition;
  sellerName: string;
  sellerContact: string;
  whatsappUrl: string;
  image?: string;
  featured?: boolean;
  urgent?: boolean;
  homepageSpot?: boolean;
  postedAt: string;
};

export type Accommodation = {
  id: number;
  name: string;
  village: string;
  category: "Hotel" | "Airbnb / Villa";
  description: string;
  priceFrom: number;
  priceUnit: "night";
  image?: string;
  rating: string;
  features: string[];
  contactUrl: string;
};

export type LocalRental = {
  id: number;
  title: string;
  village: string;
  monthlyPrice: number;
  propertyType: "Room" | "Studio" | "Apartment" | "Shared house";
  availableFrom: string;
  suitableForWorkers: boolean;
  contactPhone: string;
  whatsappUrl: string;
  image?: string;
};

export const jobs: Job[] = [
  { id: 1, title: "Guest Experience Host", company: "Aether Suites", village: "Oia", position: "Hospitality", type: "Seasonal", salary: "€1,400-€1,700", salaryMin: 1400, accommodationIncluded: true, foodIncluded: true, startDate: "July 1, 2026", languages: ["English", "Greek"], contact: "jobs@aethersuites.gr", posted: "2h ago", featured: true, homepageFeatured: true },
  { id: 2, title: "Sous Chef", company: "Selene", village: "Fira", position: "Kitchen", type: "Full-time", salary: "€1,800-€2,200", salaryMin: 1800, accommodationIncluded: false, foodIncluded: true, startDate: "Immediately", languages: ["English"], contact: "team@selene.gr", posted: "5h ago", featured: true, homepageFeatured: true },
  { id: 3, title: "Boat Tour Coordinator", company: "Blue Horizon", village: "Vlychada", position: "Tourism", type: "Seasonal", salary: "€1,500-€1,900", salaryMin: 1500, accommodationIncluded: true, foodIncluded: false, startDate: "June 25, 2026", languages: ["English", "Greek", "French"], contact: "+30 22860 00001", posted: "1d ago", featured: true },
  { id: 4, title: "Social Media Manager", company: "Caldera Collective", village: "Imerovigli", position: "Marketing", type: "Part-time", salary: "€900-€1,200", salaryMin: 900, accommodationIncluded: false, foodIncluded: false, startDate: "July 15, 2026", languages: ["English"], contact: "hello@calderacollective.gr", posted: "1d ago" },
  { id: 5, title: "Villa Housekeeper", company: "Nostos Villas", village: "Pyrgos", position: "Housekeeping", type: "Seasonal", salary: "€1,300-€1,500", salaryMin: 1300, accommodationIncluded: true, foodIncluded: true, startDate: "Immediately", languages: ["English", "Greek"], contact: "+30 22860 00002", posted: "2d ago" },
  { id: 6, title: "Front Desk Agent", company: "Santo Hotel Group", village: "Kamari", position: "Hospitality", type: "Full-time", salary: "€1,350-€1,600", salaryMin: 1350, accommodationIncluded: false, foodIncluded: true, startDate: "July 1, 2026", languages: ["English", "German"], contact: "careers@santohotels.gr", posted: "3d ago" },
];

export const featuredFirstJobs = [...jobs].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
);

export const homepageJobs = [...jobs].sort(
  (a, b) =>
    Number(Boolean(b.homepageFeatured)) - Number(Boolean(a.homepageFeatured)) ||
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
);

export const restaurants: Restaurant[] = [
  { id: 1, name: "Ammoudi Table", village: "Oia", cuisine: "Greek seafood", priceRange: "€€€", rating: "4.9", phone: "+30 22860 71000", mapUrl: "https://maps.google.com/?q=Oia+Santorini", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80", tags: ["Sea view", "Local catch"], placeId: "mock-place-oia-1", reviewCount: 428, reviews: [], lastUpdated: "2026-06-15T11:30:00.000Z" },
  { id: 2, name: "Fira Garden", village: "Fira", cuisine: "Modern Greek", priceRange: "€€", rating: "4.8", phone: "+30 22860 22001", mapUrl: "https://maps.google.com/?q=Fira+Santorini", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80", tags: ["Courtyard", "Local favorite"], placeId: "mock-place-fira-2", reviewCount: 315, reviews: [], lastUpdated: "2026-06-15T11:30:00.000Z" },
  { id: 3, name: "Caldera Kitchen", village: "Imerovigli", cuisine: "Mediterranean", priceRange: "€€€", rating: "4.7", phone: "+30 22860 23002", mapUrl: "https://maps.google.com/?q=Imerovigli+Santorini", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80", tags: ["Caldera view", "Reservations"], placeId: "mock-place-imerovigli-3", reviewCount: 267, reviews: [], lastUpdated: "2026-06-15T11:30:00.000Z" },
  { id: 4, name: "Black Sand Taverna", village: "Kamari", cuisine: "Santorinian", priceRange: "€€", rating: "4.6", phone: "+30 22860 33003", mapUrl: "https://maps.google.com/?q=Kamari+Santorini", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80", tags: ["Beachfront", "Family friendly"], placeId: "mock-place-kamari-4", reviewCount: 194, reviews: [], lastUpdated: "2026-06-15T11:30:00.000Z" },
  { id: 5, name: "Perissa Catch", village: "Perissa", cuisine: "Seafood", priceRange: "€€", rating: "4.8", phone: "+30 22860 81004", mapUrl: "https://maps.google.com/?q=Perissa+Santorini", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=900&q=80", tags: ["Fresh fish", "Beach view"], placeId: "mock-place-perissa-5", reviewCount: 221, reviews: [], lastUpdated: "2026-06-15T11:30:00.000Z" },
  { id: 6, name: "Pyrgos Terrace", village: "Pyrgos", cuisine: "Greek fusion", priceRange: "€€", rating: "4.7", phone: "+30 22860 31005", mapUrl: "https://maps.google.com/?q=Pyrgos+Santorini", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80", tags: ["Sunset", "Village view"], placeId: "mock-place-pyrgos-6", reviewCount: 182, reviews: [], lastUpdated: "2026-06-15T11:30:00.000Z" },
];

export const rentals: Rental[] = [
  { id: 1, businessName: "Aegean Wheels", category: "Cars", priceFrom: 38, priceUnit: "day", village: "Fira", phone: "+30 22860 41001", contactUrl: "tel:+302286041001", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80" },
  { id: 2, businessName: "Caldera Ride", category: "ATV", priceFrom: 45, priceUnit: "day", village: "Perissa", phone: "+30 22860 41002", contactUrl: "tel:+302286041002", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80" },
  { id: 3, businessName: "Blue Lane Moto", category: "Scooters", priceFrom: 24, priceUnit: "day", village: "Kamari", phone: "+30 22860 41003", contactUrl: "tel:+302286041003", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80" },
  { id: 4, businessName: "Volcano Buggy Co.", category: "Buggies", priceFrom: 70, priceUnit: "day", village: "Fira", phone: "+30 22860 41004", contactUrl: "tel:+302286041004", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80" },
  { id: 5, businessName: "Santorini Sea Club", category: "Boats", priceFrom: 120, priceUnit: "hour", village: "Vlychada", phone: "+30 22860 41005", contactUrl: "tel:+302286041005", image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=900&q=80" },
  { id: 6, businessName: "Island Keys Rentals", category: "Cars", priceFrom: 42, priceUnit: "day", village: "Oia", phone: "+30 22860 41006", contactUrl: "tel:+302286041006", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80" },
];

export const islandStatus: IslandStatus = {
  temperature: 27,
  condition: "Clear skies",
  feelsLike: 28,
  windSpeed: 18,
  windDirection: "NW",
  uvIndex: 8,
  uvLevel: "Very high",
  ferryStatus: "Operating normally",
  airportStatus: "On schedule",
  cruiseArrivals: 4,
  trafficStatus: "Moderate",
  trafficDetail: "Slow traffic around Fira from 18:00-20:30.",
  lastUpdated: "2026-06-15T11:50:00.000Z",
};

export const liveUpdates: LiveUpdate[] = [
  { id: "weather-1", title: "Strong afternoon sun", summary: "UV levels are very high between 12:00 and 16:00. Use SPF 30+ and carry water.", category: "Weather", severity: "important", status: "published", lastUpdated: "2026-06-15T11:50:00.000Z" },
  { id: "ferry-1", title: "Ferries operating normally", summary: "Scheduled services from Athinios are currently running without significant disruption.", category: "Transport", severity: "info", status: "published", lastUpdated: "2026-06-15T11:45:00.000Z" },
  { id: "traffic-1", title: "Evening traffic around Fira", summary: "Expect slower traffic through central Fira between 18:00 and 20:30.", category: "Traffic", severity: "notice", status: "published", lastUpdated: "2026-06-15T11:40:00.000Z" },
];

export const emergencyContacts: EmergencyContact[] = [
  { label: "European emergency", phone: "112", detail: "Police, fire and ambulance" },
  { label: "Santorini Hospital", phone: "+30 22860 35300", detail: "Fira emergency department" },
  { label: "Tourist Police", phone: "+30 22860 22649", detail: "Visitor assistance" },
  { label: "Port Authority", phone: "+30 22860 22239", detail: "Ferry and maritime emergencies" },
];

export const weatherUpdates: WeatherUpdate[] = [
  { day: "Today", date: "Jun 15", condition: "Sunny", high: 27, low: 21, wind: 18, icon: "sun" },
  { day: "Tuesday", date: "Jun 16", condition: "Sunny", high: 28, low: 22, wind: 16, icon: "sun" },
  { day: "Wednesday", date: "Jun 17", condition: "Partly cloudy", high: 27, low: 21, wind: 22, icon: "cloud" },
  { day: "Thursday", date: "Jun 18", condition: "Windy", high: 25, low: 20, wind: 32, icon: "wind" },
  { day: "Friday", date: "Jun 19", condition: "Sunny", high: 26, low: 20, wind: 20, icon: "sun" },
];

export const marketplaceListings: MarketplaceListing[] = [
  { id: 1, title: "Honda SH 150 scooter", price: 1850, village: "Fira", category: "Vehicles", condition: "Good", sellerName: "Nikos", sellerContact: "+30 690 100 2001", whatsappUrl: "https://wa.me/306901002001", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80", featured: true, urgent: true, homepageSpot: true, postedAt: "2026-06-15T10:20:00.000Z" },
  { id: 2, title: "MacBook Air M2", price: 720, village: "Oia", category: "Electronics", condition: "Like new", sellerName: "Elena", sellerContact: "+30 690 100 2002", whatsappUrl: "https://wa.me/306901002002", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80", featured: true, homepageSpot: true, postedAt: "2026-06-15T09:10:00.000Z" },
  { id: 3, title: "Solid wood dining table", price: 180, village: "Pyrgos", category: "Furniture", condition: "Good", sellerName: "Maria", sellerContact: "+30 690 100 2003", whatsappUrl: "https://wa.me/306901002003", image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=900&q=80", postedAt: "2026-06-14T18:40:00.000Z" },
  { id: 4, title: "Room essentials bundle", price: 65, village: "Perissa", category: "Room Items", condition: "Good", sellerName: "Alex", sellerContact: "+30 690 100 2004", whatsappUrl: "https://wa.me/306901002004", postedAt: "2026-06-14T14:15:00.000Z" },
  { id: 5, title: "Restaurant uniform set", price: 30, village: "Kamari", category: "Clothes", condition: "Like new", sellerName: "Sofia", sellerContact: "+30 690 100 2005", whatsappUrl: "https://wa.me/306901002005", postedAt: "2026-06-14T12:00:00.000Z" },
  { id: 6, title: "Professional tool kit", price: 240, village: "Fira", category: "Work Equipment", condition: "Used", sellerName: "Giorgos", sellerContact: "+30 690 100 2006", whatsappUrl: "https://wa.me/306901002006", image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=900&q=80", featured: true, postedAt: "2026-06-13T16:30:00.000Z" },
  { id: 7, title: "City bicycle with basket", price: 95, village: "Imerovigli", category: "Bikes", condition: "Good", sellerName: "Clara", sellerContact: "+30 690 100 2007", whatsappUrl: "https://wa.me/306901002007", image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=900&q=80", postedAt: "2026-06-13T11:45:00.000Z" },
  { id: 8, title: "Free kitchenware box", price: 0, village: "Perissa", category: "Free Stuff", condition: "Used", sellerName: "Ben", sellerContact: "+30 690 100 2008", whatsappUrl: "https://wa.me/306901002008", urgent: true, postedAt: "2026-06-12T19:20:00.000Z" },
  { id: 9, title: "Leaving island household bundle", price: 350, village: "Kamari", category: "Leaving Santorini Sale", condition: "Good", sellerName: "Amelia", sellerContact: "+30 690 100 2009", whatsappUrl: "https://wa.me/306901002009", urgent: true, homepageSpot: true, postedAt: "2026-06-12T09:05:00.000Z" },
];

export const marketplaceFeaturedFirst = [...marketplaceListings].sort(
  (a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    Number(Boolean(b.urgent)) - Number(Boolean(a.urgent)) ||
    b.postedAt.localeCompare(a.postedAt),
);

export const homepageMarketplaceListings = [...marketplaceListings].sort(
  (a, b) =>
    Number(Boolean(b.homepageSpot)) - Number(Boolean(a.homepageSpot)) ||
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    b.postedAt.localeCompare(a.postedAt),
);

export const hotels: Accommodation[] = [
  { id: 1, name: "Aegean Horizon Hotel", village: "Oia", category: "Hotel", description: "Cliffside rooms with caldera views and breakfast terrace.", priceFrom: 210, priceUnit: "night", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80", rating: "4.8", features: ["Caldera view", "Breakfast", "Pool"], contactUrl: "/submit-request?package=basic-listing" },
  { id: 2, name: "Fira Central Suites", village: "Fira", category: "Hotel", description: "Walkable central stay close to buses, shops and nightlife.", priceFrom: 135, priceUnit: "night", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80", rating: "4.6", features: ["Central", "Airport transfer", "Wi-Fi"], contactUrl: "/submit-request?package=basic-listing" },
  { id: 3, name: "Kamari Blue Hotel", village: "Kamari", category: "Hotel", description: "Relaxed beach hotel steps from the black-sand shoreline.", priceFrom: 105, priceUnit: "night", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80", rating: "4.5", features: ["Beach access", "Pool", "Family rooms"], contactUrl: "/submit-request?package=basic-listing" },
  { id: 4, name: "Pyrgos Village Inn", village: "Pyrgos", category: "Hotel", description: "Quiet traditional stay in the island's historic hilltop village.", priceFrom: 120, priceUnit: "night", rating: "4.7", features: ["Village setting", "Terrace", "Parking"], contactUrl: "/submit-request?package=basic-listing" },
];

export const villas: Accommodation[] = [
  { id: 1, name: "White Arch Caldera Villa", village: "Imerovigli", category: "Airbnb / Villa", description: "Private cave-style villa with plunge pool and sunset terrace.", priceFrom: 320, priceUnit: "night", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80", rating: "4.9", features: ["Private pool", "Sunset view", "2 guests"], contactUrl: "/submit-request?package=basic-listing" },
  { id: 2, name: "Oia Blue Door House", village: "Oia", category: "Airbnb / Villa", description: "Restored Cycladic home tucked into a quiet pedestrian lane.", priceFrom: 260, priceUnit: "night", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80", rating: "4.8", features: ["Entire home", "Kitchen", "4 guests"], contactUrl: "/submit-request?package=basic-listing" },
  { id: 3, name: "Perissa Garden Villa", village: "Perissa", category: "Airbnb / Villa", description: "Spacious villa for groups with garden and easy beach access.", priceFrom: 180, priceUnit: "night", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80", rating: "4.7", features: ["Garden", "Beach nearby", "6 guests"], contactUrl: "/submit-request?package=basic-listing" },
  { id: 4, name: "Pyrgos Sunset Residence", village: "Pyrgos", category: "Airbnb / Villa", description: "Minimal island residence with panoramic rooftop dining.", priceFrom: 225, priceUnit: "night", rating: "4.8", features: ["Rooftop", "Kitchen", "4 guests"], contactUrl: "/submit-request?package=basic-listing" },
];

export const localRentals: LocalRental[] = [
  { id: 1, title: "Furnished studio near central Fira", village: "Fira", monthlyPrice: 720, propertyType: "Studio", availableFrom: "July 1, 2026", suitableForWorkers: true, contactPhone: "+30 690 220 1001", whatsappUrl: "https://wa.me/306902201001", image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80" },
  { id: 2, title: "Private room in shared worker house", village: "Perissa", monthlyPrice: 480, propertyType: "Room", availableFrom: "Available now", suitableForWorkers: true, contactPhone: "+30 690 220 1002", whatsappUrl: "https://wa.me/306902201002" },
  { id: 3, title: "One-bedroom apartment with balcony", village: "Kamari", monthlyPrice: 850, propertyType: "Apartment", availableFrom: "August 1, 2026", suitableForWorkers: false, contactPhone: "+30 690 220 1003", whatsappUrl: "https://wa.me/306902201003", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80" },
  { id: 4, title: "Shared house close to bus route", village: "Pyrgos", monthlyPrice: 550, propertyType: "Shared house", availableFrom: "June 25, 2026", suitableForWorkers: true, contactPhone: "+30 690 220 1004", whatsappUrl: "https://wa.me/306902201004" },
  { id: 5, title: "Compact year-round studio", village: "Imerovigli", monthlyPrice: 780, propertyType: "Studio", availableFrom: "September 1, 2026", suitableForWorkers: true, contactPhone: "+30 690 220 1005", whatsappUrl: "https://wa.me/306902201005", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80" },
  { id: 6, title: "Quiet room in local family home", village: "Oia", monthlyPrice: 620, propertyType: "Room", availableFrom: "October 1, 2026", suitableForWorkers: false, contactPhone: "+30 690 220 1006", whatsappUrl: "https://wa.me/306902201006" },
];
