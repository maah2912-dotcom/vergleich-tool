export type Ecosystem = "apple" | "android" | "universal";
export type UseCase = "sport" | "office" | "travel" | "casual" | "calls";
export type Budget = "budget" | "mid" | "premium";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number; // EUR
  budget: Budget;
  ecosystem: Ecosystem;
  useCases: UseCase[];
  // Scores 1–10
  battery: number;
  sport: number;
  sound: number;
  anc: number;
  mic: number;
  comfort: number;
  note: string;
  why: string; // emotional headline – who it's for (Golden Circle)
}

export const products: Product[] = [
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    brand: "Apple",
    price: 249,
    budget: "premium",
    ecosystem: "apple",
    useCases: ["office", "travel", "casual"],
    battery: 7,
    sport: 6,
    sound: 9,
    anc: 10,
    mic: 9,
    comfort: 9,
    note: "Beste ANC-Integration im Apple-Ökosystem. Adaptive Audio passt sich automatisch an.",
    why: "Für Apple-Nutzer, die Technologie spüren wollen – ohne darüber nachzudenken. Einsetzen, und der Rest passiert von selbst.",
  },
  {
    id: "jabra-elite-8-active",
    name: "Jabra Elite 8 Active",
    brand: "Jabra",
    price: 199,
    budget: "premium",
    ecosystem: "universal",
    useCases: ["sport", "calls", "casual"],
    battery: 8,
    sport: 10,
    sound: 8,
    anc: 8,
    mic: 9,
    comfort: 8,
    note: "IP57-zertifiziert, ShakeGrip-Technologie. Der beste Sport-Kopfhörer im Test.",
    why: "Für alle, die beim Sport keine Ausreden dulden. Gebaut für Bewegung, Schweiß und volle Leistung – komme was wolle.",
  },
  {
    id: "sony-wf-1000xm5",
    name: "Sony WF-1000XM5",
    brand: "Sony",
    price: 229,
    budget: "premium",
    ecosystem: "universal",
    useCases: ["travel", "office", "casual"],
    battery: 8,
    sport: 4,
    sound: 10,
    anc: 9,
    mic: 8,
    comfort: 7,
    note: "Referenzklasse beim Sound. LDAC-Codec für verlustfreies Audio.",
    why: "Für alle, die Musik so hören wollen, wie sie gemeint ist. Kein Rauschen, kein Kompromiss – nur reiner Klang.",
  },
  {
    id: "galaxy-buds3-pro",
    name: "Galaxy Buds3 Pro",
    brand: "Samsung",
    price: 219,
    budget: "premium",
    ecosystem: "android",
    useCases: ["office", "travel", "casual"],
    battery: 7,
    sport: 6,
    sound: 9,
    anc: 9,
    mic: 8,
    comfort: 8,
    note: "Beste Wahl für Samsung-Nutzer. Intelligentes ANC mit Head-Tracking.",
    why: "Für Samsung-Nutzer, die ihr Ökosystem voll ausschöpfen wollen. Intelligent, adaptiv und nahtlos vernetzt.",
  },
  {
    id: "nothing-ear",
    name: "Nothing Ear",
    brand: "Nothing",
    price: 149,
    budget: "mid",
    ecosystem: "universal",
    useCases: ["casual", "office", "travel"],
    battery: 8,
    sport: 5,
    sound: 8,
    anc: 7,
    mic: 7,
    comfort: 8,
    note: "Bestes Preis-Leistungs-Verhältnis. Transparentes Design, solide Leistung.",
    why: "Für alle, die klug kaufen wollen – ohne auf Stil oder Substanz zu verzichten. Ehrlich, durchdacht, fair bepreist.",
  },
  {
    id: "soundcore-liberty-4-nc",
    name: "Soundcore Liberty 4 NC",
    brand: "Anker",
    price: 79,
    budget: "budget",
    ecosystem: "universal",
    useCases: ["casual", "sport", "calls"],
    battery: 9,
    sport: 7,
    sound: 7,
    anc: 7,
    mic: 7,
    comfort: 8,
    note: "Unschlagbarer Preis mit erstaunlicher ANC-Leistung. 50h Gesamtlaufzeit.",
    why: "Für alle, die beweisen wollen, dass Preis und Qualität kein Widerspruch sind. 50 Stunden Freiheit zum Einstiegspreis.",
  },
];

// Price ceiling per budget index (0 = budget, 1 = mid, 2 = premium, null = any)
export const PRICE_CAPS: Record<number, number> = { 0: 100, 1: 200 };

export function scoreProduct(
  product: Product,
  weights: {
    budget: number | null; // null = any / no cap
    ecosystem: Ecosystem | null;
    useCases: UseCase[];
    priorities: ("sound" | "anc" | "battery" | "sport" | "mic" | "comfort")[];
  }
): number | null {
  // ── Hard budget filter ───────────────────────────────────────────────────────
  // Returns null when product price exceeds the hard cap — callers must filter these out.
  if (weights.budget !== null) {
    const cap = PRICE_CAPS[weights.budget]; // undefined for index 2 (premium) = no cap
    if (cap !== undefined && product.price > cap) return null;
  }

  let score = 0;

  // Product passed the budget gate → award budget points
  score += 20;

  // Ecosystem match
  if (weights.ecosystem) {
    if (product.ecosystem === weights.ecosystem) score += 20;
    else if (product.ecosystem === "universal") score += 10;
  } else {
    score += 10;
  }

  // Use case match
  const useCaseMatches = weights.useCases.filter((uc) =>
    product.useCases.includes(uc)
  ).length;
  score += (useCaseMatches / Math.max(weights.useCases.length, 1)) * 20;

  // Priority scores
  weights.priorities.forEach((p, idx) => {
    const weight = (weights.priorities.length - idx) * 2;
    score += (product[p] / 10) * weight;
  });

  return Math.round(score);
}
