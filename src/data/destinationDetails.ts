import type { Destination } from "@/types/packages";

export type DestinationDetails = {
  imageUrl: string;
  description: string;
};

// Simple curated content for the accordion. Images use Picsum seeds so they always load.
export const destinationDetails: Record<Destination, DestinationDetails> = {
  Colombo: {
    imageUrl: "https://picsum.photos/seed/colombo/1200/800",
    description:
      "Sri Lanka’s commercial capital—great for city highlights, markets, coastal sunsets, and a smooth start/end point for your trip.",
  },
  Kandy: {
    imageUrl: "https://picsum.photos/seed/kandy/1200/800",
    description:
      "A cultural hill city known for the Temple of the Tooth and scenic lake views—perfect for heritage, local food, and relaxed evenings.",
  },
  Sigiriya: {
    imageUrl: "https://picsum.photos/seed/sigiriya/1200/800",
    description:
      "Home to the iconic Sigiriya Rock Fortress—expect panoramic viewpoints, ancient history, and nearby nature trails.",
  },
  Ella: {
    imageUrl: "https://picsum.photos/seed/ella/1200/800",
    description:
      "A laid-back mountain town with tea estates, hikes, and viewpoints—famous for scenic landscapes and cool weather.",
  },
  "Nuwara Eliya": {
    imageUrl: "https://picsum.photos/seed/nuwara-eliya/1200/800",
    description:
      "Tea country charm with misty mornings, colonial-era vibes, and lush plantations—ideal for calm scenic stops.",
  },
  Yala: {
    imageUrl: "https://picsum.photos/seed/yala/1200/800",
    description:
      "Sri Lanka’s top safari region—spot elephants, birds, and (with luck) leopards on guided game drives.",
  },
  Galle: {
    imageUrl: "https://picsum.photos/seed/galle/1200/800",
    description:
      "A coastal fort city with Dutch-colonial streets, cafés, and ocean views—great for photography and relaxed walks.",
  },
  Bentota: {
    imageUrl: "https://picsum.photos/seed/bentota/1200/800",
    description:
      "A beach destination for unwinding—enjoy calm sea days, river activities, and easy resort-style relaxation.",
  },
};

