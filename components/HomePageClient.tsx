"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { Ear } from "lucide-react";
import { getCategories } from "@/lib/categories";
import { translations, type Lang } from "@/lib/i18n";
import type { Category } from "@/lib/types";

function CategoryIcon({ icon }: { icon: string }) {
  if (icon === "headphones") return <Ear size={40} />;
  return <span>{icon}</span>;
}

const LangCtx = createContext<Lang>("de");
function useLang() {
  return translations[useContext(LangCtx)];
}

function CategoryCard({ category, lang }: { category: Category; lang: Lang }) {
  const t = translations[lang];
  const name =
    lang === "de" ? category.nameDe : lang === "en" ? category.nameEn : category.nameFr;
  const description =
    lang === "de"
      ? category.descriptionDe
      : lang === "en"
        ? category.descriptionEn
        : category.descriptionFr;

  return (
    <Link href={`/${category.slug}`}>
      <div className="group rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
        <div className="text-slate-900 mb-4 flex items-center">
          <CategoryIcon icon={category.icon} />
        </div>
        <h2 className="font-bold text-slate-900 text-lg leading-tight mb-2">{name}</h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-5">{description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
          {t.categoryCardCta}
        </span>
      </div>
    </Link>
  );
}

function HomePage({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = useLang();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-slate-900 px-4 pt-10 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{t.homeHeroTitle}</h1>
              <p className="text-blue-400 font-semibold mt-1">{t.homeHeroSub}</p>
            </div>
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
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-lg mx-auto px-4 py-8 pb-24">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">
          {t.categoriesHeading}
        </h2>

        {loading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-slate-100 bg-white p-6 animate-pulse"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl mb-4" />
                <div className="h-5 bg-slate-100 rounded w-2/3 mb-2" />
                <div className="h-4 bg-slate-100 rounded w-full mb-1" />
                <div className="h-4 bg-slate-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {!loading && categories.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-12">{t.noCategoriesYet}</p>
        )}

        {!loading && (
          <div className="space-y-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} lang={lang} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white px-4 py-5">
        <div className="max-w-lg mx-auto flex gap-4">
          <Link
            href="/impressum"
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
          >
            {t.footerImprint}
          </Link>
          <Link
            href="/datenschutz"
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
          >
            {t.footerPrivacy}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePageClient() {
  const [lang, setLang] = useState<Lang>("de");

  return (
    <LangCtx.Provider value={lang}>
      <HomePage lang={lang} setLang={setLang} />
    </LangCtx.Provider>
  );
}
