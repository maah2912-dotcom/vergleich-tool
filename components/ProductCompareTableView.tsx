"use client";

import { useInView } from "@/lib/useInView";

export type CompareRow = {
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

const SCORE_ROWS: { key: keyof CompareRow; label: string; gradient: string }[] = [
  { key: "sound", label: "Klang", gradient: "from-blue-500 to-blue-400" },
  { key: "anc", label: "ANC", gradient: "from-indigo-500 to-indigo-400" },
  { key: "battery", label: "Akku", gradient: "from-orange-500 to-orange-400" },
  { key: "sport", label: "Sport", gradient: "from-pink-500 to-pink-400" },
  { key: "mic", label: "Mikro", gradient: "from-violet-500 to-violet-400" },
  { key: "comfort", label: "Komfort", gradient: "from-teal-500 to-teal-400" },
];

function ScoreBar({ value, gradient }: { value: number; gradient: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="flex items-center gap-2.5">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[40px]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-[width] duration-700 ease-out`}
          style={{ width: inView ? `${value * 10}%` : "0%" }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-700 tabular-nums shrink-0">
        {value}
        <span className="text-slate-400 font-normal">/10</span>
      </span>
    </div>
  );
}

function AnimatedRow({
  index,
  tableInView,
  className,
  children,
}: {
  index: number;
  tableInView: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <tr
      style={{ transitionDelay: tableInView ? `${index * 60}ms` : "0ms" }}
      className={`transition-opacity duration-500 ease-out ${
        tableInView ? "opacity-100" : "opacity-0"
      } ${className ?? ""}`}
    >
      {children}
    </tr>
  );
}

export default function ProductCompareTableView({
  products,
}: {
  products: CompareRow[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  if (products.length === 0) {
    return (
      <div className="not-prose my-8 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        Vergleichstabelle konnte nicht geladen werden.
      </div>
    );
  }

  // Row ordering used for stagger: name(0), price(1), 6 scores(2-7), CTA(8)
  return (
    <div ref={ref} className="not-prose my-8 rounded-2xl border-2 border-slate-100 bg-white">
      <table className="w-full text-sm table-fixed">
        <colgroup>
          <col className="w-[96px] sm:w-[140px] md:w-[180px]" />
          {products.map((p) => (
            <col key={p.id} />
          ))}
        </colgroup>
        <tbody>
          {/* Header: Name / Brand */}
          <AnimatedRow
            index={0}
            tableInView={inView}
            className="border-b-2 border-slate-100"
          >
            <th
              scope="row"
              className="text-left align-top px-2 sm:px-4 py-3 sm:py-4 text-xs font-bold uppercase tracking-widest text-slate-400"
            >
              Produkt
            </th>
            {products.map((p) => (
              <td key={p.id} className="px-2 sm:px-4 py-3 sm:py-4 align-top">
                <div className="font-bold text-slate-900 text-sm sm:text-base leading-tight break-words">
                  {p.name}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 break-words">{p.brand}</div>
              </td>
            ))}
          </AnimatedRow>

          {/* Preis */}
          <AnimatedRow
            index={1}
            tableInView={inView}
            className="border-b border-slate-100"
          >
            <th
              scope="row"
              className="text-left px-2 sm:px-4 py-2.5 sm:py-3 text-xs font-semibold text-slate-500"
            >
              Preis
            </th>
            {products.map((p) => (
              <td key={p.id} className="px-2 sm:px-4 py-2.5 sm:py-3">
                <span className="text-sm font-semibold text-slate-900 tabular-nums">
                  €{p.price}
                </span>
              </td>
            ))}
          </AnimatedRow>

          {/* Score rows */}
          {SCORE_ROWS.map((row, i) => (
            <AnimatedRow
              key={row.key}
              index={i + 2}
              tableInView={inView}
              className="border-b border-slate-100"
            >
              <th
                scope="row"
                className="text-left px-2 sm:px-4 py-2.5 sm:py-3 text-xs font-semibold text-slate-500"
              >
                {row.label}
              </th>
              {products.map((p) => (
                <td key={p.id} className="px-2 sm:px-4 py-2.5 sm:py-3">
                  <ScoreBar value={p[row.key] as number} gradient={row.gradient} />
                </td>
              ))}
            </AnimatedRow>
          ))}

          {/* Amazon CTA */}
          <AnimatedRow index={SCORE_ROWS.length + 2} tableInView={inView}>
            <th
              scope="row"
              className="text-left px-2 sm:px-4 py-3 sm:py-4 text-xs font-semibold text-slate-500"
            >
              Bei Amazon
            </th>
            {products.map((p) => (
              <td key={p.id} className="px-2 sm:px-4 py-3 sm:py-4">
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
          </AnimatedRow>
        </tbody>
      </table>
    </div>
  );
}
