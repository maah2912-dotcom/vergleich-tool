-- ─── Seed: Apple AirPods 4 ───────────────────────────────────────────────────
INSERT INTO products
  (id, name, brand, price, budget, ecosystem, use_cases,
   battery, sport, sound, anc, mic, comfort,
   note, why, category, affiliate_url)
VALUES
  (
    'apple-airpods-4', 'Apple AirPods 4', 'Apple', 179,
    'mid', 'apple', '{casual,office,travel}',
    7, 5, 8, 6, 8, 9,
    'Offenes Design ohne Silikon-Tips. H2-Chip, USB-C, ANC-Option.',
    'Für Apple-Nutzer die keine In-Ear-Passform mögen – Komfort ohne Kompromisse.',
    'earbuds', 'https://amzn.to/4nU2y2q'
  )
ON CONFLICT (id) DO NOTHING;
