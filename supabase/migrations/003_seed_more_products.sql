-- ─── Seed: 6 weitere Earbuds (2026) ──────────────────────────────────────────
INSERT INTO products
  (id, name, brand, price, budget, ecosystem, use_cases,
   battery, sport, sound, anc, mic, comfort,
   note, why, category, affiliate_url)
VALUES
  (
    'google-pixel-buds-pro-2', 'Google Pixel Buds Pro 2', 'Google', 229,
    'premium', 'android', '{office,travel,casual}',
    8, 6, 8, 7, 9, 9,
    'Bester Transparenzmodus der Klasse. Live Translation direkt in den Ohren.',
    'Für Google/Android-Nutzer die nahtlose KI-Integration wollen – ohne Kompromisse beim Komfort.',
    'earbuds', 'https://amzn.to/4e24jqM'
  ),
  (
    'earfun-air-pro-4-plus', 'EarFun Air Pro 4+', 'EarFun', 79,
    'budget', 'universal', '{casual,office,sport}',
    9, 7, 8, 7, 8, 8,
    'Bluetooth 6.0, aptX Lossless, LDAC – alles für 79€. IP55-Schutz.',
    'Für Tech-Enthusiasten die Flaggschiff-Codecs zum Budget-Preis wollen. Schwer zu schlagen.',
    'earbuds', 'https://amzn.to/3PJiNT3'
  ),
  (
    'jbl-live-pro-2', 'JBL Live Pro 2', 'JBL', 99,
    'mid', 'universal', '{casual,calls,office}',
    9, 6, 7, 7, 8, 7,
    '40h Gesamtlaufzeit, Smart Ambient, 6 Mikrofone. Warmer JBL-Sound.',
    'Für alle die Marken-Sound und lange Akkulaufzeit über Hi-Res-Codecs stellen.',
    'earbuds', 'https://amzn.to/4fEJFhE'
  ),
  (
    'cmf-buds-pro-2', 'CMF Buds Pro 2', 'CMF by Nothing', 59,
    'budget', 'universal', '{casual,office,travel}',
    10, 6, 7, 8, 7, 7,
    '43h Gesamtlaufzeit, 50dB ANC, Smart Dial. Günstigstes starkes ANC 2026.',
    'Für Budget-Käufer die starkes ANC und nie laden wollen. Unschlagbar für 59€.',
    'earbuds', 'https://amzn.to/4u46uz6'
  ),
  (
    'oneplus-buds-4', 'OnePlus Buds 4', 'OnePlus', 99,
    'mid', 'android', '{casual,office,sport}',
    8, 7, 8, 8, 7, 8,
    'Bestes ANC-Preis-Leistung unter 100€ laut Scarbir. LDAC, IP55.',
    'Für Android-Nutzer die Premium-ANC unter 100€ suchen. Klarer Geheimtipp 2026.',
    'earbuds', 'https://amzn.to/4fF8YA4'
  ),
  (
    'huawei-freebuds-6i', 'Huawei FreeBuds 6i', 'Huawei', 79,
    'budget', 'universal', '{casual,office}',
    8, 5, 7, 7, 7, 7,
    'Kompaktes Design, solides ANC, gute App. Eingeschränkt ohne Google-Services.',
    'Für Nutzer die eine günstige Huawei-Alternative suchen – ohne Ökosystem-Abhängigkeit.',
    'earbuds', 'https://amzn.to/4tZSAxL'
  )
ON CONFLICT (id) DO NOTHING;
