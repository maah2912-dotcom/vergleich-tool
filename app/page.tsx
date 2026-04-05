"use client";

import { useState, useMemo } from "react";
import {
  products,
  scoreProduct,
  PRICE_CAPS,
  type Product,
  type Ecosystem,
  type UseCase,
  type Budget,
} from "@/lib/products";

// ─── Constants ─────────────────────────────────────────────────────────────────

const scoreLabel: Record<string, string> = {
  sound: "Sound",
  anc: "ANC",
  battery: "Akku",
  sport: "Sport",
  mic: "Mikrofon",
  comfort: "Komfort",
};

const budgetLabel: Record<Budget | "any", string> = {
  budget: "Budget  ·  bis €100",
  mid: "Mittelklasse  ·  bis €200",
  premium: "Premium  ·  ab €200",
  any: "Kein Limit  ·  egal",
};

const ecosystemLabel: Record<Ecosystem | "any", string> = {
  apple: "Apple",
  android: "Android / Samsung",
  universal: "Herstellerunabhängig",
  any: "Spielt keine Rolle",
};

const useCaseLabel: Record<UseCase, string> = {
  sport: "Sport & Fitness",
  office: "Homeoffice / Büro",
  travel: "Reisen",
  casual: "Alltag",
  calls: "Telefonate",
};

const useCaseIcon: Record<UseCase, string> = {
  sport: "🏃",
  office: "💻",
  travel: "✈️",
  casual: "🎵",
  calls: "📞",
};

const ecosystemIcon: Record<Ecosystem | "any", string> = {
  apple: "\uF8FF",
  android: "🤖",
  universal: "🌐",
  any: "✨",
};

const scoreKeys = ["sound", "anc", "battery", "sport", "mic", "comfort"] as const;
type ScoreKey = typeof scoreKeys[number];

const scoreGradients = [
  "from-blue-500 to-blue-400",
  "from-indigo-500 to-indigo-400",
  "from-violet-500 to-violet-400",
  "from-pink-500 to-pink-400",
  "from-orange-500 to-orange-400",
  "from-teal-500 to-teal-400",
];

