export const STORE_NAME = "Aurora Jewel Studio";

export const CATEGORIES = [
  { id: "drops", name: "Drops", description: "Necklaces" },
  { id: "nexus", name: "Nexus", description: "Bracelets" },
  { id: "essence", name: "Essence", description: "Rings" },
  { id: "sparkles", name: "Sparkles", description: "Earrings" },
  { id: "radiance", name: "Radiance", description: "Anklets" },
  { id: "emblem", name: "Emblem", description: "Coat Decoration" },
];

export const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Emerald Cascade",
    handle: "emerald-cascade",
    price: 125000,
    currency: "NPR",
    category: "Essence",
    image: "/images/collection-essence.png",
  },
  {
    id: "p2",
    name: "Golden Dew",
    handle: "golden-dew",
    price: 85000,
    currency: "NPR",
    category: "Drops",
    image: "/images/collection-drops.png",
  },
  {
    id: "p3",
    name: "Diamond Whisper",
    handle: "diamond-whisper",
    price: 150000,
    currency: "NPR",
    category: "Sparkles",
    image: "/images/collection-sparkles.png",
  },
  {
    id: "p4",
    name: "Verdant Link",
    handle: "verdant-link",
    price: 110000,
    currency: "NPR",
    category: "Nexus",
    image: "/images/collection-nexus.png",
  }
];
