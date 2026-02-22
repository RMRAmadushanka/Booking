# SEO Strategy & Action Plan — Sri Lanka Travel Agency

Based on your keyword research (SEO Strategy and Action Plan.xlsx). Use this to update your Next.js App Router site.

---

## 1. Keyword analysis & categorization

| Keyword(s) | Intent | Page type | Priority |
|------------|--------|-----------|----------|
| Sri Lanka tour packages, Sri Lanka travel agency | Commercial | Homepage | High |
| Car rental with driver Sri Lanka, Private driver Sri Lanka | Transactional | Car Rental Hub | High |
| Custom Sri Lanka tours, Sri Lanka tailor made holidays | Commercial | Custom Tours Hub | Medium |
| 14 day custom Sri Lanka itinerary | Transactional | Package Landing | Medium |
| Sri Lanka wildlife safari and beach tour | Transactional | Package Landing | Low |
| December holiday tours in Sri Lanka | Commercial | Seasonal Landing | Medium |
| Hire English speaking driver Sri Lanka | Transactional | Driver / Car Rental | Low |
| Private driver Colombo airport to Galle | Transactional | Transfer Page | Medium |
| Rent a van with driver in Colombo | Transactional | Vehicle Sub-page | Low |
| How much does a private driver cost in Sri Lanka? | Informational | Blog / FAQ | Low |
| How to plan a 10 day trip to Sri Lanka? | Informational | Blog | Medium |
| Is it safe to hire a driver in Sri Lanka? | Informational | FAQ / Blog | Low |
| Best time to visit Sri Lanka south coast | Informational | Blog | Medium |

---

## 2. Page-type mapping (Next.js routes)

| Route | Page type | Primary keywords |
|-------|-----------|------------------|
| `/` | Homepage | Sri Lanka tour packages, travel agency |
| `/packages` | Package listing | Sri Lanka tour packages |
| `/customize-trip` | Custom Tours Hub | Custom Sri Lanka tours, tailor made |
| `/vehicles` | Car Rental Hub | Car rental with driver, private driver |
| `/packages/[slug]` | Package / Tour landing | Wildlife safari, 14-day itinerary, December tours |
| `/vehicles/[slug]` | Vehicle sub-page | Van rental Colombo |
| `/transfers/colombo-airport-galle` | Transfer | Colombo airport to Galle |
| `/blog/private-driver-cost` | Blog | Private driver cost |
| `/blog/10-day-trip-planner` | Blog | Plan 10 day trip |
| `/blog/driver-safety` | Blog / FAQ | Safe to hire driver |
| `/blog/best-time-south-coast` | Blog | Best time south coast |

---

## 3. Optimized metadata by page

Replace `[Agency]` with your brand (e.g. **Drimooria Travels**).

### Homepage (`/`)

```ts
// src/app/layout.tsx or page.tsx — generateMetadata
export const metadata = {
  title: "Sri Lanka Tour Packages & Private Driver Hire | Drimooria Travels",
  description: "Book Sri Lanka tour packages, custom itineraries & car rental with driver. Private tours, wildlife safaris & beach holidays. Tailor-made trips.",
  openGraph: {
    title: "Sri Lanka Tour Packages & Private Driver Hire | Drimooria Travels",
    description: "Book Sri Lanka tour packages, custom itineraries & car rental with driver. Private tours & tailor-made holidays.",
    url: "https://yoursite.com",
    siteName: "Drimooria Travels",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Lanka Tour Packages & Private Driver Hire | Drimooria Travels",
    description: "Book Sri Lanka tours, custom itineraries & car rental with driver.",
  },
};
```

- **Title:** ~60 chars ✓  
- **Description:** ~155 chars ✓  

### Car rental hub (`/vehicles`)

```ts
// src/app/vehicles/layout.tsx or page.tsx
export const metadata = {
  title: "Car Rental with Driver Sri Lanka | Private Driver Hire | Drimooria",
  description: "Hire a private driver in Sri Lanka. Safe car & van rental with English-speaking driver. Colombo, Galle, Kandy. Book online.",
  openGraph: {
    title: "Car Rental with Driver Sri Lanka | Private Driver Hire",
    description: "Hire a private driver in Sri Lanka. Safe car & van rental. Book online.",
    url: "https://yoursite.com/vehicles",
  },
  twitter: { card: "summary_large_image", title: "Car Rental with Driver Sri Lanka | Drimooria" },
};
```

### Custom tours hub (`/customize-trip`)