const budgetBadge: Record<Budget, { bg: string; text: string; label: string }> = {
  budget: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Budget" },
  mid: { bg: "bg-amber-50", text: "text-amber-700", label: "Mid-Range" },
  premium: { bg: "bg-violet-50", text: "text-violet-700", label: "Premium" },
};

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
  const b = budgetBadge[product.budget];
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${b.bg} ${b.text}`}
    >
      {b.label}
    </span>
  );
}

// ─── Finder Tab ────────────────────────────────────────────────────────────────

const STEPS = 4;

interface FinderState {
  budget: Budget | "any";
  ecosystem: Ecosystem | "any";
  useCases: UseCase[];
  priorities: ScoreKey[];
}

const stepMeta = [
  { title: "Was ist dein Budget?", sub: "Wähle dein maximales Budget aus." },
  { title: "Welches Ökosystem?", sub: "Mit welchen Geräten nutzt du die Kopfhörer?" },
  { title: "Wofür brauchst du sie?", sub: "Mehrfachauswahl möglich." },
  { title: "Deine Prioritäten?", sub: "Wähle bis zu 3 – Reihenfolge zählt." },
];

const rankMeta = [
  {
    label: "Platz 1", emoji: "🥇",
    card: "border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm shadow-amber-100",
    badge: "bg-amber-100 text-amber-700", rank: "text-amber-600",
  },
  {
    label: "Platz 2", emoji: "🥈",
    card: "border-slate-200 bg-gradient-to-br from-slate-50 to-white",
    badge: "bg-slate-100 text-slate-600", rank: "text-slate-500",
  },
  {
    label: "Platz 3", emoji: "🥉",
    card: "border-orange-100 bg-gradient-to-br from-orange-50/40 to-white",
    badge: "bg-orange-100 text-orange-600", rank: "text-orange-500",
  },
];

function ResultCard({ product, score, idx }: { product: Product; score: number; idx: number }) {
  const meta = rankMeta[idx];
  return (
    <div className={`rounded-2xl border-2 p-5 transition-all ${meta.card}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${meta.badge}`}>
          <span>{meta.emoji}</span><span>{meta.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`text-xs font-semibold uppercase tracking-wide ${meta.rank}`}>Score</div>
          <div className={`text-lg font-bold tabular-nums ${meta.rank}`}>{score}</div>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="font-bold text-slate-900 text-lg leading-tight">{product.name}</div>
          <div className="text-sm text-slate-400 mt-0.5">{product.brand}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-slate-900 tracking-tight">€{product.price}</div>
          <div className="mt-1"><Badge product={product} /></div>
        </div>
      </div>
      <div className="rounded-xl bg-white/70 border border-slate-100 px-3.5 py-2.5 mb-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Warum?</div>
        <p className="text-sm text-slate-700 leading-relaxed">{product.note}</p>
      </div>
      <div className="grid grid-cols-3 gap-x-5 gap-y-2.5">
        {(["sound", "anc", "battery"] as ScoreKey[]).map((k, i) => (
          <ScoreBar key={k} label={scoreLabel[k]} value={product[k]} gradient={scoreGradients[i]} />
        ))}
      </div>
    </div>
  );
}

function FinderTab() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FinderState>({
    budget: "any",
    ecosystem: "any",
    useCases: [],
    priorities: [],
  });
  const [done, setDone] = useState(false);
  // Persists across retries — intentionally NOT reset when user redoes the wizard
  const [contradictionsSeen, setContradictionsSeen] = useState(0);

  const budgetIndex = useMemo(
    () =>
      state.budget === "any" ? null
      : state.budget === "budget" ? 0
      : state.budget === "mid" ? 1
      : 2,
    [state.budget]
  );

  // Hard price ceiling for the selected budget
  const priceCap = useMemo(
    () => (budgetIndex === null ? Infinity : (PRICE_CAPS[budgetIndex] ?? Infinity)),
    [budgetIndex]
  );

  // Products that pass the hard budget filter, scored and ranked
  const ranked = useMemo(() => {
    if (!done) return [];
    return [...products]
      .map((p) => {
        const score = scoreProduct(p, {
          budget: budgetIndex,
          ecosystem: state.ecosystem === "any" ? null : state.ecosystem,
          useCases: state.useCases,
          priorities: state.priorities,
        });
        if (score === null) return null; // hard-filtered out
        return { product: p, score };
      })
      .filter((r): r is { product: Product; score: number } => r !== null)
      .sort((a, b) => b.score - a.score);
  }, [done, state, budgetIndex]);

  // Contradiction: user wants a specific ecosystem but NO product in that
  // ecosystem exists within the selected price cap.
  const isContradiction = useMemo(() => {
    if (!done || state.ecosystem === "any") return false;
    return !products.some(
      (p) => p.price <= priceCap && p.ecosystem === state.ecosystem
    );
  }, [done, state.ecosystem, priceCap]);

  // Cheapest product that actually belongs to the desired ecosystem (for the explanation)
  const cheapestEcosystemProduct = useMemo(() => {
    if (!isContradiction || state.ecosystem === "any") return null;
    return (
      products
        .filter((p) => p.ecosystem === state.ecosystem)
        .sort((a, b) => a.price - b.price)[0] ?? null
    );
  }, [isContradiction, state.ecosystem]);

  function toggleUseCase(uc: UseCase) {
    setState((s) => ({
      ...s,
      useCases: s.useCases.includes(uc)
        ? s.useCases.filter((u) => u !== uc)
        : [...s.useCases, uc],
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

  // Full reset (contradictionsSeen intentionally preserved)
  function reset() {
    setStep(0);
    setDone(false);
    setState({ budget: "mid", ecosystem: "any", useCases: [], priorities: [] });
  }

  function retryAfterContradiction() {
    setContradictionsSeen((c) => c + 1);
    reset();
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (done) {
    const budgetCapLabel =
      state.budget === "budget" ? "€100"
      : state.budget === "mid" ? "€200"
      : null;

    // ── Contradiction screen ─────────────────────────────────────────────────
    if (isContradiction && cheapestEcosystemProduct) {
      const gap = cheapestEcosystemProduct.price - (priceCap === Infinity ? 0 : priceCap);

      return (
        <div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            Neu starten
          </button>

          {contradictionsSeen === 0 ? (
            /* ── First contradiction: friendly sarcasm ── */
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 mb-6 text-center">
              <div className="text-5xl mb-3">🤔</div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                Hmm… das wird schwierig.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-1">
                Das günstigste{" "}
                <span className="font-semibold">{ecosystemLabel[state.ecosystem as Ecosystem]}</span>
                -Modell kostet{" "}
                <span className="font-semibold">€{cheapestEcosystemProduct.price}</span>
                {budgetCapLabel && (
                  <> — das sind <span className="font-semibold text-red-600">€{gap} über</span> deinem Budget.</>
                )}
              </p>
              <p className="text-sm text-slate-500 mb-5">
                Das, was du suchst, gibt es in dieser Kombination leider nicht. Versuchs nochmal!
              </p>
              <button
                onClick={retryAfterContradiction}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 active:scale-[0.98] transition-all"
              >
                Nochmal versuchen →
              </button>
            </div>
          ) : (
            /* ── Repeated contradiction: Einstein ── */
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 mb-6">
              <div className="text-4xl mb-3 text-center">😅</div>
              <blockquote className="text-sm italic text-slate-600 leading-relaxed border-l-4 border-slate-300 pl-4 mb-3">
                &bdquo;Die Definition von Wahnsinn ist, immer wieder dasselbe zu tun und andere Ergebnisse zu erwarten.&ldquo;
              </blockquote>
              <p className="text-xs text-slate-400 text-right mb-5">— Albert Einstein</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Lass uns ehrlich sein:{" "}
                <span className="font-semibold">{ecosystemLabel[state.ecosystem as Ecosystem]}</span>
                -Kopfhörer starten bei{" "}
                <span className="font-semibold">€{cheapestEcosystemProduct.price}</span>.
                {budgetCapLabel && (
                  <> Dein Budget ({budgetCapLabel}) deckt das nicht ab — du brauchst mindestens <span className="font-semibold text-blue-600">€{gap} mehr</span>.</>
                )}
              </p>
              <button
                onClick={retryAfterContradiction}
                className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                Budget anpassen →
              </button>
            </div>
          )}

          {/* Nearest realistic alternative — best within budget */}
          {ranked.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Beste Alternative für dein Budget
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <ResultCard product={ranked[0].product} score={ranked[0].score} idx={0} />
            </div>
          )}
        </div>
      );
    }

    // ── Normal Top 3 results ─────────────────────────────────────────────────
    return (
      <div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Neu starten
        </button>

        <h2 className="text-xl font-semibold text-slate-900 mb-1">Deine Top 3</h2>
        <p className="text-sm text-slate-500 mb-6">
          Sortiert nach Übereinstimmung mit deinen Angaben.
        </p>

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
      {/* Step progress */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? "bg-blue-500" : "bg-slate-100"
              }`}
            />
          </div>
        ))}
        <span className="text-xs font-medium text-slate-400 shrink-0 tabular-nums">
          {step + 1}/{STEPS}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 mb-1">{stepMeta[step].title}</h2>
      <p className="text-sm text-slate-500 mb-6">{stepMeta[step].sub}</p>

      {step === 0 && (
        <div className="space-y-2.5">
          {(["budget", "mid", "premium", "any"] as const).map((b) => {
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
                <span className="font-medium text-sm">{budgetLabel[b]}</span>
                {active && <span className="text-blue-500 text-base">✓</span>}
              </button>
            );
          })}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-2.5">
          {(["apple", "android", "universal", "any"] as const).map((e) => {
            const active = state.ecosystem === e;
            return (
              <button
                key={e}
                onClick={() => setState((s) => ({ ...s, ecosystem: e }))}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                  active
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{ecosystemIcon[e]}</span>
                  <span className="font-medium text-sm">{ecosystemLabel[e]}</span>
                </span>
                {active && <span className="text-blue-500 text-base">✓</span>}
              </button>
            );
          })}
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-2 gap-2.5">
          {(Object.keys(useCaseLabel) as UseCase[]).map((uc) => {
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
                  <span className="absolute top-2 right-2 text-blue-500 text-xs font-bold">
                    ✓
                  </span>
                )}
                <div className="text-xl mb-1.5">{useCaseIcon[uc]}</div>
                <div className="text-xs font-semibold leading-tight">{useCaseLabel[uc]}</div>
              </button>
            );
          })}
        </div>
      )}

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
                <div className="text-sm font-semibold mt-1">{scoreLabel[p]}</div>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="px-5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            Zurück
          </button>
        )}
        <button
          onClick={() => {
            if (step < STEPS - 1) setStep((s) => s + 1);
            else setDone(true);
          }}
          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-sm shadow-blue-200"
        >
          {step < STEPS - 1 ? "Weiter →" : "Ergebnisse anzeigen →"}
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
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-xs border-2 border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-700 font-semibold focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
    >
      {products
        .filter((p) => !excludeIds.includes(p.id))
        .map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
    </select>
  );
}

