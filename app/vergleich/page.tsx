import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Vergleiche & Tests | Compare Smart",
  description:
    "Direkte Produktvergleiche mit echten Scores und klarer Kaufempfehlung. Earbuds, Kopfhörer, Tech – ehrlich und auf den Punkt.",
  openGraph: {
    title: "Vergleiche & Tests | Compare Smart",
    description:
      "Direkte Produktvergleiche mit echten Scores und klarer Kaufempfehlung.",
    url: "https://compare.byamarex.com/vergleich",
    siteName: "Compare Smart",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://compare.byamarex.com/vergleich",
  },
};

export default function VergleichIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-slate-900 px-4 pt-10 pb-12">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-4"
          >
            ← Zur Startseite
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Vergleiche & Tests
          </h1>
          <p className="text-blue-400 font-semibold mt-1">
            Direkte Vergleiche. Klare Empfehlung.
          </p>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Die wichtigsten Produkte direkt gegenübergestellt – mit echten Scores
            und ehrlicher Kaufempfehlung pro Profil.
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">
          Aktuelle Vergleiche
        </h2>

        {articles.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-12">
            Noch keine Vergleiche veröffentlicht.
          </p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white px-4 py-5">
        <div className="max-w-2xl mx-auto flex gap-4">
          <Link
            href="/impressum"
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
          >
            Datenschutz
          </Link>
        </div>
      </div>
    </div>
  );
}
