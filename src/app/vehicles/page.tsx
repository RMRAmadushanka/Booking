"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FunnelIcon } from "@heroicons/react/24/outline";
import VehicleFilters from "@/components/Vehicles/VehicleFilters";
import VehicleCard from "@/components/Packages/VehicleCard";
import VehicleSkeleton from "@/components/Vehicles/VehicleSkeleton";
import { mockVehicles } from "@/data/vehicles";
import { VehicleFilters as FilterType } from "@/types/vehicle";
import { filterVehicles } from "@/utils/filterVehicles";

const MIN_PRICE = 0;
const MAX_PRICE = 400;

const INITIAL_FILTERS: FilterType = {
  searchQuery: "",
  vehicleTypes: [],
  transmissions: [],
  fuelTypes: [],
  priceRange: [MIN_PRICE, MAX_PRICE],
  minSeats: 0,
  minRating: 0,
  location: "",
};

export default function VehiclesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterType>(() => {
    const search = searchParams.get("search") || "";
    const types = searchParams.get("types")?.split(",").filter(Boolean) || [];
    const transmissions =
      searchParams.get("transmissions")?.split(",").filter(Boolean) || [];
    const fuelTypes =
      searchParams.get("fuelTypes")?.split(",").filter(Boolean) || [];
    const minPrice = parseInt(searchParams.get("minPrice") || String(MIN_PRICE));
    const maxPrice = parseInt(searchParams.get("maxPrice") || String(MAX_PRICE));
    const minSeats = parseInt(searchParams.get("minSeats") || "0");
    const minRating = parseInt(searchParams.get("minRating") || "0");
    const location = searchParams.get("location") || "";

    return {
      searchQuery: search,
      vehicleTypes: types as FilterType["vehicleTypes"],
      transmissions: transmissions as FilterType["transmissions"],
      fuelTypes: fuelTypes as FilterType["fuelTypes"],
      priceRange: [minPrice, maxPrice],
      minSeats,
      minRating,
      location,
    };
  });

  const [isLoading] = useState(false);

  const filteredVehicles = useMemo(
    () => filterVehicles(mockVehicles, filters),
    [filters]
  );

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.searchQuery) params.set("search", newFilters.searchQuery);
    if (newFilters.vehicleTypes.length > 0)
      params.set("types", newFilters.vehicleTypes.join(","));
    if (newFilters.transmissions.length > 0)
      params.set("transmissions", newFilters.transmissions.join(","));
    if (newFilters.fuelTypes.length > 0)
      params.set("fuelTypes", newFilters.fuelTypes.join(","));
    if (newFilters.priceRange[0] > MIN_PRICE)
      params.set("minPrice", newFilters.priceRange[0].toString());
    if (newFilters.priceRange[1] < MAX_PRICE)
      params.set("maxPrice", newFilters.priceRange[1].toString());
    if (newFilters.minSeats > 0)
      params.set("minSeats", newFilters.minSeats.toString());
    if (newFilters.minRating > 0)
      params.set("minRating", newFilters.minRating.toString());
    if (newFilters.location) params.set("location", newFilters.location);

    router.push(`/vehicles?${params.toString()}`, { scroll: false });
  };

  const activeFilterCount =
    (filters.searchQuery ? 1 : 0) +
    filters.vehicleTypes.length +
    filters.transmissions.length +
    filters.fuelTypes.length +
    (filters.minSeats > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE
      ? 1
      : 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">
                Vehicle Rentals
              </h1>
              <p className="text-sm text-[#64748B] mt-1">
                {filteredVehicles.length} vehicle
                {filteredVehicles.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[var(--radius)] font-medium transition-colors"
              aria-label="Open filters"
            >
              <FunnelIcon className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-[#2563EB] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <VehicleFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={() => handleFiltersChange(INITIAL_FILTERS)}
          />
        </aside>

        {/* Mobile Filters Drawer */}
        {isMobileFiltersOpen && (
          <VehicleFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={() => handleFiltersChange(INITIAL_FILTERS)}
            isMobile
            onClose={() => setIsMobileFiltersOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <VehicleSkeleton key={i} />
              ))}
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-24 h-24 mx-auto text-[#E5E7EB] mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-2">
                  No vehicles found
                </h2>
                <p className="text-[#64748B] mb-6">
                  Try adjusting your filters to find more vehicles.
                </p>
                <button
                  onClick={() => handleFiltersChange(INITIAL_FILTERS)}
                  className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium rounded-[var(--radius)] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
