"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FunnelIcon } from "@heroicons/react/24/outline";
import PackageFilters from "@/components/Packages/PackageFilters";
import TravelPackageCard from "@/components/Packages/TravelPackageCard";
import PackageSkeleton from "@/components/Packages/PackageSkeleton";
import Pagination from "@/components/common/Pagination";
import type { TravelPackage } from "@/types/packages";
import { PackageFilters as FilterType } from "@/types/packages";
import { filterPackages } from "@/utils/filterPackages";

const PACKAGES_PAGE_SIZE = 9;

const INITIAL_FILTERS: FilterType = {
  searchQuery: "",
  packageTypes: [],
  destinations: [],
  durations: [],
  priceRange: [0, 5000],
  bestFor: [],
  minRating: 0,
};

export type ReviewStats = { count: number; averageRating: number | null };

type PackagesPageClientProps = {
  initialPackages: TravelPackage[];
  reviewCounts?: Record<string, ReviewStats>;
};

export default function PackagesPageClient({
  initialPackages,
  reviewCounts = {},
}: PackagesPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const [filters, setFilters] = useState<FilterType>(() => {
    const search = searchParams.get("search") || "";
    const types = searchParams.get("types")?.split(",").filter(Boolean) || [];
    const destinations =
      searchParams.get("destinations")?.split(",").filter(Boolean) || [];
    const durations =
      searchParams.get("durations")?.split(",").filter(Boolean) || [];
    const minPrice = parseInt(searchParams.get("minPrice") || "0");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "5000");
    const bestFor = searchParams.get("bestFor")?.split(",").filter(Boolean) || [];
    const minRating = parseInt(searchParams.get("minRating") || "0");

    return {
      searchQuery: search,
      packageTypes: types as FilterType["packageTypes"],
      destinations: destinations as FilterType["destinations"],
      durations: durations as FilterType["durations"],
      priceRange: [minPrice, maxPrice],
      bestFor: bestFor as FilterType["bestFor"],
      minRating,
    };
  });

  const [isLoading] = useState(false);

  const filteredPackages = useMemo(
    () => filterPackages(initialPackages, filters),
    [initialPackages, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPackages.length / PACKAGES_PAGE_SIZE));
  const pageToShow = Math.min(currentPage, totalPages);
  const paginatedPackages = useMemo(
    () =>
      filteredPackages.slice(
        (pageToShow - 1) * PACKAGES_PAGE_SIZE,
        pageToShow * PACKAGES_PAGE_SIZE
      ),
    [filteredPackages, pageToShow]
  );

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.searchQuery) params.set("search", newFilters.searchQuery);
    if (newFilters.packageTypes.length > 0)
      params.set("types", newFilters.packageTypes.join(","));
    if (newFilters.destinations.length > 0)
      params.set("destinations", newFilters.destinations.join(","));
    if (newFilters.durations.length > 0)
      params.set("durations", newFilters.durations.join(","));
    if (newFilters.priceRange[0] > 0)
      params.set("minPrice", newFilters.priceRange[0].toString());
    if (newFilters.priceRange[1] < 5000)
      params.set("maxPrice", newFilters.priceRange[1].toString());
    if (newFilters.bestFor.length > 0)
      params.set("bestFor", newFilters.bestFor.join(","));
    if (newFilters.minRating > 0)
      params.set("minRating", newFilters.minRating.toString());
    params.set("page", "1");

    router.push(`/packages?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/packages?${params.toString()}`, { scroll: true });
  };

  const activeFilterCount =
    (filters.searchQuery ? 1 : 0) +
    filters.packageTypes.length +
    filters.destinations.length +
    filters.durations.length +
    filters.bestFor.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">
                Sri Lanka Tour Packages
              </h1>
              <p className="text-sm text-[#64748B] mt-1">
                {filteredPackages.length} package
                {filteredPackages.length !== 1 ? "s" : ""} found
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
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <PackageFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={() => handleFiltersChange(INITIAL_FILTERS)}
          />
        </aside>

        {isMobileFiltersOpen && (
          <PackageFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={() => handleFiltersChange(INITIAL_FILTERS)}
            isMobile
            onClose={() => setIsMobileFiltersOpen(false)}
          />
        )}

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PackageSkeleton key={i} />
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
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
                  No packages found
                </h2>
                <p className="text-[#64748B] mb-6">
                  Try adjusting your filters to find more packages.
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedPackages.map((pkg) => (
                  <TravelPackageCard
                    key={pkg.id}
                    package={pkg}
                    reviewCount={reviewCounts[pkg.id]?.count ?? 0}
                    averageRating={reviewCounts[pkg.id]?.averageRating ?? null}
                  />
                ))}
              </div>
              <Pagination
                currentPage={pageToShow}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredPackages.length}
                pageSize={PACKAGES_PAGE_SIZE}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
