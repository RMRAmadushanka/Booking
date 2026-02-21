export type VehicleType =
  | "SUV"
  | "Sedan"
  | "Sports"
  | "Compact"
  | "Luxury"
  | "Van"
  | "Convertible";

export type TransmissionType = "Automatic" | "Manual";

export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";

export interface Vehicle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  vehicleType: VehicleType;
  brand: string;
  model: string;
  year: number;
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
  pricePerDay: number; // USD
  rating: number;
  location: string;
  features: string[];
  isAvailable: boolean;
  /** Gallery images for the vehicle detail page. From DB gallery_urls. */
  galleryUrls?: string[];
}

export interface VehicleFilters {
  searchQuery: string;
  vehicleTypes: VehicleType[];
  transmissions: TransmissionType[];
  fuelTypes: FuelType[];
  priceRange: [number, number];
  minSeats: number;
  minRating: number;
  location: string;
}
