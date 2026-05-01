-- ─── 1. Create categories table ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  slug           TEXT        PRIMARY KEY,
  name_de        TEXT        NOT NULL,
  name_en        TEXT        NOT NULL,
  name_fr        TEXT        NOT NULL,
  description_de TEXT        NOT NULL DEFAULT '',
  description_en TEXT        NOT NULL DEFAULT '',
  description_fr TEXT        NOT NULL DEFAULT '',
  icon           TEXT        NOT NULL DEFAULT '🛍️',
  active         BOOLEAN     NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 2. Row-Level Security ─────────────────────────────────────────────────────
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read" ON categories;
CREATE POLICY "Public read" ON categories
  FOR SELECT USING (true);

-- ─── 3. Seed: earbuds category ────────────────────────────────────────────────
INSERT INTO categories
  (slug, name_de, name_en, name_fr, description_de, description_en, description_fr, icon, active)
VALUES (
  'earbuds',
  'Wireless Earbuds',
  'Wireless Earbuds',
  'Écouteurs sans fil',
  'True-Wireless-Kopfhörer im Vergleich – Finder, Vergleich & Übersicht.',
  'True wireless earbuds compared – Finder, Compare & Overview.',
  'Écouteurs True Wireless comparés – Finder, Comparaison & Vue d''ensemble.',
  '🎧',
  true
)
ON CONFLICT (slug) DO NOTHING;
