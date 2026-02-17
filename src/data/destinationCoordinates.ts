import type { Destination } from "@/types/packages";

export type LatLng = { lat: number; lng: number };

// Approximate coordinates for map routing/markers.
export const destinationCoordinates: Record<Destination, LatLng> = {
  Colombo: { lat: 6.9271, lng: 79.8612 },
  Kandy: { lat: 7.2906, lng: 80.6337 },
  Sigiriya: { lat: 7.9568, lng: 80.7603 },
  Ella: { lat: 6.8667, lng: 81.0466 },
  "Nuwara Eliya": { lat: 6.9497, lng: 80.7891 },
  Yala: { lat: 6.3667, lng: 81.5167 },
  Galle: { lat: 6.0535, lng: 80.221 },
  Bentota: { lat: 6.4259, lng: 79.9956 },
};

