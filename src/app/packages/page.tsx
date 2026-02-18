import { getPackages } from "@/lib/packages";
import { mockPackages } from "@/data/packages";
import PackagesPageClient from "@/components/Packages/PackagesPageClient";

export default async function PackagesPage() {
  const packages = await getPackages();
  const initialPackages = packages.length > 0 ? packages : mockPackages;

  return <PackagesPageClient initialPackages={initialPackages} />;
}
