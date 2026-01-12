"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Chip, ToggleButtonGroup, ToggleButton, Collapse } from "@mui/material";
import { ChevronDownIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { TravelPackageCard, PackageSkeleton } from "@/components/Packages";
import { mockPackages } from "@/data/packages";
import { TravelPackage, Duration } from "@/types/packages";

// Filter types for this section
type PackageCategory = "all" | "beach" | "nature" | "corporate" | "honeymoon";
type DurationFilter = "all" | "1-3" | "4-6" | "7+";
type BudgetFilter = "all" | "low" | "medium" | "premium";

interface PopularPackagesSectionProps {
  featuredPackageId?: string;
}

// Map package types to our simplified categories
const mapToCategory = (packageType: string): PackageCategory => {
  const type = packageType.toLowerCase();
  if (type.includes("beach")) return "beach";
  if (type.includes("adventure") || type.includes("wildlife") || type.includes("cultural"))
    return "nature";
  if (type.includes("luxury")) return "corporate";
  if (type.includes("honeymoon")) return "honeymoon";
  return "nature";
};

// Map duration to filter category
const mapDurationToFilter = (duration: Duration): DurationFilter => {
  if (duration === "1-3 Days") return "1-3";
  if (duration === "4-6 Days") return "4-6";
  return "7+";
};

// Map price to budget category
const mapPriceToBudget = (price: number): BudgetFilter => {
  if (price <= 800) return "low";
  if (price <= 1500) return "medium";
  return "premium";
};

const PopularPackagesSection: React.FC<PopularPackagesSectionProps> = ({
  featuredPackageId,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<PackageCategory>("all");
  const [durationFilter, setDurationFilter] = useState<DurationFilter>("all");
  const [budgetFilter, setBudgetFilter] = useState<BudgetFilter>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for indicator dots
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85 + 16; // 85vw + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveScrollIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate brief loading state on filter change for smooth UX
  const handleFilterChange = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      value: string | null
    ) => {
      if (value !== null) {
        setIsLoading(true);
        setter(value);
        setTimeout(() => setIsLoading(false), 150);
      }
    },
    []
  );

  // Memoized filtered packages
  const filteredPackages = useMemo(() => {
    return mockPackages.filter((pkg) => {
      if (categoryFilter !== "all") {
        const pkgCategory = mapToCategory(pkg.packageType);
        if (pkgCategory !== categoryFilter) return false;
      }
      if (durationFilter !== "all") {
        const pkgDuration = mapDurationToFilter(pkg.duration);
        if (pkgDuration !== durationFilter) return false;
      }
      if (budgetFilter !== "all") {
        const pkgBudget = mapPriceToBudget(pkg.price);
        if (pkgBudget !== budgetFilter) return false;
      }
      return true;
    });
  }, [categoryFilter, durationFilter, budgetFilter]);

  // Handle card actions
  const handleBookNow = useCallback((pkg: TravelPackage) => {
    console.log("Book package:", pkg.title);
  }, []);

  const handleFavorite = useCallback(
    (pkg: TravelPackage, isFavorite: boolean) => {
      console.log(`${isFavorite ? "Added" : "Removed"} ${pkg.title} to favorites`);
    },
    []
  );

  // Count active filters
  const activeFilterCount = [
    categoryFilter !== "all",
    durationFilter !== "all",
    budgetFilter !== "all",
  ].filter(Boolean).length;

  // Clear all filters
  const clearFilters = () => {
    setCategoryFilter("all");
    setDurationFilter("all");
    setBudgetFilter("all");
  };

  // Chip styles for consistent design system
  const chipSx = (isActive: boolean) => ({
    height: { xs: 40, sm: 36 },
    minWidth: 44,
    px: { xs: 1.5, sm: 2 },
    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
    fontWeight: 500,
    borderRadius: "var(--radius)",
    transition: "all 200ms ease",
    backgroundColor: isActive ? "#2563EB" : "transparent",
    color: isActive ? "#FFFFFF" : "#64748B",
    border: isActive ? "1px solid #2563EB" : "1px solid #E2E8F0",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: isActive ? "#1D4ED8" : "#F8FAFC",
      borderColor: isActive ? "#1D4ED8" : "#2DD4BF",
    },
    "&:focus-visible": {
      outline: "2px solid #2DD4BF",
      outlineOffset: "2px",
    },
  });

  // Toggle button styles
  const toggleButtonSx = {
    height: { xs: 40, sm: 36 },
    minWidth: 44,
    px: { xs: 1.5, sm: 2 },
    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
    fontWeight: 500,
    textTransform: "none" as const,
    borderColor: "#E2E8F0",
    color: "#64748B",
    transition: "all 200ms ease",
    whiteSpace: "nowrap",
    "&.Mui-selected": {
      backgroundColor: "#2563EB",
      color: "#FFFFFF",
      borderColor: "#2563EB",
      "&:hover": {
        backgroundColor: "#1D4ED8",
      },
    },
    "&:hover": {
      backgroundColor: "#F8FAFC",
      borderColor: "#2DD4BF",
    },
    "&:focus-visible": {
      outline: "2px solid #2DD4BF",
      outlineOffset: "2px",
    },
  };

  // Render filter row with horizontal scroll on mobile
  const FilterScrollContainer: React.FC<{ children: React.ReactNode; label: string }> = ({
    children,
    label,
  }) => (
    <div className="w-full">
      <span className="text-xs font-medium text-[#64748B] mb-2 block sm:hidden">
        {label}
      </span>
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
        <div className="flex items-center gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FFFFFF]" aria-labelledby="popular-packages-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2
            id="popular-packages-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F172A] mb-2 sm:mb-3 tracking-tight"
          >
            Popular Travel Packages
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg max-w-xl mx-auto">
            Handpicked journeys designed for comfort and discovery
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="sm:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC] rounded-[var(--radius)] border border-[#E2E8F0] active:bg-[#F1F5F9] transition-colors"
            aria-expanded={mobileFiltersOpen}
            aria-controls="mobile-filters"
          >
            <div className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-[#64748B]" />
              <span className="font-medium text-[#0F172A]">Filters</span>
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 bg-[#2563EB] text-white text-xs font-medium rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <ChevronDownIcon
              className={`w-5 h-5 text-[#64748B] transition-transform duration-200 ${
                mobileFiltersOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Filters (Collapsible) */}
        <Collapse in={mobileFiltersOpen} className="sm:hidden">
          <div
            id="mobile-filters"
            className="space-y-4 pb-6 mb-4 border-b border-[#E2E8F0]"
          >
            {/* Package Type */}
            <FilterScrollContainer label="Package Type">
              {(
                [
                  { value: "all", label: "All" },
                  { value: "beach", label: "Beach" },
                  { value: "nature", label: "Nature" },
                  { value: "corporate", label: "Corporate" },
                  { value: "honeymoon", label: "Honeymoon" },
                ] as const
              ).map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  clickable
                  onClick={() =>
                    handleFilterChange(
                      setCategoryFilter as React.Dispatch<React.SetStateAction<string>>,
                      option.value
                    )
                  }
                  sx={chipSx(categoryFilter === option.value)}
                  aria-pressed={categoryFilter === option.value}
                />
              ))}
            </FilterScrollContainer>

            {/* Duration */}
            <FilterScrollContainer label="Duration">
              {(
                [
                  { value: "all", label: "Any" },
                  { value: "1-3", label: "1-3 Days" },
                  { value: "4-6", label: "4-6 Days" },
                  { value: "7+", label: "7+ Days" },
                ] as const
              ).map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  clickable
                  onClick={() =>
                    handleFilterChange(
                      setDurationFilter as React.Dispatch<React.SetStateAction<string>>,
                      option.value
                    )
                  }
                  sx={chipSx(durationFilter === option.value)}
                  aria-pressed={durationFilter === option.value}
                />
              ))}
            </FilterScrollContainer>

            {/* Budget */}
            <FilterScrollContainer label="Budget">
              {(
                [
                  { value: "all", label: "Any" },
                  { value: "low", label: "Budget" },
                  { value: "medium", label: "Mid-Range" },
                  { value: "premium", label: "Premium" },
                ] as const
              ).map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  clickable
                  onClick={() =>
                    handleFilterChange(
                      setBudgetFilter as React.Dispatch<React.SetStateAction<string>>,
                      option.value
                    )
                  }
                  sx={chipSx(budgetFilter === option.value)}
                  aria-pressed={budgetFilter === option.value}
                />
              ))}
            </FilterScrollContainer>

            {/* Clear Filters Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="w-full py-2.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] border border-[#2563EB] rounded-[var(--radius)] transition-colors active:bg-[#EFF6FF]"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </Collapse>

        {/* Desktop/Tablet Filters */}
        <div
          className="hidden sm:flex flex-wrap items-center justify-center gap-4 mb-10"
          role="toolbar"
          aria-label="Package filters"
        >
          {/* Package Type Filter */}
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter by package type"
          >
            {(
              [
                { value: "all", label: "All" },
                { value: "beach", label: "Beach" },
                { value: "nature", label: "Nature" },
                { value: "corporate", label: "Corporate" },
                { value: "honeymoon", label: "Honeymoon" },
              ] as const
            ).map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                clickable
                onClick={() =>
                  handleFilterChange(
                    setCategoryFilter as React.Dispatch<React.SetStateAction<string>>,
                    option.value
                  )
                }
                sx={chipSx(categoryFilter === option.value)}
                aria-pressed={categoryFilter === option.value}
                tabIndex={0}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-[#E2E8F0]" aria-hidden="true" />

          {/* Duration Filter */}
          <ToggleButtonGroup
            value={durationFilter}
            exclusive
            onChange={(_, value) =>
              handleFilterChange(
                setDurationFilter as React.Dispatch<React.SetStateAction<string>>,
                value
              )
            }
            aria-label="Filter by duration"
            sx={{
              "& .MuiToggleButtonGroup-grouped": {
                borderRadius: "var(--radius) !important",
                mx: 0.5,
                border: "1px solid #E2E8F0 !important",
              },
            }}
          >
            <ToggleButton value="all" sx={toggleButtonSx}>
              Any Duration
            </ToggleButton>
            <ToggleButton value="1-3" sx={toggleButtonSx}>
              1-3 Days
            </ToggleButton>
            <ToggleButton value="4-6" sx={toggleButtonSx}>
              4-6 Days
            </ToggleButton>
            <ToggleButton value="7+" sx={toggleButtonSx}>
              7+ Days
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Divider */}
          <div className="w-px h-6 bg-[#E2E8F0]" aria-hidden="true" />

          {/* Budget Filter */}
          <ToggleButtonGroup
            value={budgetFilter}
            exclusive
            onChange={(_, value) =>
              handleFilterChange(
                setBudgetFilter as React.Dispatch<React.SetStateAction<string>>,
                value
              )
            }
            aria-label="Filter by budget"
            sx={{
              "& .MuiToggleButtonGroup-grouped": {
                borderRadius: "var(--radius) !important",
                mx: 0.5,
                border: "1px solid #E2E8F0 !important",
              },
            }}
          >
            <ToggleButton value="all" sx={toggleButtonSx}>
              Any Budget
            </ToggleButton>
            <ToggleButton value="low" sx={toggleButtonSx}>
              Budget
            </ToggleButton>
            <ToggleButton value="medium" sx={toggleButtonSx}>
              Mid-Range
            </ToggleButton>
            <ToggleButton value="premium" sx={toggleButtonSx}>
              Premium
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Active Filter Count - Desktop */}
        {activeFilterCount > 0 && (
          <div className="hidden sm:flex items-center justify-center gap-2 mb-6">
            <span className="text-sm text-[#64748B]">
              Showing {filteredPackages.length} package
              {filteredPackages.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 rounded"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Mobile Active Filter Badge */}
        {activeFilterCount > 0 && !mobileFiltersOpen && (
          <div className="sm:hidden flex items-center justify-center gap-2 mb-4">
            <span className="text-sm text-[#64748B]">
              {filteredPackages.length} package{filteredPackages.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-[#2563EB] active:text-[#1D4ED8]"
            >
              Clear
            </button>
          </div>
        )}

        {/* Cards Grid / Scroll Container */}
        {isLoading ? (
          // Skeleton Loading State
          <>
            {/* Desktop Skeleton */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <PackageSkeleton key={i} />
              ))}
            </div>
            {/* Mobile Skeleton */}
            <div className="sm:hidden -mx-4 px-4">
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-[85vw] max-w-[320px]">
                    <PackageSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : filteredPackages.length === 0 ? (
          // Empty State
          <div className="text-center py-12 sm:py-16">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-[#F8FAFC] flex items-center justify-center">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-[#64748B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#0F172A] mb-2">
              No packages found
            </h3>
            <p className="text-sm sm:text-base text-[#64748B] mb-4 px-4">
              Try adjusting your filters to see more options
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-medium rounded-[var(--radius)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`transition-all duration-200 ${
                    featuredPackageId === pkg.id
                      ? "ring-2 ring-[#2563EB] ring-offset-2 rounded-[var(--radius-md)]"
                      : ""
                  }`}
                >
                  <TravelPackageCard
                    package={pkg}
                    onBookNow={handleBookNow}
                    onFavorite={handleFavorite}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden -mx-4">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`flex-shrink-0 w-[85vw] max-w-[320px] snap-center transition-all duration-200 ${
                      featuredPackageId === pkg.id
                        ? "ring-2 ring-[#2563EB] ring-offset-2 rounded-[var(--radius-md)]"
                        : ""
                    }`}
                  >
                    <TravelPackageCard
                      package={pkg}
                      onBookNow={handleBookNow}
                      onFavorite={handleFavorite}
                    />
                  </div>
                ))}
              </div>

              {/* Scroll indicator dots - Interactive */}
              {filteredPackages.length > 1 && (
                <div
                  className="flex justify-center items-center gap-1.5 mt-4 px-4"
                  role="tablist"
                  aria-label="Package cards"
                >
                  {filteredPackages.slice(0, 6).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const container = scrollContainerRef.current;
                        if (container) {
                          const cardWidth = container.offsetWidth * 0.85 + 16;
                          container.scrollTo({
                            left: cardWidth * i,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        activeScrollIndex === i
                          ? "bg-[#2563EB] w-6"
                          : "bg-[#E2E8F0] hover:bg-[#CBD5E1]"
                      }`}
                      role="tab"
                      aria-selected={activeScrollIndex === i}
                      aria-label={`Go to package ${i + 1}`}
                    />
                  ))}
                  {filteredPackages.length > 6 && (
                    <span className="text-xs text-[#64748B] ml-1">
                      +{filteredPackages.length - 6}
                    </span>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* View All Link */}
        {filteredPackages.length > 0 && (
          <div className="text-center mt-8 sm:mt-10">
            <a
              href="/packages"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-[#2563EB] hover:text-[#1D4ED8] active:text-[#1E40AF] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] focus-visible:ring-offset-2 rounded-[var(--radius)]"
            >
              View All Packages
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularPackagesSection;
