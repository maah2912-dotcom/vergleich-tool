import { createClient } from "@supabase/supabase-js";
import type { Product, Budget, Ecosystem, UseCase } from "./types";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function mapRowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    brand: row.brand as string,
    price: row.price as number,
    budget: row.budget as Budget,
    ecosystem: row.ecosystem as Ecosystem,
    useCases: (row.use_cases as string[]) as UseCase[],
    battery: row.battery as number,
    sport: row.sport as number,
    sound: row.sound as number,
    anc: row.anc as number,
    mic: row.mic as number,
    comfort: row.comfort as number,
    note: row.note as string,
    why: row.why as string,
    category: row.category as string,
  };
}
