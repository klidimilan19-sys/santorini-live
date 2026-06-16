import type { RestaurantReview } from "@/data/mock-data";

export type GooglePlaceRestaurantData = {
  placeId: string;
  rating?: number;
  reviewCount?: number;
  reviews: RestaurantReview[];
  lastUpdated: string;
};

export interface GooglePlacesProvider {
  getRestaurant(placeId: string): Promise<GooglePlaceRestaurantData>;
}

export class GooglePlacesAdapter implements GooglePlacesProvider {
  constructor(private readonly apiKey: string) {}

  async getRestaurant(_placeId: string): Promise<GooglePlaceRestaurantData> {
    if (!this.apiKey) throw new Error("Google Places API key is not configured.");
    throw new Error("Google Places adapter is prepared but not connected.");
  }
}
