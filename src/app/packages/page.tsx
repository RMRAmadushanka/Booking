import dynamic from "next/dynamic";
import { getPackages } from "@/lib/packages";
import { getPackageReviewCounts } from "@/lib/reviews";
import PackagesLoading from "./loading";

const PackagesPageClient = dynamic(
  () => import("@/components/Packages/PackagesPageClient"),
  { loading: () => <PackagesLoading /> }
);

export default async function PackagesPage() {
  const packages = await getPackages();
  const reviewCounts = await getPackageReviewCounts(packages.map((p) => p.id));
  return (
    <PackagesPageClient
      initialPackages={packages}
      reviewCounts={reviewCounts}
    />
  );
}