// Section divider used in each column
function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 py-3">
      <div className="flex-1 h-px bg-slate-100" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 shrink-0">
        {children}
      </span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function GoldenCircleColumn({ product }: { product: Product }) {
  const howKeys: ScoreKey[] = ["anc", "comfort", "battery", "sound"];
  const howGradients = [
    "from-indigo-500 to-indigo-400",
    "from-teal-500 to-teal-400",
    "from-orange-500 to-orange-400",
    "from-blue-500 to-blue-400",
  ];

  return (
    <div className="flex flex-col min-w-0">
      {/* Product identity */}
      <div className="text-center mb-1 px-1">
        <div className="font-bold text-slate-900 text-sm leading-snug">{product.name}</div>
        <div className="text-xs text-slate-400 mt-0.5">{product.brand}</div>
      </div>

      {/* ── WHY ── */}
      <SectionLabel>Warum</SectionLabel>
      <div className="px-1 pb-1">
        <p className="text-sm font-semibold text-slate-800 leading-snug">{product.why}</p>
      </div>

      {/* ── HOW ── */}
      <SectionLabel>Wie</SectionLabel>
      <div className="px-1 space-y-3">
        {howKeys.map((k, i) => (
          <ScoreBar key={k} label={scoreLabel[k]} value={product[k]} gradient={howGradients[i]} />
        ))}
      </div>

      {/* ── WHAT ── */}
      <SectionLabel>Was</SectionLabel>
      <div className="px-1 space-y-3">
        {/* Price */}
        <div>
          <div className="text-3xl font-bold text-slate-900 tracking-tight">
            €{product.price}
          </div>
          <div className="mt-1.5">
            <Badge product={product} />
          </div>
        </div>

        {/* Use cases */}
        <div className="flex flex-wrap gap-1">
          {product.useCases.map((uc) => (
            <span
              key={uc}
              className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full"
            >
              {useCaseIcon[uc]} {useCaseLabel[uc]}
            </span>
          ))}
          <span className="inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
            {ecosystemIcon[product.ecosystem]} {ecosystemLabel[product.ecosystem]}
          </span>
        </div>
      </div>
    </div>
  );
}

