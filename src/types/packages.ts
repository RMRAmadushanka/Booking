export type PackageType =
  | "Cultural Tours"
  | "Adventure Tours"
  | "Wildlife Tours"
  | "Beach Holidays"
  | "Honeymoon Packages"
  | "Luxury Tours";

export type Destination =
  | "Colombo"
  | "Kandy"
  | "Sigiriya"
  | "Ella"
  | "Nuwara Eliya"
  | "Yala"
  | "Galle"
  | "Bentota";

export type Duration =
  | "1-3 Days"
  | "4-6 Days"
  | "7-10 Days"
  | "10+ Days"
  | "1 Day"
  | "2 Days"
  | "3 Days"
  | "4 Days"
  | "5 Days"
  | "6 Days"
  | "7 Days"
  | "8 Days"
  | "9 Days"
  | "10 Days"
  | "11 Days"
  | "12 Days"
  | "13 Days"
  | "14 Days";

export type BestFor = "Family" | "Couples" | "Solo Travelers" | "Groups";

export interface DestinationDetail {
  name: string;
  description: string;
  imageUrl: string;
}

/** One location with its day number for the route (from DB destination_days or derived from order). */
export interface DestinationWithDay {
  name: string;
  day: number;
}

/** One day in the Locations & route section (from DB route_days). All fields from DB. */
export interface RouteDayFromDb {
  day: number;
  name: string;
  imageUrl: string;
  description: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  packageType: PackageType;
  destinations: Destination[];
  duration: Duration;
  price: number; // USD
  rating: number;
  bestFor: BestFor[];
  highlights: string[];
  /** Gallery images for the detail page. From DB gallery_urls. */
  galleryUrls?: string[];
  /** Per-stop details (image + description) for Locations & route accordion. From DB destination_details. */
  destinationDetails?: DestinationDetail[];
  /** When set (from DB destination_days), each location is shown for a specific day. When empty, derived from destinations order (Day 1, 2, ...). */
  destinationDays?: DestinationWithDay[];
  /** When set (from DB route_days), Locations & route uses only this: one entry per day with name, image, description. */
  routeDays?: RouteDayFromDb[];
}

export interface PackageFilters {
  searchQuery: string;
  packageTypes: PackageType[];
  destinations: Destination[];
  durations: Duration[];
  priceRange: [number, number];
  bestFor: BestFor[];
  minRating: number;
}


