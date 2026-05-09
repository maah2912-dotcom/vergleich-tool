import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import CategoryPageClient from "@/components/CategoryPageClient";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  const title = `${category.nameDe} Vergleich 2026 – Compare Smart`;
  const description = `Die besten ${category.nameDe} für Sport, Reisen, Büro und Alltag. ${category.descriptionDe} – 4 Fragen, 3 Empfehlungen, von Budget bis Premium.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://compare.byamarex.com/${slug}`,
      siteName: "Compare Smart",
      locale: "de_DE",
      type: "website",
    },
    alternates: {
      canonical: `https://compare.byamarex.com/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.nameDe} Vergleich – Compare Smart`,
    description: category.descriptionDe,
    url: `https://compare.byamarex.com/${slug}`,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: { "@type": "Brand", name: p.brand },
        description: p.note,
        ...(p.affiliate_url
          ? { offers: { "@type": "Offer", url: p.affiliate_url, availability: "https://schema.org/InStock" } }
          : {}),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPageClient initialProducts={products} category={category} />
    </>
  );
}
