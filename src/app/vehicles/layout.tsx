import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Rentals Sri Lanka | Cars, SUVs & More",
  description:
    "Rent cars, SUVs, vans, and luxury vehicles in Sri Lanka. Filter by type, transmission, fuel, price, and location. Same card design as our travel packages.",
  keywords: [
    "Sri Lanka car rental",
    "vehicle rental Sri Lanka",
    "SUV rental Colombo",
    "luxury car hire Sri Lanka",
    "van rental Sri Lanka",
  ],
  openGraph: {
    title: "Vehicle Rentals Sri Lanka | Cars, SUVs & More",
    description:
      "Rent cars, SUVs, vans, and luxury vehicles in Sri Lanka. Filter by type, transmission, fuel, and more.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Vehicle Rentals Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Rentals Sri Lanka | Cars, SUVs & More",
    description:
      "Rent cars, SUVs, vans, and luxury vehicles in Sri Lanka. Filter by type, transmission, fuel, and more.",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&h=630&fit=crop",
    ],
  },
  alternates: {
    canonical: "/vehicles",
  },
};

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
