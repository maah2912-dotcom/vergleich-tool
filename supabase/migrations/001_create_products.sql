-- ─── 1. Create table ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          TEXT        PRIMARY KEY,
  name        TEXT        NOT NULL,
  brand       TEXT        NOT NULL,
  price       INTEGER     NOT NULL,
  budget      TEXT        NOT NULL CHECK (budget IN ('budget', 'mid', 'premium')),
  ecosystem   TEXT        NOT NULL CHECK (ecosystem IN ('apple', 'android', 'universal')),
  use_cases   TEXT[]      NOT NULL DEFAULT '{}',
  battery     SMALLINT    NOT NULL CHECK (battery BETWEEN 1 AND 10),
  sport       SMALLINT    NOT NULL CHECK (sport BETWEEN 1 AND 10),
  sound       SMALLINT    NOT NULL CHECK (sound BETWEEN 1 AND 10),
  anc         SMALLINT    NOT NULL CHECK (anc BETWEEN 1 AND 10),
  mic         SMALLINT    NOT NULL CHECK (mic BETWEEN 1 AND 10),
  comfort     SMALLINT    NOT NULL CHECK (comfort BETWEEN 1 AND 10),
  note        TEXT        NOT NULL DEFAULT '',
  why         TEXT        NOT NULL DEFAULT '',
  category    TEXT        NOT NULL DEFAULT 'earbuds',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 2. Row-Level Security ────────────────────────────────────────────────────
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read" ON products;
CREATE POLICY "Public read" ON products
  FOR SELECT USING (true);

-- ─── 3. Seed data ─────────────────────────────────────────────────────────────
INSERT INTO products
  (id, name, brand, price, budget, ecosystem, use_cases,
   battery, sport, sound, anc, mic, comfort,
   note, why, category)
VALUES
  (
    'airpods-pro-2', 'AirPods Pro 2', 'Apple', 249,
    'premium', 'apple', '{office,travel,casual}',
    7, 6, 9, 10, 9, 9,
    'Beste ANC-Integration im Apple-Ökosystem. Adaptive Audio passt sich automatisch an.',
    'Für Apple-Nutzer, die Technologie spüren wollen – ohne darüber nachzudenken. Einsetzen, und der Rest passiert von selbst.',
    'earbuds'
  ),
  (
    'jabra-elite-8-active', 'Jabra Elite 8 Active', 'Jabra', 199,
    'premium', 'universal', '{sport,calls,casual}',
    8, 10, 8, 8, 9, 8,
    'IP57-zertifiziert, ShakeGrip-Technologie. Der beste Sport-Kopfhörer im Test.',
    'Für alle, die beim Sport keine Ausreden dulden. Gebaut für Bewegung, Schweiß und volle Leistung – komme was wolle.',
    'earbuds'
  ),
  (
    'sony-wf-1000xm5', 'Sony WF-1000XM5', 'Sony', 229,
    'premium', 'universal', '{travel,office,casual}',
    8, 4, 10, 9, 8, 7,
    'Referenzklasse beim Sound. LDAC-Codec für verlustfreies Audio.',
    'Für alle, die Musik so hören wollen, wie sie gemeint ist. Kein Rauschen, kein Kompromiss – nur reiner Klang.',
    'earbuds'
  ),
  (
    'galaxy-buds3-pro', 'Galaxy Buds3 Pro', 'Samsung', 219,
    'premium', 'android', '{office,travel,casual}',
    7, 6, 9, 9, 8, 8,
    'Beste Wahl für Samsung-Nutzer. Intelligentes ANC mit Head-Tracking.',
    'Für Samsung-Nutzer, die ihr Ökosystem voll ausschöpfen wollen. Intelligent, adaptiv und nahtlos vernetzt.',
    'earbuds'
  ),
  (
    'nothing-ear', 'Nothing Ear', 'Nothing', 149,
    'mid', 'universal', '{casual,office,travel}',
    8, 5, 8, 7, 7, 8,
    'Bestes Preis-Leistungs-Verhältnis. Transparentes Design, solide Leistung.',
    'Für alle, die klug kaufen wollen – ohne auf Stil oder Substanz zu verzichten. Ehrlich, durchdacht, fair bepreist.',
    'earbuds'
  ),
  (
    'soundcore-liberty-4-nc', 'Soundcore Liberty 4 NC', 'Anker', 79,
    'budget', 'universal', '{casual,sport,calls}',
    9, 7, 7, 7, 7, 8,
    'Unschlagbarer Preis mit erstaunlicher ANC-Leistung. 50h Gesamtlaufzeit.',
    'Für alle, die beweisen wollen, dass Preis und Qualität kein Widerspruch sind. 50 Stunden Freiheit zum Einstiegspreis.',
    'earbuds'
  )
ON CONFLICT (id) DO NOTHING;