function VergleichTab() {
  const [col1, setCol1] = useState(products[0].id);
  const [col2, setCol2] = useState(products[1].id);
  const [col3, setCol3] = useState(products[2].id);

  const p1 = products.find((p) => p.id === col1)!;
  const p2 = products.find((p) => p.id === col2)!;
  const p3 = products.find((p) => p.id === col3)!;

  return (
    <div>
      {/* Selectors */}
      <div className="grid grid-cols-3 gap-2.5 mb-8">
        <ProductSelect value={col1} onChange={setCol1} excludeIds={[col2, col3]} />
        <ProductSelect value={col2} onChange={setCol2} excludeIds={[col1, col3]} />
        <ProductSelect value={col3} onChange={setCol3} excludeIds={[col1, col2]} />
      </div>

      {/* 3-column Golden Circle comparison */}
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

function ProdukteTab() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.useCases.some((uc) => useCaseLabel[uc].toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          🔍
        </span>
        <input
          type="search"
          placeholder="Name, Marke oder Verwendungszweck…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
        />
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-3xl mb-2">🔇</div>
          <p className="text-sm text-slate-400">Keine Produkte gefunden.</p>
        </div>
      )}

      <div className="space-y-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border-2 border-slate-100 bg-white p-5 hover:border-slate-200 hover:shadow-sm transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="font-semibold text-slate-900 text-base leading-snug">
                  {p.name}
                </div>
                <div className="text-sm text-slate-400 mt-0.5">{p.brand}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  €{p.price}
                </div>
                <div className="mt-1.5">
                  <Badge product={p} />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.useCases.map((uc) => (
                <span
                  key={uc}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full"
                >
                  {useCaseIcon[uc]} {useCaseLabel[uc]}
                </span>
              ))}
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
                {ecosystemIcon[p.ecosystem]} {ecosystemLabel[p.ecosystem]}
              </span>
            </div>

            {/* Score bars */}
            <div className="grid grid-cols-3 gap-x-5 gap-y-3">
              {scoreKeys.map((k, idx) => (
                <ScoreBar
                  key={k}
                  label={scoreLabel[k]}
                  value={p[k]}
                  gradient={scoreGradients[idx]}
                />
              ))}
            </div>

            {/* Note */}
            <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100 leading-relaxed">
              {p.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root Page ─────────────────────────────────────────────────────────────────

type Tab = "finder" | "vergleich" | "produkte";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "finder", label: "Finder", icon: "🎯" },
  { id: "vergleich", label: "Vergleich", icon: "⚖️" },
  { id: "produkte", label: "Produkte", icon: "📋" },
];

