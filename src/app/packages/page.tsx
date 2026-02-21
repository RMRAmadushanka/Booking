import { getPackages } from "@/lib/packages";
import PackagesPageClient from "@/components/Packages/PackagesPageClient";

export default async function PackagesPage() {
  const packages = await getPackages();
  return <PackagesPageClient initialPackages={packages} />;
}
