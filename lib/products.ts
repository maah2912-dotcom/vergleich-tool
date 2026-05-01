import { supabase, mapRowToProduct } from "./supabase";
import type { Product, Ecosystem, UseCase, ScoreKey } from "./types";

export type { Product, Ecosystem, UseCase, ScoreKey };
export type { Budget } from "./types";

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug)
    .order("price");
  if (error || !data) return [];
  return data.map(mapRowToProduct);
}

// Price ceiling per budget index (0 = budget, 1 = mid; no cap for premium/any)
export const PRICE_CAPS: Record<number, number> = { 0: 100, 1: 200 };

export function scoreProduct(
  product: Product,
  weights: {
    budget: number | null;
    ecosystem: Ecosystem | null;
    useCases: UseCase[];
    priorities: ScoreKey[];
  }
): number | null {
  if (weights.budget !== null) {
    const cap = PRICE_CAPS[weights.budget];
    if (cap !== undefined && product.price > cap) return null;
  }

  let score = 0;

  score += 20;

  if (weights.ecosystem) {
    if (product.ecosystem === weights.ecosystem) score += 20;
    else if (product.ecosystem === "universal") score += 10;
  } else {
    score += 10;
  }

  const useCaseMatches = weights.useCases.filter((uc) =>
    product.useCases.includes(uc)
  ).length;
  score += (useCaseMatches / Math.max(weights.useCases.length, 1)) * 20;

  weights.priorities.forEach((p, idx) => {
    const weight = (weights.priorities.length - idx) * 2;
    score += (product[p] / 10) * weight;
  });

  return Math.round(score);
}
