import Link from "next/link";
import type { ArticleMeta } from "@/lib/content";

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

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/vergleich/${article.slug}`}>
      <article className="group rounded-2xl border-2 border-slate-100 bg-white p-6 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {article.readingTime} Min. Lesezeit
          </span>
        </div>
        <h2 className="font-bold text-slate-900 text-lg leading-tight mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          <time
            dateTime={article.publishedAt}
            className="text-xs text-slate-400 font-medium"
          >
            {formatDate(article.publishedAt)}
          </time>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
            Vergleich lesen →
          </span>
        </div>
      </article>
    </Link>
  );
}
