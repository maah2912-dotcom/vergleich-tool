import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Compare Smart – Smarte Produktvergleiche in 3 Schritten",
  description:
    "4 Fragen. 3 Empfehlungen. Keine Kompromisse. Finde das beste Produkt für dein Budget und deine Anforderungen – von Budget bis Premium, kuratiert und ehrlich bewertet.",
  openGraph: {
    title: "Compare Smart – Smarte Produktvergleiche in 3 Schritten",
    description:
      "4 Fragen. 3 Empfehlungen. Keine Kompromisse. Finde das beste Produkt für dein Budget und deine Anforderungen.",
    url: "https://compare.byamarex.com",
    siteName: "Compare Smart",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://compare.byamarex.com",
  },
};

export default function Home() {
  return <HomePageClient />;
}
