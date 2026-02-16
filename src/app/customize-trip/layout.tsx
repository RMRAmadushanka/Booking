import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize Your Trip | Build Your Sri Lanka Travel Package",
  description:
    "Create your perfect Sri Lanka travel package. Choose destinations, duration, activities, and budget to design a custom tour tailored to you.",
  keywords: [
    "custom Sri Lanka tour",
    "tailored travel package",
    "Sri Lanka trip builder",
    "design your trip",
    "Sri Lanka travel planner",
  ],
  openGraph: {
    title: "Customize Your Trip | Build Your Sri Lanka Travel Package",
    description:
      "Create your perfect Sri Lanka travel package. Choose destinations, duration, activities, and budget.",
    type: "website",
  },
  alternates: {
    canonical: "/customize-trip",
  },
};

export default function CustomizeTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
