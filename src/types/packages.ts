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

export type Duration = "1-3 Days" | "4-6 Days" | "7-10 Days" | "10+ Days";

export type BestFor = "Family" | "Couples" | "Solo Travelers" | "Groups";

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


