import type { Metadata } from "next";
import { getPageMetadata, toNextMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...toNextMetadata(getPageMetadata("packages")),
  alternates: { canonical: "/packages" },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