```ts
// src/app/customize-trip/page.tsx
export const metadata = {
  title: "Custom Sri Lanka Tours | Tailor-Made Itineraries | Drimooria Travels",
  description: "Plan your custom Sri Lanka tour. Tailor-made holidays, flexible itineraries & private driver. Get a quote in 24 hours.",
  openGraph: {
    title: "Custom Sri Lanka Tours | Tailor-Made Itineraries",
    description: "Plan your custom Sri Lanka tour. Tailor-made holidays & private driver.",
    url: "https://yoursite.com/customize-trip",
  },
  twitter: { card: "summary_large_image", title: "Custom Sri Lanka Tours | Drimooria" },
};
```

### Package listing (`/packages`)

```ts
// src/app/packages/layout.tsx or page.tsx
export const metadata = {
  title: "Sri Lanka Tour Packages | Multi-Day Tours & Safaris | Drimooria",
  description: "Browse Sri Lanka tour packages: wildlife safaris, beach tours, cultural trips. 5–14 day itineraries with private driver. Book now.",
  openGraph: {
    title: "Sri Lanka Tour Packages | Multi-Day Tours & Safaris",
    url: "https://yoursite.com/packages",
  },
  twitter: { card: "summary_large_image", title: "Sri Lanka Tour Packages | Drimooria" },
};
```

### Transfer: Colombo Airport → Galle (`/transfers/colombo-airport-galle`)

```ts
title: "Colombo Airport to Galle: Private Driver Transfer | Drimooria"
description: "Private driver transfer from Colombo Airport to Galle. Fixed price, no hidden fees. English-speaking driver. Book your transfer now."
```

### Blog / FAQ pages

| Page | Title (~60 chars) | Description (~155) |
|------|-------------------|--------------------|
| `/blog/private-driver-cost` | How Much Does a Private Driver Cost in Sri Lanka? (2026) | Clear guide to private driver costs in Sri Lanka: daily rates, what's included, and how to avoid hidden fees. |
| `/blog/10-day-trip-planner` | How to Plan a 10-Day Trip to Sri Lanka: Complete Guide | Step-by-step 10-day Sri Lanka itinerary: Colombo, Kandy, Ella, Yala, Galle. Tips and booking links. |
| `/blog/driver-safety` | Is It Safe to Hire a Driver in Sri Lanka? Tourist Advice | Safety tips for hiring a private driver in Sri Lanka. Road conditions, female travellers, and what to expect. |
| `/blog/best-time-south-coast` | Best Time to Visit Sri Lanka's South Coast | Weather guide for Sri Lanka's south coast. Best months for beach and when to avoid monsoon. |

---

## 4. SEO-friendly URL slugs

| Keyword / page | Suggested URL |
|----------------|----------------|
| Homepage | `/` |
| Tour packages | `/packages` |
| Custom tours | `/customize-trip` or `/custom-tours` |
| Car with driver | `/vehicles` or `/car-with-driver` |
| 14-day custom itinerary | `/packages/14-day-custom-itinerary` |
| Wildlife safari & beach | `/packages/wildlife-beach-safari` |
| December holidays | `/packages/december-holiday-tours` |
| English-speaking driver | `/vehicles` (filter) or `/drivers/english-speaking` |
| Colombo airport – Galle | `/transfers/colombo-airport-galle` |
| Van rental Colombo | `/vehicles/van-rental-colombo` or `/car-with-driver/van-rental` |
| Private driver cost (blog) | `/blog/private-driver-cost-sri-lanka` |
| 10-day trip planner (blog) | `/blog/10-day-sri-lanka-trip-planner` |
| Driver safety (blog) | `/blog/is-it-safe-hire-driver-sri-lanka` |
| Best time south coast (blog) | `/blog/best-time-sri-lanka-south-coast` |

---

## 5. H1 / H2 / H3 structure by page

### Homepage

- **H1:** Sri Lanka Tour Packages & Private Driver Hire  
- **H2:** Sri Lanka Tour Packages  
- **H2:** Car Rental with Driver in Sri Lanka  
- **H2:** Custom Sri Lanka Tours — Tailor-Made Itineraries  
- **H2:** Why Book With Us  
- **H3:** Multi-Day Private Tours  
- **H3:** English-Speaking Drivers  
- **H3:** Flexible Booking  

### Packages listing (`/packages`)

- **H1:** Sri Lanka Tour Packages  
- **H2:** Wildlife & Safari Tours  
- **H2:** Beach & Cultural Tours  
- **H2:** December Holiday Tours in Sri Lanka  
- **H2:** 14-Day Custom Sri Lanka Itineraries  

### Car rental / Vehicles (`/vehicles`)

- **H1:** Car Rental with Driver in Sri Lanka  
- **H2:** Private Driver Hire — How It Works  
- **H2:** Rent a Van with Driver in Colombo  
- **H2:** English-Speaking Drivers  
- **H2:** Transfers: Colombo Airport to Galle & More  
- **H3:** Daily Rates & What’s Included  
- **H3:** Safe & Reliable Drivers  

### Custom tours (`/customize-trip`)

