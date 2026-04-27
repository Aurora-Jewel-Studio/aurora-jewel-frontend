import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

// ---------- Product Types ----------
export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  options: Record<string, string>;
  prices: Record<string, number>;
}

export interface ProductOption {
  title: string;
  values: string[];
}

export interface ProductImage {
  url: string;
}

export interface Product {
  handle: string;
  title: string;
  description: string;
  category: string;
  weight: number;
  thumbnail: string;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

// ---------- Data Access ----------

const categories: Category[] = categoriesData as Category[];

// Helper to get base API URL
function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
}

export async function getProducts(limit = 20): Promise<Product[]> {
  try {
    const res = await fetch(`${getApiUrl()}/api/products`);
    if (!res.ok) return [];
    const data = await res.json();
    // The DB returns category_handle instead of category, map it
    return data.products.slice(0, limit).map((p: any) => ({
      ...p,
      category: p.category_handle
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const res = await fetch(`${getApiUrl()}/api/products/${handle}`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      ...data.product,
      category: data.product.category_handle
    };
  } catch (error) {
    console.error("Failed to fetch product by handle:", error);
    return null;
  }
}

export async function getProductsByCategory(categoryName: string): Promise<{
  products: Product[];
  category: Category | null;
}> {
  const category =
    categories.find(
      (c) => c.name.toLowerCase() === categoryName.toLowerCase()
    ) || null;

  try {
    const res = await fetch(`${getApiUrl()}/api/products`);
    if (!res.ok) return { products: [], category };
    const data = await res.json();
    
    const filtered = data.products
      .filter((p: any) => p.category_handle.toLowerCase() === categoryName.toLowerCase())
      .map((p: any) => ({
        ...p,
        category: p.category_handle
      }));

    return { products: filtered, category };
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return { products: [], category };
  }
}

export function getCategories(): Category[] {
  return categories;
}

export async function getAllProductHandles(): Promise<string[]> {
  try {
    const res = await fetch(`${getApiUrl()}/api/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products.map((p: any) => p.handle);
  } catch (error) {
    console.error("Failed to fetch all product handles:", error);
    return [];
  }
}

// ---------- Price Utilities ----------

export function formatPrice(
  amount: number,
  currencyCode: string = "npr"
): string {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCheapestPrice(
  product: Product,
  currencyCode: string = "npr"
): number | null {
  const prices = product.variants
    .map((v) => v.prices[currencyCode])
    .filter((p) => p !== undefined);

  if (prices.length === 0) return null;
  return Math.min(...prices);
}
