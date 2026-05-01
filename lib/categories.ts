import { supabase } from "./supabase";
import type { Category } from "./types";

function mapRowToCategory(row: Record<string, unknown>): Category {
  return {
    slug: row.slug as string,
    nameDe: row.name_de as string,
    nameEn: row.name_en as string,
    nameFr: row.name_fr as string,
    descriptionDe: row.description_de as string,
    descriptionEn: row.description_en as string,
    descriptionFr: row.description_fr as string,
    icon: row.icon as string,
    active: row.active as boolean,
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("slug");
  if (error || !data) return [];
  return data.map(mapRowToCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  if (error || !data) return null;
  return mapRowToCategory(data);
}