- **H1:** Custom Sri Lanka Tours — Tailor-Made Holidays  
- **H2:** Plan Your Perfect Sri Lanka Itinerary  
- **H2:** Flexible Day-by-Day Itineraries  
- **H2:** Get Your Custom Quote  

### Transfer page (`/transfers/colombo-airport-galle`)

- **H1:** Private Driver: Colombo Airport to Galle  
- **H2:** Transfer Details & Duration  
- **H2:** Pricing (No Hidden Fees)  
- **H2:** Book Your Transfer  

### Blog / FAQ pages

- Use the target question as **H1** (e.g. “How Much Does a Private Driver Cost in Sri Lanka?”).  
- Use **H2** for main sections (e.g. Daily rates, What’s included, Tips).  
- Use **H3** for sub-sections where needed.  

---

## 6. Internal linking suggestions

- **Homepage** → `/packages`, `/vehicles`, `/customize-trip`, `/blog/10-day-trip-planner`, `/blog/private-driver-cost`.  
- **Packages** → `/customize-trip`, `/vehicles`, `/packages/14-day-custom-itinerary`, `/packages/wildlife-beach-safari`, `/packages/december-holiday-tours`.  
- **Vehicles / Car rental** → `/customize-trip`, `/transfers/colombo-airport-galle`, `/blog/driver-safety`, `/blog/private-driver-cost`, `/vehicles/van-rental-colombo`.  
- **Customize trip** → `/packages`, `/vehicles`, `/blog/10-day-trip-planner`.  
- **Transfer (Colombo–Galle)** → `/vehicles`, `/packages`, `/blog/private-driver-cost`.  
- **Blog (10-day planner)** → `/packages`, `/customize-trip`, `/vehicles`.  
- **Blog (driver cost)** → `/vehicles`, `/transfers/colombo-airport-galle`.  
- **Blog (driver safety)** → `/vehicles`, `/blog/private-driver-cost`.  
- **Blog (best time south coast)** → `/packages`, `/packages/wildlife-beach-safari`, `/transfers/colombo-airport-galle`.  

Use anchor text from the keyword list (e.g. “Sri Lanka tour packages”, “car rental with driver”, “private driver from Colombo airport to Galle”).  

---

## 7. FAQ questions per page (for FAQ schema & content)

### Homepage

- What types of Sri Lanka tours do you offer?  
- Do you offer car rental with a private driver?  
- Can I get a custom Sri Lanka itinerary?  

### Packages

- How many days do Sri Lanka tour packages usually last?  
- Do packages include a private driver?  
- What’s included in a wildlife safari and beach tour?  

### Vehicles / Car rental

- How much does a private driver cost in Sri Lanka?  
- Is it safe to hire a driver in Sri Lanka?  
- Can I hire an English-speaking driver?  
- Do you offer van rental with driver in Colombo?  

### Custom tours

- How do custom Sri Lanka tours work?  
- Can I plan a 14-day custom Sri Lanka itinerary?  
- How long does it take to get a tailor-made quote?  

### Transfer (Colombo–Galle)

- How long is the transfer from Colombo Airport to Galle?  
- Is the price per person or per vehicle?  
- Are tolls included?  

### Blog (driver cost)

- How much does a private driver cost in Sri Lanka?  
- What’s included in the daily rate?  
- Are there hidden fees?  

### Blog (10-day planner)

- How to plan a 10-day trip to Sri Lanka?  
- What’s the best 10-day Sri Lanka route?  
- Do I need a private driver for 10 days?  

### Blog (driver safety)

- Is it safe to hire a driver in Sri Lanka?  
- What about road safety and female travellers?  

### Blog (best time south coast)

- Best time to visit Sri Lanka’s south coast?  
- When is the monsoon on the south coast?  

---

## 8. Structured data (JSON-LD) examples

### TravelAgency (site-wide or homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Drimooria Travels",
  "description": "Sri Lanka tour packages, custom itineraries, and car rental with private driver. Tailor-made holidays and multi-day tours.",
  "url": "https://yoursite.com",
  "areaServed": { "@type": "Country", "name": "Sri Lanka" },
  "serviceType": ["Tour packages", "Car rental with driver", "Custom tours", "Private transfers"],
  "priceRange": "$$",
  "address": { "@type": "PostalAddress", "addressCountry": "LK" }
}
```

### TouristTrip (package/tour page)

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Sri Lanka Wildlife Safari & Beach Tour",
  "description": "Multi-day wildlife safari and south coast beach tour with private driver.",
  "url": "https://yoursite.com/packages/wildlife-beach-safari",
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "Place", "name": "Yala National Park" },
      { "@type": "Place", "name": "South Coast Beaches" }
    ]
  },
  "provider": { "@type": "TravelAgency", "name": "Drimooria Travels" },
  "offers": { "@type": "Offer", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
}
```

