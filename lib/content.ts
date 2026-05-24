import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "vergleich");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  products: string[];
  readingTime: number;
  featured: boolean;
}

export interface Article extends ArticleMeta {
  content: string;
}

function readArticleFile(filename: string): Article | null {
  if (!filename.endsWith(".mdx")) return null;
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    publishedAt: String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    category: String(data.category ?? ""),
    products: Array.isArray(data.products) ? data.products.map(String) : [],
    readingTime: Number(data.readingTime ?? 0),
    featured: Boolean(data.featured),
    content,
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR);
  const articles = files
    .map(readArticleFile)
    .filter((a): a is Article => a !== null);
  articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readArticleFile(`${slug}.mdx`);
}
