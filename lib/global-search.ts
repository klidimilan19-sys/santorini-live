import {
  hotels,
  jobs,
  liveUpdates,
  localRentals,
  marketplaceListings,
  rentals,
  restaurants,
  type Accommodation,
  type Job,
  type LiveUpdate,
  type LocalRental,
  type MarketplaceListing,
  type Rental,
  type Restaurant,
} from "@/data/mock-data";
import { guideTopics, villageGuides, type GuideTopic, type VillageGuide } from "@/data/guide-data";

export type AccommodationSearchResult =
  | { kind: "hotel"; item: Accommodation }
  | { kind: "local-rental"; item: LocalRental };

export type GlobalSearchResults = {
  guide: Array<
    | { kind: "topic"; item: GuideTopic }
    | { kind: "village"; item: VillageGuide }
  >;
  restaurants: Restaurant[];
  jobs: Job[];
  rentals: Rental[];
  accommodation: AccommodationSearchResult[];
  marketplace: MarketplaceListing[];
  liveUpdates: LiveUpdate[];
};

type SearchGroup = keyof GlobalSearchResults;

const synonyms: Record<SearchGroup, string[]> = {
  guide: ["guide", "visit", "things", "activity", "activities", "beach", "beaches", "sunset", "experience", "experiences", "village", "villages", "itinerary", "trip", "honeymoon", "family", "budget", "luxury"],
  restaurants: ["dinner", "food", "restaurant", "restaurants", "eat", "lunch", "breakfast"],
  jobs: ["job", "jobs", "work", "waiter", "bartender", "cook", "salary", "staff"],
  rentals: ["car", "cars", "bike", "bikes", "scooter", "scooters", "atv", "buggy", "buggies", "rent", "rental", "rentals"],
  accommodation: ["room", "rooms", "house", "houses", "apartment", "apartments", "studio", "accommodation", "hotel", "hotels"],
  marketplace: ["marketplace", "sale", "buy", "sell", "furniture", "electronics", "clothes", "equipment", "free"],
  liveUpdates: ["weather", "wind", "ferry", "ferries", "airport", "traffic", "live", "update", "updates"],
};

export function searchSantorini(query: string, village?: string): GlobalSearchResults {
  const normalizedQuery = normalize(query);
  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const selectedVillage = normalize(village ?? "");

  if (!tokens.length) return emptyResults();

  return {
    guide: rankGuide(tokens, selectedVillage),
    restaurants: rank(
      restaurants,
      "restaurants",
      tokens,
      (item) => [item.name, item.village, item.cuisine, item.priceRange, ...item.tags],
      selectedVillage,
      (item) => item.village,
    ),
    jobs: rank(
      jobs,
      "jobs",
      tokens,
      (item) => [item.title, item.company, item.village, item.position, item.type, item.salary, ...item.languages],
      selectedVillage,
      (item) => item.village,
    ),
    rentals: rank(
      rentals,
      "rentals",
      tokens,
      (item) => [item.businessName, item.category, item.village, String(item.priceFrom)],
      selectedVillage,
      (item) => item.village,
    ),
    accommodation: rankAccommodation(tokens, selectedVillage),
    marketplace: rank(
      marketplaceListings,
      "marketplace",
      tokens,
      (item) => [item.title, item.category, item.village, item.condition, item.sellerName, String(item.price)],
      selectedVillage,
      (item) => item.village,
    ),
    liveUpdates: rank(
      liveUpdates,
      "liveUpdates",
      tokens,
      (item) => [item.title, item.summary, item.category, item.severity],
      selectedVillage,
    ),
  };
}

function rankGuide(tokens: string[], selectedVillage: string): GlobalSearchResults["guide"] {
  const topics = rank(
    guideTopics,
    "guide",
    tokens,
    (item) => [item.title, item.eyebrow, item.description, item.intro, ...item.tips],
    selectedVillage,
  ).map((item) => ({ kind: "topic" as const, item }));
  const villages = rank(
    villageGuides,
    "guide",
    tokens,
    (item) => [item.name, item.tagline, item.overview, ...item.thingsToDo, ...item.nearbyAttractions],
    selectedVillage,
    (item) => item.name,
  ).map((item) => ({ kind: "village" as const, item }));
  return [...villages, ...topics];
}

export function countSearchResults(results: GlobalSearchResults) {
  return Object.values(results).reduce((total, items) => total + items.length, 0);
}

function rank<T>(
  items: T[],
  group: SearchGroup,
  tokens: string[],
  fields: (item: T) => Array<string | number | boolean>,
  selectedVillage: string,
  village?: (item: T) => string,
) {
  const intentMatch = tokens.some((token) => synonyms[group].includes(token));

  return items
    .filter((item) => !selectedVillage || selectedVillage === "all santorini" || normalize(village?.(item) ?? "") === selectedVillage)
    .map((item) => {
      const haystack = normalize(fields(item).join(" "));
      const directMatches = tokens.filter((token) => haystack.includes(token)).length;
      return { item, score: (intentMatch ? 10 : 0) + directMatches * 3 };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

function rankAccommodation(tokens: string[], selectedVillage: string): AccommodationSearchResult[] {
  const hotelResults = rank(
    hotels,
    "accommodation",
    tokens,
    (item) => [item.name, item.village, item.category, item.description, ...item.features],
    selectedVillage,
    (item) => item.village,
  ).map((item) => ({ kind: "hotel" as const, item }));

  const localRentalResults = rank(
    localRentals,
    "accommodation",
    tokens,
    (item) => [item.title, item.village, item.propertyType, item.availableFrom, item.monthlyPrice],
    selectedVillage,
    (item) => item.village,
  ).map((item) => ({ kind: "local-rental" as const, item }));

  return [...localRentalResults, ...hotelResults];
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function emptyResults(): GlobalSearchResults {
  return {
    guide: [],
    restaurants: [],
    jobs: [],
    rentals: [],
    accommodation: [],
    marketplace: [],
    liveUpdates: [],
  };
}