### Product (car/vehicle rental)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Car Rental with Driver in Sri Lanka",
  "description": "Private driver and car rental for tours and transfers. English-speaking drivers.",
  "brand": { "@type": "Brand", "name": "Drimooria Travels" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "50",
    "highPrice": "150",
    "offerCount": "1"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "120"
  }
}
```

### FAQPage (for FAQ sections)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a private driver cost in Sri Lanka?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily rates typically range from $50–$150 depending on vehicle and route. Our rates include driver, fuel, and tolls."
      }
    },
    {
      "@type": "Question",
      "name": "Is it safe to hire a driver in Sri Lanka?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We work with vetted, licensed drivers. Many tourists hire private drivers for flexibility and safety."
      }
    }
  ]
}
```

---

## 9. Missing keyword opportunities & long-tail ideas

- **Colombo airport transfer** — “Colombo airport pickup”, “CMB airport to hotel”.  
- **Kandy, Ella, Sigiriya** — “Kandy to Ella driver”, “Sigiriya day trip from Colombo”, “Ella train and driver”.  
- **Yala safari** — “Yala safari tour with driver”, “Yala national park tour from Colombo”.  
- **Galle, Negombo** — “Galle to Negombo transfer”, “Negombo to Kandy private driver”.  
- **Honeymoon** — “Sri Lanka honeymoon package with driver”, “honeymoon tour Sri Lanka”.  
- **Family** — “Family tour Sri Lanka with private driver”, “van rental Sri Lanka family”.  
- **Long-tail:** “7 day Sri Lanka itinerary with private driver”, “best car rental with driver Colombo”, “English speaking chauffeur Sri Lanka”, “tailor made Sri Lanka tour 10 days”.  

---

## 10. Summary table (page → keyword → metadata → URL → headings)

| Page | Keyword | Priority | Title (metadata) | URL | H1 |
|------|---------|----------|------------------|-----|-----|
| Homepage | Sri Lanka tour packages, travel agency | High | Sri Lanka Tour Packages & Private Driver Hire \| Drimooria | `/` | Sri Lanka Tour Packages & Private Driver Hire |
| Vehicles | Car rental with driver, private driver | High | Car Rental with Driver Sri Lanka \| Private Driver Hire \| Drimooria | `/vehicles` | Car Rental with Driver in Sri Lanka |
| Customize trip | Custom tours, tailor made holidays | Medium | Custom Sri Lanka Tours \| Tailor-Made Itineraries \| Drimooria | `/customize-trip` | Custom Sri Lanka Tours — Tailor-Made Holidays |
| Packages | Tour packages | High | Sri Lanka Tour Packages \| Multi-Day Tours & Safaris \| Drimooria | `/packages` | Sri Lanka Tour Packages |
| Package landing | 14 day custom itinerary | Medium | 14-Day Custom Sri Lanka Itinerary & Private Driver \| Drimooria | `/packages/14-day-custom-itinerary` | 14-Day Custom Sri Lanka Itinerary |
| Package landing | Wildlife safari and beach | Low | Sri Lanka Wildlife Safari & Beach Tour Package \| Drimooria | `/packages/wildlife-beach-safari` | Sri Lanka Wildlife Safari & Beach Tour |
| Seasonal | December holiday tours | Medium | December Holiday Tours in Sri Lanka \| Winter Packages \| Drimooria | `/packages/december-holiday-tours` | December Holiday Tours in Sri Lanka |
| Transfer | Colombo airport to Galle | Medium | Colombo Airport to Galle: Private Driver Transfer \| Drimooria | `/transfers/colombo-airport-galle` | Private Driver: Colombo Airport to Galle |
| Vehicle sub | Van with driver Colombo | Low | Rent a Van with Driver in Colombo \| Group Tours \| Drimooria | `/vehicles/van-rental-colombo` | Rent a Van with Driver in Colombo |
| Blog | Private driver cost | Low | How Much Does a Private Driver Cost in Sri Lanka? (2026) | `/blog/private-driver-cost-sri-lanka` | How Much Does a Private Driver Cost in Sri Lanka? |
| Blog | 10 day trip plan | Medium | How to Plan a 10-Day Trip to Sri Lanka: Complete Guide | `/blog/10-day-trip-planner` | How to Plan a 10-Day Trip to Sri Lanka |
| Blog | Driver safety | Low | Is It Safe to Hire a Driver in Sri Lanka? Tourist Advice | `/blog/driver-safety` | Is It Safe to Hire a Driver in Sri Lanka? |
| Blog | Best time south coast | Medium | Best Time to Visit Sri Lanka's South Coast \| Weather Guide | `/blog/best-time-south-coast` | Best Time to Visit Sri Lanka's South Coast |

Use this table to drive `generateMetadata()`, route structure, and H1/H2 content in your Next.js app.
