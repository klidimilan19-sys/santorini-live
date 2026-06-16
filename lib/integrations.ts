/**
 * Integration boundaries for future providers. UI code should consume these
 * interfaces instead of importing Stripe, Maps, or weather SDKs directly.
 */
export interface PaymentProvider {
  createCheckoutSession(priceId: string): Promise<{ url: string }>;
}

export interface MapProvider {
  getPlaceCoordinates(placeId: string): Promise<{ lat: number; lng: number }>;
  getDirectionsUrl(placeId: string): Promise<string>;
}

export interface WeatherProvider {
  getForecast(location: string): Promise<{
    temperature: number;
    condition: string;
    windSpeed: number;
    uvIndex: number;
  }>;
}

export interface TransportStatusProvider {
  getFerryStatus(): Promise<{ status: string; detail?: string }>;
  getAirportStatus(): Promise<{ status: string; detail?: string }>;
  getCruiseArrivals(date: string): Promise<{ arrivals: number }>;
  getTrafficStatus(): Promise<{ status: string; detail: string }>;
}

export interface TourismDirectoryProvider {
  getRestaurants(village?: string): Promise<unknown[]>;
  getRentalBusinesses(category?: string): Promise<unknown[]>;
}

export interface PlacesRestaurantProvider {
  getRestaurant(placeId: string): Promise<{
    rating?: number;
    reviewCount?: number;
    reviews: Array<{ author: string; rating: number; text: string; publishedAt: string }>;
    lastUpdated: string;
  }>;
}

export interface NewsSummaryProvider {
  generateSummary(sourceText: string): Promise<string>;
}

export const integrationConfig = {
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  weatherApiKey: process.env.WEATHER_API_KEY,
  transportApiKey: process.env.TRANSPORT_STATUS_API_KEY,
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
};
