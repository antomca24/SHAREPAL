import data from "@/data/product-list.json";

export type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag: string;
  per_day_rent: number;
  out_of_stock: boolean;
};

export const products: Product[] = data.products;

export const CATEGORIES = [
  { id: "ps5", label: "PS5 Console" },
  { id: "fc", label: "EA FC" },
  { id: "games", label: "Game Bundles" },
  { id: "accessories", label: "Accessories" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

// The data has no category field, so products are grouped by their name.
export function categoryOf(product: Product): CategoryId {
  const { name } = product;
  if (/FC\d\d/.test(name)) return "fc";
  if (/Portal|Racing Wheel/.test(name)) return "accessories";
  if (name.includes("(Digital Game)")) return "games";
  return "ps5";
}

const rupees = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export function formatRupees(amount: number) {
  return `₹${rupees.format(amount)}`;
}
