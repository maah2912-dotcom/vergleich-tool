"use client";

import { useState, useMemo, useEffect, createContext, useContext } from "react";
import { scoreProduct, PRICE_CAPS } from "@/lib/products";
import { translations, type Lang } from "@/lib/i18n";
import type { Product, Category, UseCase, Budget, Ecosystem, ScoreKey } from "@/lib/types";
import AffiliateDisclosure from "./AffiliateDisclosure";

// ─── Contexts ──────────────────────────────────────────────────────────────────

const LangCtx = createContext<Lang>("de");
function useLang() {
  return translations[useContext(LangCtx)];
}

const ProductsCtx = createContext<Product[]>([]);

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getCategoryName(category: Category, lang: Lang): string {
  if (lang === "de") return category.nameDe;
  if (lang === "en") return category.nameEn;
  return category.nameFr;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const scoreKeys: ScoreKey[] = ["sound", "anc", "battery", "sport", "mic", "comfort"];

const scoreGradients = [
  "from-blue-500 to-blue-400",
  "from-indigo-500 to-indigo-400",
  "from-violet-500 to-violet-400",
  "from-pink-500 to-pink-400",
  "from-orange-500 to-orange-400",
  "from-teal-500 to-teal-400",
];

const budgetBadgeColors: Record<Budget, { bg: string; text: string }> = {
  budget: { bg: "bg-emerald-50", text: "text-emerald-700" },
  mid: { bg: "bg-amber-50", text: "text-amber-700" },
  premium: { bg: "bg-violet-50", text: "text-violet-700" },
};

const ecosystemIcon: Record<Ecosystem, string> = {
  apple: "",
  android: "🤖",
  universal: "🌐",
};

const useCaseIcon: Record<UseCase, string> = {
  sport: "🏃",
  office: "💻",
  travel: "✈️",
  casual: "🎵",
  calls: "📞",
};

const rankMeta = [
  {
    emoji: "🥇",
    card: "border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm shadow-amber-100",
    badge: "bg-amber-100 text-amber-700",
    rank: "text-amber-600",
  },
  {
    emoji: "🥈",
    card: "border-slate-200 bg-gradient-to-br from-slate-50 to-white",
    badge: "bg-slate-100 text-slate-600",
    rank: "text-slate-500",
  },
  {
    emoji: "🥉",
    card: "border-orange-100 bg-gradient-to-br from-orange-50/40 to-white",
    badge: "bg-orange-100 text-orange-600",
    rank: "text-orange-500",
  },
];

// ─── Affiliate button ──────────────────────────────────────────────────────────

function AffiliateButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
    >
      Preis auf Amazon prüfen →
    </a>
  );
}

// ─── Shared components ─────────────────────────────────────────────────────────

function ScoreBar({
  label,
  value,
  gradient = "from-blue-500 to-blue-400",
}: {
  label: string;
  value: number;
  gradient?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500 font-medium">{label}</span>
        <span className="text-xs font-semibold text-slate-700 tabular-nums">
          {value}
          <span className="text-slate-400 font-normal">/10</span>
        </span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}

function Badge({ product }: { product: Product }) {
  const t = useLang();
  const colors = budgetBadgeColors[product.budget];
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
    >
      {t.budgetBadge[product.budget]}
    </span>
  );
}

