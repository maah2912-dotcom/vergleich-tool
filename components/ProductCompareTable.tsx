import { createClient } from "@supabase/supabase-js";

type Row = {
  id: string;
  name: string;
  brand: string;
  price: number;
  sound: number;
  anc: number;
  battery: number;
  sport: number;
  mic: number;
  comfort: number;
  affiliate_url: string | null;
  note: string;
};

const SCORE_ROWS: { key: keyof Row; label: string; gradient: string }[] = [
  { key: "sound", label: "Klang", gradient: "from-blue-500 to-blue-400" },
  { key: "anc", label: "ANC", gradient: "from-indigo-500 to-indigo-400" },
  { key: "battery", label: "Akku", gradient: "from-orange-500 to-orange-400" },
  { key: "sport", label: "Sport", gradient: "from-pink-500 to-pink-400" },
  { key: "mic", label: "Mikro", gradient: "from-violet-500 to-violet-400" },
  { key: "comfort", label: "Komfort", gradient: "from-teal-500 to-teal-400" },
];

function ScoreBar({ value, gradient }: { value: number; gradient: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[40px]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-700 tabular-nums shrink-0">
        {value}
        <span className="text-slate-400 font-normal">/10</span>
      </span>
    </div>
  );
}

async function fetchProducts(ids: string[]): Promise<Row[]> {
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

  const byId = new Map<string, Row>();
  for (const row of data as Row[]) byId.set(row.id, row);
  return ids.map((id) => byId.get(id)).filter((r): r is Row => Boolean(r));
}

export default async function ProductCompareTable({
  productIds,
}: {
  productIds: string[];
}) {
  const products = await fetchProducts(productIds);

  if (products.length === 0) {
    return (
      <div className="not-prose my-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        Vergleichstabelle konnte nicht geladen werden.
      </div>
    );
  }

  const labelWidth = "180px";

  return (
    <div className="not-prose my-8 rounded-2xl border-2 border-slate-100 bg-white overflow-x-auto">
      <table className="w-full text-sm" style={{ minWidth: `${180 + products.length * 180}px` }}>
        <colgroup>
          <col style={{ width: labelWidth }} />
          {products.map((p) => (
            <col key={p.id} />
          ))}
        </colgroup>
        <tbody>
          {/* Header: Name / Brand */}
          <tr className="border-b-2 border-slate-100">
            <th
              scope="row"
              className="text-left align-top px-4 py-4 text-xs font-bold uppercase tracking-widest text-slate-400"
            >
              Produkt
            </th>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-4 align-top">
                <div className="font-bold text-slate-900 text-base leading-tight">
                  {p.name}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{p.brand}</div>
              </td>
            ))}
          </tr>

          {/* Preis */}
          <tr className="border-b border-slate-100">
            <th
              scope="row"
              className="text-left px-4 py-3 text-xs font-semibold text-slate-500"
            >
              Preis
            </th>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-3">
                <span className="text-sm font-semibold text-slate-900 tabular-nums">
                  €{p.price}
                </span>
              </td>
            ))}
          </tr>

          {/* Score rows */}
          {SCORE_ROWS.map((row) => (
            <tr key={row.key} className="border-b border-slate-100">
              <th
                scope="row"
                className="text-left px-4 py-3 text-xs font-semibold text-slate-500"
              >
                {row.label}
              </th>
              {products.map((p) => (
                <td key={p.id} className="px-4 py-3">
                  <ScoreBar value={p[row.key] as number} gradient={row.gradient} />
                </td>
              ))}
            </tr>
          ))}

          {/* Amazon CTA */}
          <tr>
            <th
              scope="row"
              className="text-left px-4 py-4 text-xs font-semibold text-slate-500"
            >
              Bei Amazon
            </th>
            {products.map((p) => (
              <td key={p.id} className="px-4 py-4">
                {p.affiliate_url ? (
                  <a
                    href={p.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    Preis prüfen →
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">—</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
