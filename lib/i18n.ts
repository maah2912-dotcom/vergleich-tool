export type Lang = "de" | "en" | "fr";

export interface Translation {
  // Category page hero
  heroTitle: string;
  heroSub: string;
  heroSync: (n: number) => string;
  // Navigation tabs
  tabs: { finder: string; vergleich: string; produkte: string; artikel: string };
  // Finder steps
  budgetLabel: Record<"budget" | "mid" | "any", string>;
  allBrands: string;
  ecosystemLabel: Record<"apple" | "android" | "universal", string>;
  useCaseLabel: Record<string, string>;
  scoreLabel: Record<string, string>;
  steps: { title: string; sub: string }[];
  back: string;
  next: string;
  showResults: string;
  restart: string;
  // Results
  top3Title: string;
  top3Sub: string;
  whyLabel: string;
  scoreShort: string;
  rankLabels: string[];
  budgetBadge: Record<string, string>;
  // Contradiction flow
  contradiction1Title: string;
  cheapestModelPrefix: string;
  cheapestModelSuffix: string;
  aboveYourBudget: (gap: number) => string;
  contradiction1Sub: string;
  retryBtn: string;
  bestAlt: string;
  einsteinQuote: string;
  contradiction2Line1: (brand: string, price: number) => string;
  contradiction2Line2: (capLabel: string, gap: number) => string;
  adjustBudget: string;
  // Golden Circle labels
  goldenWhy: string;
  goldenHow: string;
  goldenWhat: string;
  // Products tab
  searchPlaceholder: string;
  noProducts: string;
  // Homepage
  homeHeroTitle: string;
  homeHeroSub: string;
  categoriesHeading: string;
  categoryCardCta: string;
  noCategoriesYet: string;
  // Footer
  footerImprint: string;
  footerPrivacy: string;
  // Affiliate disclosure
  affiliateNotice: string;
}

const de: Translation = {
  heroTitle: "Finde den besten",
  heroSub: "4 Fragen.  3 Empfehlungen.  Keine Kompromisse.",
  heroSync: (n) => `${n} Produkte im Vergleich`,
  tabs: { finder: "Finder", vergleich: "Vergleich", produkte: "Produkte", artikel: "Artikel" },
  budgetLabel: {
    budget: "Budget  ·  bis €100",
    mid: "Mittelklasse  ·  bis €200",
    any: "Kein Limit",
  },
  allBrands: "Alle Marken",
  ecosystemLabel: {
    apple: "Apple",
    android: "Android / Samsung",
    universal: "Herstellerunabhängig",
  },
  useCaseLabel: {
    sport: "Sport & Fitness",
    office: "Homeoffice / Büro",
    travel: "Reisen",
    casual: "Alltag",
    calls: "Telefonate",
  },
  scoreLabel: {
    sound: "Sound",
    anc: "ANC",
    battery: "Akku",
    sport: "Sport",
    mic: "Mikrofon",
    comfort: "Komfort",
  },
  steps: [
    { title: "Was ist dein Budget?", sub: "Wähle dein maximales Budget aus." },
    { title: "Welche Marke?", sub: "Filterst du nach einer bestimmten Marke?" },
    { title: "Wofür brauchst du sie?", sub: "Mehrfachauswahl möglich." },
    { title: "Deine Prioritäten?", sub: "Wähle bis zu 3 – Reihenfolge zählt." },
  ],
  back: "Zurück",
  next: "Weiter →",
  showResults: "Ergebnisse anzeigen →",
  restart: "Neu starten",
  top3Title: "Deine Top 3",
  top3Sub: "Sortiert nach Übereinstimmung mit deinen Angaben.",
  whyLabel: "Warum?",
  scoreShort: "Score",
  rankLabels: ["Platz 1", "Platz 2", "Platz 3"],
  budgetBadge: { budget: "Budget", mid: "Mid-Range", premium: "Premium" },
  contradiction1Title: "Hmm… das wird schwierig.",
  cheapestModelPrefix: "Das günstigste",
  cheapestModelSuffix: "Modell kostet",
  aboveYourBudget: (gap) => `— das sind €${gap} über deinem Budget.`,
  contradiction1Sub:
    "Das, was du suchst, gibt es in dieser Kombination leider nicht. Versuchs nochmal!",
  retryBtn: "Nochmal versuchen →",
  bestAlt: "Beste Alternative für dein Budget",
  einsteinQuote:
    "„Die Definition von Wahnsinn ist, immer wieder dasselbe zu tun und andere Ergebnisse zu erwarten.“",
  contradiction2Line1: (brand, price) =>
    `Lass uns ehrlich sein: ${brand}-Produkte starten bei €${price}.`,
  contradiction2Line2: (capLabel, gap) =>
    `Dein Budget (${capLabel}) deckt das nicht ab — du brauchst mindestens €${gap} mehr.`,
  adjustBudget: "Budget anpassen →",
  goldenWhy: "Warum",
  goldenHow: "Wie",
  goldenWhat: "Was",
  searchPlaceholder: "Name, Marke oder Verwendungszweck…",
  noProducts: "Keine Produkte gefunden.",
  homeHeroTitle: "Compare Smart",
  homeHeroSub: "Finde das beste Produkt. Sofort.",
  categoriesHeading: "Alle Kategorien",
  categoryCardCta: "Jetzt vergleichen →",
  noCategoriesYet: "Noch keine Kategorien verfügbar.",
  footerImprint: "Impressum",
  footerPrivacy: "Datenschutz",
  affiliateNotice:
    "Dieser Vergleich enthält Affiliate-Links. Wenn du über diese Links kaufst, erhalten wir eine kleine Provision – für dich entstehen keine Mehrkosten. Unsere Empfehlungen bleiben davon unabhängig.",
};

