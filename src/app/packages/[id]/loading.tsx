import PackageDetailSkeleton from "@/components/Packages/PackageDetailSkeleton";

/**
 * Shown while the package detail page is loading (server fetch).
 */
export default function PackageDetailLoading() {
  return <PackageDetailSkeleton />;
}
