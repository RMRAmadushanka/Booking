/**
 * Centralized SEO metadata for Next.js App Router.
 * Use in layout.tsx or page.tsx via export const metadata = getPageMetadata('home')
 * or generateMetadata() for dynamic routes.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drimooria.com";
const BRAND = "Drimooria Travels";

export type PageKey =
  | "home"
  | "packages"
  | "vehicles"
  | "customize-trip"
  | "transfer-colombo-galle"
  | "blog-driver-cost"
  | "blog-10-day"
  | "blog-driver-safety"
  | "blog-south-coast";

export interface PageMetadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName?: string;
    locale?: string;
    type?: "website" | "article";
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description?: string;
  };
}

export function getPageMetadata(page: PageKey): PageMetadata {
  const base = { siteName: BRAND, locale: "en_US", type: "website" as const };
  const map: Record<PageKey, PageMetadata> = {
    home: {
      title: `Sri Lanka Tour Packages & Private Driver Hire | ${BRAND}`,
      description:
        "Book Sri Lanka tour packages, custom itineraries & car rental with driver. Private tours, wildlife safaris & beach holidays. Tailor-made trips.",
      openGraph: {
        ...base,
        title: `Sri Lanka Tour Packages & Private Driver Hire | ${BRAND}`,
        description:
          "Book Sri Lanka tour packages, custom itineraries & car rental with driver. Private tours & tailor-made holidays.",
        url: SITE_URL,
      },
      twitter: {
        card: "summary_large_image",
        title: `Sri Lanka Tour Packages & Private Driver Hire | ${BRAND}`,
        description: "Book Sri Lanka tours, custom itineraries & car rental with driver.",
      },
    },
    packages: {
      title: `Sri Lanka Tour Packages | Multi-Day Tours & Safaris | ${BRAND}`,
      description:
        "Browse Sri Lanka tour packages: wildlife safaris, beach tours, cultural trips. 5–14 day itineraries with private driver. Book now.",
      openGraph: {
        ...base,
        title: `Sri Lanka Tour Packages | Multi-Day Tours & Safaris | ${BRAND}`,
        description:
          "Browse Sri Lanka tour packages: wildlife safaris, beach tours. Itineraries with private driver.",
        url: `${SITE_URL}/packages`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Sri Lanka Tour Packages | ${BRAND}`,
      },
    },
    vehicles: {
      title: `Car Rental with Driver Sri Lanka | Private Driver Hire | ${BRAND}`,
      description:
        "Hire a private driver in Sri Lanka. Safe car & van rental with English-speaking driver. Colombo, Galle, Kandy. Book online.",
      openGraph: {
        ...base,
        title: `Car Rental with Driver Sri Lanka | Private Driver Hire | ${BRAND}`,
        description: "Hire a private driver in Sri Lanka. Safe car & van rental. Book online.",
        url: `${SITE_URL}/vehicles`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Car Rental with Driver Sri Lanka | ${BRAND}`,
      },
    },
    "customize-trip": {
      title: `Custom Sri Lanka Tours | Tailor-Made Itineraries | ${BRAND}`,
      description:
        "Plan your custom Sri Lanka tour. Tailor-made holidays, flexible itineraries & private driver. Get a quote in 24 hours.",
      openGraph: {
        ...base,
        title: `Custom Sri Lanka Tours | Tailor-Made Itineraries | ${BRAND}`,
        description: "Plan your custom Sri Lanka tour. Tailor-made holidays & private driver.",
        url: `${SITE_URL}/customize-trip`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Custom Sri Lanka Tours | ${BRAND}`,
      },
    },
    "transfer-colombo-galle": {
      title: `Colombo Airport to Galle: Private Driver Transfer | ${BRAND}`,
      description:
        "Private driver transfer from Colombo Airport to Galle. Fixed price, no hidden fees. English-speaking driver. Book your transfer now.",
      openGraph: {
        ...base,
        title: `Colombo Airport to Galle: Private Driver Transfer | ${BRAND}`,
        description: "Private driver transfer Colombo Airport to Galle. Fixed price, no hidden fees.",
        url: `${SITE_URL}/transfers/colombo-airport-galle`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Colombo Airport to Galle: Private Driver Transfer | ${BRAND}`,
      },
    },
    "blog-driver-cost": {
      title: `How Much Does a Private Driver Cost in Sri Lanka? (2026) | ${BRAND}`,
      description:
        "Clear guide to private driver costs in Sri Lanka: daily rates, what's included, and how to avoid hidden fees.",
      openGraph: {
        ...base,
        type: "article",
        title: `How Much Does a Private Driver Cost in Sri Lanka? | ${BRAND}`,
        description: "Private driver costs in Sri Lanka: daily rates and what's included.",
        url: `${SITE_URL}/blog/private-driver-cost-sri-lanka`,
      },
      twitter: {
        card: "summary_large_image",
        title: `How Much Does a Private Driver Cost in Sri Lanka? | ${BRAND}`,
      },
    },
    "blog-10-day": {
      title: `How to Plan a 10-Day Trip to Sri Lanka: Complete Guide | ${BRAND}`,
      description:
        "Step-by-step 10-day Sri Lanka itinerary: Colombo, Kandy, Ella, Yala, Galle. Tips and booking links.",
      openGraph: {
        ...base,
        type: "article",
        title: `How to Plan a 10-Day Trip to Sri Lanka | ${BRAND}`,
        description: "10-day Sri Lanka itinerary guide: Colombo, Kandy, Ella, Yala, Galle.",
        url: `${SITE_URL}/blog/10-day-trip-planner`,
      },
      twitter: {
        card: "summary_large_image",
        title: `How to Plan a 10-Day Trip to Sri Lanka | ${BRAND}`,
      },
    },
    "blog-driver-safety": {
      title: `Is It Safe to Hire a Driver in Sri Lanka? Tourist Advice | ${BRAND}`,
      description:
        "Safety tips for hiring a private driver in Sri Lanka. Road conditions, female travellers, and what to expect.",
      openGraph: {
        ...base,
        type: "article",
        title: `Is It Safe to Hire a Driver in Sri Lanka? | ${BRAND}`,
        description: "Safety tips for hiring a private driver in Sri Lanka.",
        url: `${SITE_URL}/blog/driver-safety`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Is It Safe to Hire a Driver in Sri Lanka? | ${BRAND}`,
      },
    },
    "blog-south-coast": {
      title: `Best Time to Visit Sri Lanka's South Coast | Weather Guide | ${BRAND}`,
      description:
        "Weather guide for Sri Lanka's south coast. Best months for beach and when to avoid monsoon.",
      openGraph: {
        ...base,
        type: "article",
        title: `Best Time to Visit Sri Lanka's South Coast | ${BRAND}`,
        description: "Weather guide for Sri Lanka's south coast. Best months for beach.",
        url: `${SITE_URL}/blog/best-time-south-coast`,
      },
      twitter: {
        card: "summary_large_image",
        title: `Best Time to Visit Sri Lanka's South Coast | ${BRAND}`,
      },
    },
  };
  return map[page];
}

/** Convert to Next.js Metadata shape (optional fields) */
export function toNextMetadata(m: PageMetadata): {
  title: string;
  description: string;
  openGraph: object;
  twitter: object;
} {
  return {
    title: m.title,
    description: m.description,
    openGraph: m.openGraph,
    twitter: m.twitter,
  };
}
