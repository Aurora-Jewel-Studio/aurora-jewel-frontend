import { sdk } from "./medusa-client";

// Fetch all products from Medusa
export async function getProducts(limit = 20) {
  try {
    const { products } = await sdk.store.product.list({
      limit,
      fields: "id,title,handle,thumbnail,description,variants,variants.prices,images,categories",
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

// Fetch a single product by handle
export async function getProductByHandle(handle: string) {
  try {
    const { products } = await sdk.store.product.list({
      handle,
      fields: "+variants,+variants.prices,+images,+categories,+options,+options.values",
    });
    return products?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Fetch products by category name
export async function getProductsByCategory(categoryName: string, limit = 20) {
  try {
    // First, get the category by name
    const { product_categories } = await sdk.store.category.list({
      q: categoryName,
      fields: "id,name,description",
    });
    
    const category = product_categories?.find(
      (c: any) => c.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category) return { products: [], category: null };

    const { products } = await sdk.store.product.list({
      category_id: [category.id],
      limit,
      fields: "id,title,handle,thumbnail,description,variants,variants.prices,images,categories",
    });

    return { products, category };
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return { products: [], category: null };
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const { product_categories } = await sdk.store.category.list({
      fields: "id,name,description",
    });
    return product_categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// Format price from Medusa (amounts are in smallest unit)
export function formatPrice(amount: number, currencyCode: string = "npr") {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Get the cheapest price from a product's variants
export function getCheapestPrice(product: any, currencyCode: string = "npr") {
  const prices = product.variants
    ?.flatMap((v: any) => v.prices || [])
    ?.filter((p: any) => p.currency_code === currencyCode)
    ?.map((p: any) => p.amount) || [];

  if (prices.length === 0) return null;
  return Math.min(...prices);
}