const en: Translation = {
  heroTitle: "Find the best",
  heroSub: "4 questions.  3 picks.  No compromises.",
  heroSync: (n) => `${n} products compared`,
  tabs: { finder: "Finder", vergleich: "Compare", produkte: "Products", artikel: "Articles" },
  budgetLabel: {
    budget: "Budget  ·  up to €100",
    mid: "Mid-range  ·  up to €200",
    any: "No Limit",
  },
  allBrands: "All Brands",
  ecosystemLabel: {
    apple: "Apple",
    android: "Android / Samsung",
    universal: "Brand-independent",
  },
  useCaseLabel: {
    sport: "Sport & Fitness",
    office: "Office / WFH",
    travel: "Travel",
    casual: "Everyday",
    calls: "Phone calls",
  },
  scoreLabel: {
    sound: "Sound",
    anc: "ANC",
    battery: "Battery",
    sport: "Sport",
    mic: "Microphone",
    comfort: "Comfort",
  },
  steps: [
    { title: "What's your budget?", sub: "Choose your maximum budget." },
    { title: "Which brand?", sub: "Filter by a specific brand?" },
    { title: "What will you use them for?", sub: "Multiple selection possible." },
    { title: "Your priorities?", sub: "Pick up to 3 — order matters." },
  ],
  back: "Back",
  next: "Next →",
  showResults: "Show results →",
  restart: "Start over",
  top3Title: "Your Top 3",
  top3Sub: "Sorted by match with your preferences.",
  whyLabel: "Why?",
  scoreShort: "Score",
  rankLabels: ["1st place", "2nd place", "3rd place"],
  budgetBadge: { budget: "Budget", mid: "Mid-Range", premium: "Premium" },
  contradiction1Title: "Hmm… that's tricky.",
  cheapestModelPrefix: "The cheapest",
  cheapestModelSuffix: "model costs",
  aboveYourBudget: (gap) => `— that's €${gap} over your budget.`,
  contradiction1Sub:
    "What you're looking for doesn't exist in this combination. Try again!",
  retryBtn: "Try again →",
  bestAlt: "Best alternative for your budget",
  einsteinQuote:
    "“The definition of insanity is doing the same thing over and over and expecting different results.”",
  contradiction2Line1: (brand, price) =>
    `Let's be honest: ${brand} products start at €${price}.`,
  contradiction2Line2: (capLabel, gap) =>
    `Your budget (${capLabel}) doesn't cover that — you need at least €${gap} more.`,
  adjustBudget: "Adjust budget →",
  goldenWhy: "Why",
  goldenHow: "How",
  goldenWhat: "What",
  searchPlaceholder: "Name, brand or use case…",
  noProducts: "No products found.",
  homeHeroTitle: "Compare Smart",
  homeHeroSub: "Find the best product. Instantly.",
  categoriesHeading: "All Categories",
  categoryCardCta: "Compare now →",
  noCategoriesYet: "No categories available yet.",
  footerImprint: "Imprint",
  footerPrivacy: "Privacy Policy",
  affiliateNotice:
    "This comparison contains affiliate links. If you purchase via these links, we receive a small commission — at no extra cost to you. Our recommendations remain independent.",
};

