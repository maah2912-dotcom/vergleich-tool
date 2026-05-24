import { createClient } from "@supabase/supabase-js";
import ProductCompareTableView, {
  type CompareRow,
} from "./ProductCompareTableView";

async function fetchProducts(ids: string[]): Promise<CompareRow[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, brand, price, sound, anc, battery, sport, mic, comfort, affiliate_url, note"
    )
    .in("id", ids);

  if (error || !data) return [];

  const byId = new Map<string, CompareRow>();
  for (const row of data as CompareRow[]) byId.set(row.id, row);
  return ids.map((id) => byId.get(id)).filter((r): r is CompareRow => Boolean(r));
}

export default async function ProductCompareTable({
  productIds,
}: {
  productIds: string[];
}) {
  const products = await fetchProducts(productIds);
  return <ProductCompareTableView products={products} />;
}
