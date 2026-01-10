import { TravelPackage, PackageFilters } from "@/types/packages";

export const filterPackages = (
  packages: TravelPackage[],
  filters: PackageFilters
): TravelPackage[] => {
  return packages.filter((pkg) => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query) ||
        pkg.destinations.some((dest) =>
          dest.toLowerCase().includes(query)
        ) ||
        pkg.packageType.toLowerCase().includes(query) ||
        pkg.highlights.some((highlight) =>
          highlight.toLowerCase().includes(query)
        );

      if (!matchesSearch) return false;
    }

    // Package type filter
    if (
      filters.packageTypes.length > 0 &&
      !filters.packageTypes.includes(pkg.packageType)
    ) {
      return false;
    }

    // Destinations filter
    if (filters.destinations.length > 0) {
      const hasMatchingDestination = pkg.destinations.some((dest) =>
        filters.destinations.includes(dest)
      );
      if (!hasMatchingDestination) return false;
    }

    // Duration filter
    if (
      filters.durations.length > 0 &&
      !filters.durations.includes(pkg.duration)
    ) {
      return false;
    }

    // Price range filter
    if (pkg.price < filters.priceRange[0] || pkg.price > filters.priceRange[1]) {
      return false;
    }

    // Best for filter
    if (filters.bestFor.length > 0) {
      const hasMatchingBestFor = pkg.bestFor.some((bf) =>
        filters.bestFor.includes(bf)
      );
      if (!hasMatchingBestFor) return false;
    }

    // Rating filter
    if (pkg.rating < filters.minRating) {
      return false;
    }

    return true;
  });
};


