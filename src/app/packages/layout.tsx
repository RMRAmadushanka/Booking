import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sri Lanka Tour Packages | Travel Packages with Filters",
  description:
    "Discover amazing Sri Lanka tour packages including Cultural Tours, Adventure Tours, Wildlife Tours, Beach Holidays, Honeymoon Packages, and Luxury Tours. Filter by destination, duration, price, and more.",
  keywords: [
    "Sri Lanka tours",
    "Sri Lanka travel packages",
    "Kandy packages",
    "Ella holidays",
    "Sri Lanka travel agency",
    "Cultural tours Sri Lanka",
    "Adventure tours Sri Lanka",
    "Wildlife tours Sri Lanka",
    "Beach holidays Sri Lanka",
    "Honeymoon packages Sri Lanka",
  ],
  openGraph: {
    title: "Sri Lanka Tour Packages | Travel Packages with Filters",
    description:
      "Discover amazing Sri Lanka tour packages. Filter by destination, duration, price, and more.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Sri Lanka Tour Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Tour Packages | Travel Packages with Filters",
    description:
      "Discover amazing Sri Lanka tour packages. Filter by destination, duration, price, and more.",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630&fit=crop",
    ],
  },
  alternates: {
    canonical: "/packages",
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