export default function Home() {
  const [active, setActive] = useState<Tab>("finder");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-slate-900 px-4 pt-8 pb-9">
        <div className="max-w-lg mx-auto">
          {/* WHY */}
          <h1 className="text-3xl font-bold text-white tracking-tight leading-tight mb-2">
            Finde deinen
            <span className="text-blue-400"> perfekten Kopfhörer.</span>
          </h1>
          {/* HOW */}
          <p className="text-sm font-medium text-slate-400 tracking-wide mb-4">
            4 Fragen.&ensp;3 Empfehlungen.&ensp;Keine Kompromisse.
          </p>
          {/* WHAT */}
          <div className="inline-flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
            {products.length} Kopfhörer im Vergleich
          </div>
        </div>
      </div>

      {/* Sticky tab bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5">
        <div className="max-w-lg mx-auto flex gap-1 bg-slate-100 rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                active === t.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content — wider container for Vergleich, standard for the rest */}
      <div
        className={`mx-auto px-4 py-8 pb-24 transition-all duration-300 ${
          active === "vergleich" ? "max-w-4xl" : "max-w-lg"
        }`}
      >
        <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm">
          {/*
            All three tabs are always mounted so their internal state persists
            when the user switches tabs. Visibility is toggled via `hidden`.
          */}
          <div className={active !== "finder" ? "hidden" : ""}>
            <FinderTab />
          </div>
          <div className={active !== "vergleich" ? "hidden" : ""}>
            <VergleichTab />
          </div>
          <div className={active !== "produkte" ? "hidden" : ""}>
            <ProdukteTab />
          </div>
        </div>
      </div>
    </div>
  );
}