function ResultCard({
  product,
  score,
  idx,
}: {
  product: Product;
  score: number;
  idx: number;
}) {
  const t = useLang();
  const meta = rankMeta[idx];
  return (
    <div className={`rounded-2xl border-2 p-5 transition-all ${meta.card}`}>
      <div className="flex items-center justify-between mb-4">
        <div
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${meta.badge}`}
        >
          <span>{meta.emoji}</span>
          <span>{t.rankLabels[idx]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`text-xs font-semibold uppercase tracking-wide ${meta.rank}`}>
            {t.scoreShort}
          </div>
          <div className={`text-lg font-bold tabular-nums ${meta.rank}`}>{score}</div>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="font-bold text-slate-900 text-lg leading-tight">{product.name}</div>
          <div className="text-sm text-slate-400 mt-0.5">{product.brand}</div>
        </div>
        <div className="text-right shrink-0">
          <Badge product={product} />
        </div>
      </div>
      <div className="rounded-xl bg-white/70 border border-slate-100 px-3.5 py-2.5 mb-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
          {t.whyLabel}
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{product.note}</p>
      </div>
      {product.affiliate_url && (
        <div className="mb-4">
          <AffiliateButton url={product.affiliate_url} />
        </div>
      )}
      <div className="grid grid-cols-3 gap-x-5 gap-y-2.5">
        {(["sound", "anc", "battery"] as ScoreKey[]).map((k, i) => (
          <ScoreBar key={k} label={t.scoreLabel[k]} value={product[k]} gradient={scoreGradients[i]} />
        ))}
      </div>
    </div>
  );
}

// ─── Finder Tab ────────────────────────────────────────────────────────────────

const STEPS = 4;

interface FinderState {
  budget: Budget | "any";
  brand: string | "any";
  useCases: UseCase[];
  priorities: ScoreKey[];
}

function FinderTab() {
  const t = useLang();
  const allProducts = useContext(ProductsCtx);

  const brands = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand))].sort(),
    [allProducts]
  );

  const [step, setStep] = useState(0);
  const [state, setState] = useState<FinderState>({
    budget: "any",
    brand: "any",
    useCases: [],
    priorities: [],
  });
  const [done, setDone] = useState(false);
  const [contradictionsSeen, setContradictionsSeen] = useState(0);

  const budgetIndex = useMemo(
    () => (state.budget === "budget" ? 0 : state.budget === "mid" ? 1 : null),
    [state.budget]
  );

  const priceCap = useMemo(
    () => (budgetIndex === null ? Infinity : (PRICE_CAPS[budgetIndex] ?? Infinity)),
    [budgetIndex]
  );

  const ranked = useMemo(() => {
    if (!done) return [];
    return [...allProducts]
      .map((p) => {
        if (state.brand !== "any" && p.brand !== state.brand) return null;
        const score = scoreProduct(p, {
          budget: budgetIndex,
          ecosystem: null,
          useCases: state.useCases,
          priorities: state.priorities,
        });
        if (score === null) return null;
        return { product: p, score };
      })
      .filter((r): r is { product: Product; score: number } => r !== null)
      .sort((a, b) => b.score - a.score);
  }, [done, allProducts, state, budgetIndex]);

  const isContradiction = useMemo(() => {
    if (!done || state.brand === "any") return false;
    return !allProducts.some((p) => p.price <= priceCap && p.brand === state.brand);
  }, [done, allProducts, state.brand, priceCap]);

  const cheapestBrandProduct = useMemo(() => {
    if (!isContradiction || state.brand === "any") return null;
    return (
      allProducts.filter((p) => p.brand === state.brand).sort((a, b) => a.price - b.price)[0] ??
      null
    );
  }, [isContradiction, allProducts, state.brand]);

  function toggleUseCase(uc: UseCase) {
    setState((s) => ({
      ...s,
      useCases: s.useCases.includes(uc) ? s.useCases.filter((u) => u !== uc) : [...s.useCases, uc],
    }));
  }

  function togglePriority(p: ScoreKey) {
    setState((s) => ({
      ...s,
      priorities: s.priorities.includes(p)
        ? s.priorities.filter((x) => x !== p)
        : s.priorities.length < 3
          ? [...s.priorities, p]
          : s.priorities,
    }));
  }

  function reset() {
    setStep(0);
    setDone(false);
    setState({ budget: "any", brand: "any", useCases: [], priorities: [] });
  }

  function retryAfterContradiction() {
    setContradictionsSeen((c) => c + 1);
    reset();
  }

  if (done) {
    const budgetCapLabel =
      state.budget === "budget" ? "€100" : state.budget === "mid" ? "€200" : null;
    const displayBrand = state.brand !== "any" ? state.brand : "";

    if (isContradiction && cheapestBrandProduct) {
      const gap = cheapestBrandProduct.price - (priceCap === Infinity ? 0 : priceCap);

      return (
        <div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            {t.restart}
          </button>

          {contradictionsSeen === 0 ? (
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 mb-6 text-center">
              <div className="text-5xl mb-3">🤔</div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">{t.contradiction1Title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-1">
                {t.cheapestModelPrefix}{" "}
                <span className="font-semibold">{displayBrand}</span>
                {budgetCapLabel && <> {t.aboveYourBudget(gap)}</>}
              </p>
              {cheapestBrandProduct.affiliate_url && (
                <div className="mb-3">
                  <AffiliateButton url={cheapestBrandProduct.affiliate_url} />
                </div>
              )}
              <p className="text-sm text-slate-500 mb-5">{t.contradiction1Sub}</p>
              <button
                onClick={retryAfterContradiction}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 active:scale-[0.98] transition-all"
              >
                {t.retryBtn}
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 mb-6">
              <div className="text-4xl mb-3 text-center">😅</div>
              <blockquote className="text-sm italic text-slate-600 leading-relaxed border-l-4 border-slate-300 pl-4 mb-3">
                {t.einsteinQuote}
              </blockquote>
              <p className="text-xs text-slate-400 text-right mb-5">— Albert Einstein</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {t.contradiction2Line1(displayBrand, cheapestBrandProduct.price)}
                {budgetCapLabel && <> {t.contradiction2Line2(budgetCapLabel, gap)}</>}
              </p>
              <button
                onClick={retryAfterContradiction}
                className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                {t.adjustBudget}
              </button>
            </div>
          )}

          {ranked.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {t.bestAlt}
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <ResultCard product={ranked[0].product} score={ranked[0].score} idx={0} />
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          {t.restart}
        </button>
        <h2 className="text-xl font-semibold text-slate-900 mb-1">{t.top3Title}</h2>
        <p className="text-sm text-slate-500 mb-6">{t.top3Sub}</p>
        <div className="space-y-3">
          {ranked.slice(0, 3).map(({ product, score }, idx) => (
            <ResultCard key={product.id} product={product} score={score} idx={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div key={i} className="flex-1">
            <div
              className={`h-1 rounded-full transition-all duration-300 ${
                i <= step ? "bg-blue-500" : "bg-slate-100"
              }`}
            />
          </div>
        ))}
        <span className="text-xs font-medium text-slate-400 shrink-0 tabular-nums">
          {step + 1}/{STEPS}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 mb-1">{t.steps[step].title}</h2>
      <p className="text-sm text-slate-500 mb-6">{t.steps[step].sub}</p>

      {/* Step 0 – Budget */}
      {step === 0 && (
        <div className="space-y-2.5">
          {(["budget", "mid", "any"] as const).map((b) => {
            const active = state.budget === b;
            return (
              <button
                key={b}
                onClick={() => setState((s) => ({ ...s, budget: b }))}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all flex items-center justify-between ${
                  active
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="font-medium text-sm">{t.budgetLabel[b]}</span>
                {active && <span className="text-blue-500 text-base">✓</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Step 1 – Brand (derived from products) */}
      {step === 1 && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-3 gap-2.5">
            {brands.map((brand) => {
              const active = state.brand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => setState((s) => ({ ...s, brand }))}
                  className={`relative px-3 py-4 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    active
                      ? "border-blue-500 bg-blue-50 text-blue-800"
                      : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {active && (
                    <span className="absolute top-1.5 right-1.5 text-blue-500 text-xs font-bold">
                      ✓
                    </span>
                  )}
                  <span className="text-xs font-semibold leading-tight">{brand}</span>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setState((s) => ({ ...s, brand: "any" }))}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between ${
              state.brand === "any"
                ? "border-blue-500 bg-blue-50 text-blue-800"
                : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span className="font-medium text-sm">{t.allBrands}</span>
            {state.brand === "any" && <span className="text-blue-500 text-base">✓</span>}
          </button>
        </div>
      )}

      {/* Step 2 – Use cases */}
      {step === 2 && (
        <div className="grid grid-cols-2 gap-2.5">
          {(Object.keys(useCaseIcon) as UseCase[]).map((uc) => {
            const active = state.useCases.includes(uc);
            return (
              <button
                key={uc}
                onClick={() => toggleUseCase(uc)}
                className={`relative px-4 py-4 rounded-xl border-2 text-left transition-all ${
                  active
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {active && (
                  <span className="absolute top-2 right-2 text-blue-500 text-xs font-bold">✓</span>
                )}
                <div className="text-xl mb-1.5">{useCaseIcon[uc]}</div>
                <div className="text-xs font-semibold leading-tight">{t.useCaseLabel[uc]}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 3 – Priorities */}
      {step === 3 && (
        <div className="grid grid-cols-2 gap-2.5">
          {scoreKeys.map((p) => {
            const rank = state.priorities.indexOf(p);
            const active = rank >= 0;
            const locked = !active && state.priorities.length >= 3;
            return (
              <button
                key={p}
                onClick={() => togglePriority(p)}
                disabled={locked}
                className={`relative px-4 py-4 rounded-xl border-2 text-left transition-all ${
                  active
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : locked
                      ? "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed"
                      : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {active && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                    {rank + 1}
                  </span>
                )}
                <div className="text-sm font-semibold mt-1">{t.scoreLabel[p]}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="px-5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            {t.back}
          </button>
        )}
        <button
          onClick={() => {
            if (step < STEPS - 1) setStep((s) => s + 1);
            else setDone(true);
          }}
          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-sm shadow-blue-200"
        >
          {step < STEPS - 1 ? t.next : t.showResults}
        </button>
      </div>
    </div>
  );
}

// ─── Vergleich Tab ─────────────────────────────────────────────────────────────

function ProductSelect({
  value,
  onChange,
  excludeIds,
}: {
  value: string;
  onChange: (id: string) => void;
  excludeIds: string[];
}) {
  const allProducts = useContext(ProductsCtx);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-xs border-2 border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-700 font-semibold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
    >
      {allProducts
        .filter((p) => !excludeIds.includes(p.id))
        .map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
    </select>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-3">
      <div className="flex-1 h-px bg-slate-100" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function GoldenCircleColumn({ product }: { product: Product }) {
  const t = useLang();
  const howKeys: ScoreKey[] = ["anc", "comfort", "battery", "sound"];
  const howGradients = [
    "from-indigo-500 to-indigo-400",
    "from-teal-500 to-teal-400",
    "from-orange-500 to-orange-400",
    "from-blue-500 to-blue-400",
  ];

  return (
    <div className="flex flex-col min-w-0">
      <div className="text-center mb-1 px-1">
        <div className="font-bold text-slate-900 text-sm leading-snug">{product.name}</div>
        <div className="text-xs text-slate-400 mt-0.5">{product.brand}</div>
      </div>

      <SectionLabel label={t.goldenWhy} />
      <div className="px-1 pb-1">
        <p className="text-sm font-semibold text-slate-800 leading-snug">{product.why}</p>
      </div>

      <SectionLabel label={t.goldenHow} />
      <div className="px-1 space-y-3">
        {howKeys.map((k, i) => (
          <ScoreBar key={k} label={t.scoreLabel[k]} value={product[k]} gradient={howGradients[i]} />
        ))}
      </div>

      <SectionLabel label={t.goldenWhat} />
      <div className="px-1 space-y-3">
        <div>
          <Badge product={product} />
          {product.affiliate_url && (
            <div className="mt-2">
              <AffiliateButton url={product.affiliate_url} />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {product.useCases.map((uc) => (
            <span
              key={uc}
              className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full"
            >
              {useCaseIcon[uc]} {t.useCaseLabel[uc]}
            </span>
          ))}
          <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
            {ecosystemIcon[product.ecosystem]} {t.ecosystemLabel[product.ecosystem]}
          </span>
        </div>
      </div>
    </div>
  );
}

function VergleichTab() {
  const allProducts = useContext(ProductsCtx);

  // Lazy init from context so first render uses server-fetched products
  const [col1, setCol1] = useState(() => allProducts[0]?.id ?? "");
  const [col2, setCol2] = useState(() => allProducts[1]?.id ?? "");
  const [col3, setCol3] = useState(() => allProducts[2]?.id ?? "");

  const p1 = allProducts.find((p) => p.id === col1) ?? allProducts[0];
  const p2 = allProducts.find((p) => p.id === col2) ?? allProducts[1];
  const p3 = allProducts.find((p) => p.id === col3) ?? allProducts[2];

  if (!p1 || !p2 || !p3) {
    return (
      <div className="text-center py-12 text-sm text-slate-400">
        Mindestens 3 Produkte erforderlich.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5 mb-8">
        <ProductSelect value={col1} onChange={setCol1} excludeIds={[col2, col3]} />
        <ProductSelect value={col2} onChange={setCol2} excludeIds={[col1, col3]} />
        <ProductSelect value={col3} onChange={setCol3} excludeIds={[col1, col2]} />
      </div>

      <div className="grid grid-cols-3 divide-x divide-slate-100">
        {[p1, p2, p3].map((product, i) => (
          <div key={product.id} className={i === 0 ? "pr-5" : i === 1 ? "px-5" : "pl-5"}>
            <GoldenCircleColumn product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Produkte Tab ──────────────────────────────────────────────────────────────

const PAGE_SIZE = 9;

function ProdukteTab({
  view,
  setView,
}: {
  view: "list" | "grid3";
  setView: (v: "list" | "grid3") => void;
}) {
  const t = useLang();
  const allProducts = useContext(ProductsCtx);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.useCases.some((uc) => t.useCaseLabel[uc].toLowerCase().includes(q))
    );
  }, [search, allProducts, t]);

  useEffect(() => { setPage(0); }, [search, view]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(
    () => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filtered, page]
  );

  const toggleBtn = (active: boolean) =>
    `p-1.5 rounded-lg transition-all ${active ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-700"}`;

  return (
    <div>
      {/* Search + View toggle */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="search"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 shrink-0 border-2 border-slate-200 rounded-xl p-1">
          {/* List */}
          <button onClick={() => setView("list")} title="Liste" className={toggleBtn(view === "list")}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="0" y="1"  width="14" height="2" rx="1" fill="currentColor"/>
              <rect x="0" y="6"  width="14" height="2" rx="1" fill="currentColor"/>
              <rect x="0" y="11" width="14" height="2" rx="1" fill="currentColor"/>
            </svg>
          </button>
          {/* 3-col — desktop only */}
          <button onClick={() => setView("grid3")} title="3 Spalten" className={`hidden sm:block ${toggleBtn(view === "grid3")}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="0"   y="0" width="3.5" height="6" rx="0.5" fill="currentColor"/>
              <rect x="5.2" y="0" width="3.5" height="6" rx="0.5" fill="currentColor"/>
              <rect x="10.5" y="0" width="3.5" height="6" rx="0.5" fill="currentColor"/>
              <rect x="0"   y="8" width="3.5" height="6" rx="0.5" fill="currentColor"/>
              <rect x="5.2" y="8" width="3.5" height="6" rx="0.5" fill="currentColor"/>
              <rect x="10.5" y="8" width="3.5" height="6" rx="0.5" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-3xl mb-2">🔇</div>
          <p className="text-sm text-slate-400">{t.noProducts}</p>
        </div>
      )}

      {/* Product cards */}
      <div className={view === "list" ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-3 gap-4"}>
        {paginated.map((p) =>
          view === "list" ? (
            // ── List card ──────────────────────────────────────────────────
            <div
              key={p.id}
              className="rounded-2xl border-2 border-slate-100 bg-white p-5 hover:border-slate-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-semibold text-slate-900 text-base leading-snug">{p.name}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{p.brand}</div>
                </div>
                <div className="shrink-0">
                  <Badge product={p} />
                </div>
              </div>
              {p.affiliate_url && (
                <div className="mb-3">
                  <AffiliateButton url={p.affiliate_url} />
                </div>
              )}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.useCases.map((uc) => (
                  <span key={uc} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {useCaseIcon[uc]} {t.useCaseLabel[uc]}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
                  {ecosystemIcon[p.ecosystem]} {t.ecosystemLabel[p.ecosystem]}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-x-5 gap-y-3">
                {scoreKeys.map((k, idx) => (
                  <ScoreBar key={k} label={t.scoreLabel[k]} value={p[k]} gradient={scoreGradients[idx]} />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100 leading-relaxed">
                {p.note}
              </p>
            </div>
          ) : (
            // ── 3-col card: alles sichtbar ─────────────────────────────────
            <div
              key={p.id}
              className="rounded-2xl border-2 border-slate-100 bg-white p-5 hover:border-slate-200 hover:shadow-sm transition-all flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 text-sm leading-snug">{p.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{p.brand}</div>
                </div>
                <div className="shrink-0">
                  <Badge product={p} />
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.useCases.map((uc) => (
                  <span key={uc} className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                    {useCaseIcon[uc]} {t.useCaseLabel[uc]}
                  </span>
                ))}
                <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                  {ecosystemIcon[p.ecosystem]} {t.ecosystemLabel[p.ecosystem]}
                </span>
              </div>
              <div className="space-y-2.5 mb-3">
                {scoreKeys.map((k, idx) => (
                  <ScoreBar key={k} label={t.scoreLabel[k]} value={p[k]} gradient={scoreGradients[idx]} />
                ))}
              </div>
              <p className="text-xs text-slate-500 pt-3 border-t border-slate-100 leading-relaxed mb-3">
                {p.note}
              </p>
              {p.affiliate_url && <AffiliateButton url={p.affiliate_url} />}
            </div>
          )
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="px-4 py-2 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Zurück
          </button>
          <span className="text-xs font-medium text-slate-400 tabular-nums">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}
            className="px-4 py-2 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Weiter →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── App Content ───────────────────────────────────────────────────────────────

type Tab = "finder" | "vergleich" | "produkte";

function AppContent({
  lang,
  setLang,
  category,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  category: Category;
}) {
  const t = useLang();
  const allProducts = useContext(ProductsCtx);
  const [active, setActive] = useState<Tab>("finder");
  const [view, setView] = useState<"list" | "grid3">("list");

  const tabItems: { id: Tab; label: string; icon: string }[] = [
    { id: "finder", label: t.tabs.finder, icon: "🎯" },
    { id: "vergleich", label: t.tabs.vergleich, icon: "⚖️" },
    { id: "produkte", label: t.tabs.produkte, icon: "📋" },
  ];

  const categoryName = getCategoryName(category, lang);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-slate-900 px-4 pt-8 pb-9">
        <div className="max-w-lg mx-auto">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
              {t.heroTitle}
              <br />
              <span className="text-blue-400">{categoryName}.</span>
            </h1>
            {/* Language switcher */}
            <div className="flex items-center gap-0.5 shrink-0 mt-1">
              {(["de", "en", "fr"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all uppercase tracking-wide ${
                    lang === l
                      ? "bg-white/15 text-white"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm font-medium text-slate-400 tracking-wide mb-4">{t.heroSub}</p>
          <div className="inline-flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <span className="w-1 h-1 rounded-full inline-block bg-emerald-500" />
            {t.heroSync(allProducts.length)}
          </div>
        </div>
      </div>

      {/* Sticky tab bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5">
        <div className="max-w-lg mx-auto flex gap-1 bg-slate-100 rounded-xl p-1">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                active === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className={`mx-auto px-4 py-8 pb-24 transition-all duration-300 ${
          active === "vergleich"
            ? "max-w-4xl"
            : active === "produkte" && view === "grid3"
              ? "max-w-6xl"
              : "max-w-lg"
        }`}
      >
        <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
          <div className={active !== "finder" ? "hidden" : ""}>
            <FinderTab />
          </div>
          <div className={active !== "vergleich" ? "hidden" : ""}>
            <VergleichTab />
          </div>
          <div className={active !== "produkte" ? "hidden" : ""}>
            <ProdukteTab view={view} setView={setView} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function CategoryPageClient({
  initialProducts,
  category,
}: {
  initialProducts: Product[];
  category: Category;
}) {
  const [lang, setLang] = useState<Lang>("de");

  return (
    <LangCtx.Provider value={lang}>
      <ProductsCtx.Provider value={initialProducts}>
        <AppContent lang={lang} setLang={setLang} category={category} />
        <AffiliateDisclosure lang={lang} />
      </ProductsCtx.Provider>
    </LangCtx.Provider>
  );
}
