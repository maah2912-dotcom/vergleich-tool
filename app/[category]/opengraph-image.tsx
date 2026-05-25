import { ImageResponse } from "next/og";
import { Ear } from "lucide-react";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export const alt = "Produktvergleich – Compare Smart";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  const categoryName = category?.nameDe ?? slug;
  const count = products.length;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 80px",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "52px",
          }}
        >
          <span
            style={{
              color: "#60a5fa",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "3px",
            }}
          >
            COMPARE SMART
          </span>
          <span style={{ color: "#334155", fontSize: "18px" }}>›</span>
          <span style={{ color: "#475569", fontSize: "15px" }}>Vergleich</span>
        </div>

        {/* Icon + Category name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            marginBottom: "20px",
          }}
        >
          {category?.icon === "headphones" ? (
            <div style={{ display: "flex", color: "#f8fafc" }}>
              <Ear size={72} />
            </div>
          ) : category?.icon ? (
            <span style={{ fontSize: "72px", lineHeight: 1, display: "flex" }}>
              {category.icon}
            </span>
          ) : null}
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.05,
            }}
          >
            {categoryName}
          </span>
        </div>

        {/* Subtitle */}
        <div style={{ display: "flex", marginBottom: "48px" }}>
          <span style={{ fontSize: "26px", color: "#94a3b8", fontWeight: 400 }}>
            Vergleich · von Budget bis Premium
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            height: "1px",
            width: "480px",
            background: "#1e293b",
            marginBottom: "32px",
          }}
        />

        {/* Stats */}
        <div style={{ display: "flex", gap: "0px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", paddingRight: "32px" }}>
            <span style={{ fontSize: "40px", fontWeight: 800, color: "#60a5fa" }}>
              {count}
            </span>
            <span style={{ fontSize: "14px", color: "#475569" }}>kuratierte Modelle</span>
          </div>

          <div
            style={{
              width: "1px",
              height: "52px",
              background: "#1e293b",
              marginRight: "32px",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", paddingRight: "32px" }}>
            <span style={{ fontSize: "40px", fontWeight: 800, color: "#8b5cf6" }}>4</span>
            <span style={{ fontSize: "14px", color: "#475569" }}>Fragen zum Ergebnis</span>
          </div>

          <div
            style={{
              width: "1px",
              height: "52px",
              background: "#1e293b",
              marginRight: "32px",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "40px", fontWeight: 800, color: "#14b8a6" }}>3</span>
            <span style={{ fontSize: "14px", color: "#475569" }}>Top-Empfehlungen</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
