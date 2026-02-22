/**
 * JSON-LD structured data for SEO. Inject into layout or page via a <script type="application/ld+json">.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drimooria.com";
const BRAND = "Drimooria Travels";

export function getTravelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: BRAND,
    description:
      "Sri Lanka tour packages, custom itineraries, and car rental with private driver. Tailor-made holidays and multi-day tours.",
    url: SITE_URL,
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    serviceType: [
      "Tour packages",
      "Car rental with driver",
      "Custom tours",
      "Private transfers",
    ],
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressCountry: "LK" },
  };
}

export function getTouristTripSchema(params: {
  name: string;
  description: string;
  url: string;
  places?: string[];
  price?: number;
  currency?: string;
}) {
  const { name, description, url, places = [], price, currency = "USD" } = params;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    ...(places.length > 0 && {
      itinerary: {
        "@type": "ItemList",
        itemListElement: places.map((place) => ({ "@type": "Place", name: place })),
      },
    }),
    provider: { "@type": "TravelAgency", name: BRAND },
    ...(price != null && {
      offers: {
        "@type": "Offer",
        priceCurrency: currency,
        price,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export function getProductSchema(params: {
  name: string;
  description: string;
  url: string;
  lowPrice?: number;
  highPrice?: number;
  ratingValue?: number;
  reviewCount?: number;
}) {
  const {
    name,
    description,
    url,
    lowPrice = 50,
    highPrice = 150,
    ratingValue,
    reviewCount,
  } = params;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    brand: { "@type": "Brand", name: BRAND },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: String(lowPrice),
      highPrice: String(highPrice),
      offerCount: "1",
    },
  };
  if (ratingValue != null && reviewCount != null) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(ratingValue),
      reviewCount: String(reviewCount),
    };
  }
  return schema;
}

export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
