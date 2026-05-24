import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import ProductCompareTable from "@/components/ProductCompareTable";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `https://compare.byamarex.com/vergleich/${slug}`;

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: "Compare Smart",
      locale: "de_DE",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
    },
    alternates: {
      canonical: url,
    },
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const mdxComponents = {
  ProductCompareTable,
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const url = `https://compare.byamarex.com/vergleich/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Compare Smart",
      url: "https://compare.byamarex.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Compare Smart",
      url: "https://compare.byamarex.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-slate-900 px-4 pt-10 pb-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/vergleich"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-5"
            >
              ← Alle Vergleiche
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300">
                {article.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {article.readingTime} Min. Lesezeit
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-slate-300 mt-3 leading-relaxed">
              {article.description}
            </p>
            <time
              dateTime={article.publishedAt}
              className="block text-xs text-slate-500 font-medium mt-4"
            >
              Veröffentlicht am {formatDate(article.publishedAt)}
            </time>
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-slate-900">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{ blockJS: false }}
            />
          </article>

          {/* Footer CTA */}
          <div className="mt-12 rounded-2xl border-2 border-slate-100 bg-white p-6 text-center">
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              Noch unsicher?
            </h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              Beantworte 4 Fragen und finde in 30 Sekunden dein perfektes
              Produkt – ganz ohne Vergleichstabellen-Stress.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all shadow-sm shadow-blue-200"
            >
              Zum Produkt-Finder →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-white px-4 py-5 mt-12">
          <div className="max-w-4xl mx-auto flex gap-4">
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
    </>
  );
}