const fr: Translation = {
  heroTitle: "Trouve les meilleurs",
  heroSub: "4 questions.  3 choix.  Zéro compromis.",
  heroSync: (n) => `${n} produits comparés`,
  tabs: { finder: "Finder", vergleich: "Comparer", produkte: "Produits", artikel: "Articles" },
  budgetLabel: {
    budget: "Entrée de gamme  ·  jusqu'à €100",
    mid: "Milieu de gamme  ·  jusqu'à €200",
    any: "Sans limite",
  },
  allBrands: "Toutes les marques",
  ecosystemLabel: {
    apple: "Apple",
    android: "Android / Samsung",
    universal: "Toutes marques",
  },
  useCaseLabel: {
    sport: "Sport & Fitness",
    office: "Bureau / Télétravail",
    travel: "Voyage",
    casual: "Quotidien",
    calls: "Appels",
  },
  scoreLabel: {
    sound: "Son",
    anc: "ANC",
    battery: "Batterie",
    sport: "Sport",
    mic: "Microphone",
    comfort: "Confort",
  },
  steps: [
    { title: "Quel est ton budget ?", sub: "Choisis ton budget maximum." },
    { title: "Quelle marque ?", sub: "Filtrer par une marque spécifique ?" },
    { title: "À quoi vont-ils servir ?", sub: "Sélection multiple possible." },
    { title: "Tes priorités ?", sub: "Choisis jusqu'à 3 — l'ordre compte." },
  ],
  back: "Retour",
  next: "Suivant →",
  showResults: "Voir les résultats →",
  restart: "Recommencer",
  top3Title: "Ton Top 3",
  top3Sub: "Classé selon tes préférences.",
  whyLabel: "Pourquoi ?",
  scoreShort: "Score",
  rankLabels: ["1ère place", "2ème place", "3ème place"],
  budgetBadge: {
    budget: "Entrée de gamme",
    mid: "Milieu de gamme",
    premium: "Premium",
  },
  contradiction1Title: "Hmm… c'est compliqué.",
  cheapestModelPrefix: "Le modèle",
  cheapestModelSuffix: "le moins cher coûte",
  aboveYourBudget: (gap) => `— soit €${gap} de plus que ton budget.`,
  contradiction1Sub:
    "Ce que tu cherches n'existe pas dans cette combinaison. Réessaie !",
  retryBtn: "Réessayer →",
  bestAlt: "Meilleure alternative pour ton budget",
  einsteinQuote:
    "«La définition de la folie, c'est de faire toujours la même chose et de s'attendre à un résultat différent.»",
  contradiction2Line1: (brand, price) =>
    `Soyons honnêtes : les produits ${brand} commencent à €${price}.`,
  contradiction2Line2: (capLabel, gap) =>
    `Ton budget (${capLabel}) ne suffit pas — il te faut au moins €${gap} de plus.`,
  adjustBudget: "Ajuster le budget →",
  goldenWhy: "Pourquoi",
  goldenHow: "Comment",
  goldenWhat: "Quoi",
  searchPlaceholder: "Nom, marque ou usage…",
  noProducts: "Aucun produit trouvé.",
  homeHeroTitle: "Compare Smart",
  homeHeroSub: "Trouve le meilleur produit. Instantanément.",
  categoriesHeading: "Toutes les catégories",
  categoryCardCta: "Comparer →",
  noCategoriesYet: "Aucune catégorie disponible pour l'instant.",
  footerImprint: "Mentions légales",
  footerPrivacy: "Politique de confidentialité",
  affiliateNotice:
    "Cette comparaison contient des liens affiliés. Si vous achetez via ces liens, nous recevons une petite commission — sans frais supplémentaires pour vous. Nos recommandations restent indépendantes.",
};

export const translations: Record<Lang, Translation> = { de, en, fr };

export const langMeta: Record<Lang, { flag: string; short: string }> = {
  de: { flag: "🇩🇪", short: "DE" },
  en: { flag: "🇬🇧", short: "EN" },
  fr: { flag: "🇫🇷", short: "FR" },
};
