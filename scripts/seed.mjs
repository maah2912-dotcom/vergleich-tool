#!/usr/bin/env node
/**
 * Re-seed products into Supabase.
 * Requires the table to exist (run supabase/migrations/001_create_products.sql first).
 * Requires SUPABASE_SERVICE_ROLE_KEY env var for INSERT permission (RLS bypassed).
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/seed.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gjhoolditkcvlhioycvu.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!KEY) {
  console.error("❌  Set SUPABASE_SERVICE_ROLE_KEY before running this script.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, KEY);

const products = [
  {
    id: "airpods-pro-2", name: "AirPods Pro 2", brand: "Apple",
    price: 249, budget: "premium", ecosystem: "apple",
    use_cases: ["office", "travel", "casual"],
    battery: 7, sport: 6, sound: 9, anc: 10, mic: 9, comfort: 9,
    note: "Beste ANC-Integration im Apple-Ökosystem. Adaptive Audio passt sich automatisch an.",
    why: "Für Apple-Nutzer, die Technologie spüren wollen – ohne darüber nachzudenken. Einsetzen, und der Rest passiert von selbst.",
    category: "earbuds",
  },
  {
    id: "jabra-elite-8-active", name: "Jabra Elite 8 Active", brand: "Jabra",
    price: 199, budget: "premium", ecosystem: "universal",
    use_cases: ["sport", "calls", "casual"],
    battery: 8, sport: 10, sound: 8, anc: 8, mic: 9, comfort: 8,
    note: "IP57-zertifiziert, ShakeGrip-Technologie. Der beste Sport-Kopfhörer im Test.",
    why: "Für alle, die beim Sport keine Ausreden dulden. Gebaut für Bewegung, Schweiß und volle Leistung – komme was wolle.",
    category: "earbuds",
  },
  {
    id: "sony-wf-1000xm5", name: "Sony WF-1000XM5", brand: "Sony",
    price: 229, budget: "premium", ecosystem: "universal",
    use_cases: ["travel", "office", "casual"],
    battery: 8, sport: 4, sound: 10, anc: 9, mic: 8, comfort: 7,
    note: "Referenzklasse beim Sound. LDAC-Codec für verlustfreies Audio.",
    why: "Für alle, die Musik so hören wollen, wie sie gemeint ist. Kein Rauschen, kein Kompromiss – nur reiner Klang.",
    category: "earbuds",
  },
  {
    id: "galaxy-buds3-pro", name: "Galaxy Buds3 Pro", brand: "Samsung",
    price: 219, budget: "premium", ecosystem: "android",
    use_cases: ["office", "travel", "casual"],
    battery: 7, sport: 6, sound: 9, anc: 9, mic: 8, comfort: 8,
    note: "Beste Wahl für Samsung-Nutzer. Intelligentes ANC mit Head-Tracking.",
    why: "Für Samsung-Nutzer, die ihr Ökosystem voll ausschöpfen wollen. Intelligent, adaptiv und nahtlos vernetzt.",
    category: "earbuds",
  },
  {
    id: "nothing-ear", name: "Nothing Ear", brand: "Nothing",
    price: 149, budget: "mid", ecosystem: "universal",
    use_cases: ["casual", "office", "travel"],
    battery: 8, sport: 5, sound: 8, anc: 7, mic: 7, comfort: 8,
    note: "Bestes Preis-Leistungs-Verhältnis. Transparentes Design, solide Leistung.",
    why: "Für alle, die klug kaufen wollen – ohne auf Stil oder Substanz zu verzichten. Ehrlich, durchdacht, fair bepreist.",
    category: "earbuds",
  },
  {
    id: "soundcore-liberty-4-nc", name: "Soundcore Liberty 4 NC", brand: "Anker",
    price: 79, budget: "budget", ecosystem: "universal",
    use_cases: ["casual", "sport", "calls"],
    battery: 9, sport: 7, sound: 7, anc: 7, mic: 7, comfort: 8,
    note: "Unschlagbarer Preis mit erstaunlicher ANC-Leistung. 50h Gesamtlaufzeit.",
    why: "Für alle, die beweisen wollen, dass Preis und Qualität kein Widerspruch sind. 50 Stunden Freiheit zum Einstiegspreis.",
    category: "earbuds",
  },
];

const { error } = await supabase
  .from("products")
  .upsert(products, { onConflict: "id" });

if (error) {
  console.error("❌  Seed failed:", error.message);
  process.exit(1);
}

console.log(`✅  Seeded ${products.length} products successfully.`);
