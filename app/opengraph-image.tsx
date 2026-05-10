import { ImageResponse } from "next/og";

export const alt = "Compare Smart – Smarte Produktvergleiche in 3 Schritten";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SCORES = [
  { label: "Sound", val: 9, color: "#3b82f6" },
  { label: "ANC", val: 8, color: "#6366f1" },
  { label: "Akku", val: 7, color: "#8b5cf6" },
  { label: "Sport", val: 6, color: "#ec4899" },
  { label: "Mikro", val: 7, color: "#f97316" },
  { label: "Komfort", val: 8, color: "#14b8a6" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          padding: "64px 72px",
        }}
      >
        {/* Left: main content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Brand badge */}
          <div
            style={{
              display: "flex",
              background: "rgba(59,130,246,0.12)",
              borderRadius: "8px",
              padding: "8px 18px",
              marginBottom: "52px",
              width: "220px",
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
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "68px",
                fontWeight: 800,
                color: "#f8fafc",
                lineHeight: 1.08,
              }}
            >
              Smarte Produkt-
            </span>
            <span
              style={{
                fontSize: "68px",
                fontWeight: 800,
                color: "#60a5fa",
                lineHeight: 1.08,
              }}
            >
              vergleiche.
            </span>
          </div>

          {/* Subtitle */}
          <div style={{ display: "flex", marginTop: "22px" }}>
            <span style={{ fontSize: "26px", color: "#94a3b8", fontWeight: 400 }}>
              in 3 Schritten
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              height: "1px",
              width: "340px",
              background: "#1e293b",
              marginTop: "48px",
              marginBottom: "24px",
            }}
          />

          {/* Tagline pills */}
          <div style={{ display: "flex", gap: "10px" }}>
            {["4 Fragen", "3 Empfehlungen", "Keine Kompromisse"].map((text, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  padding: "7px 16px",
                  background: "#1e293b",
                  borderRadius: "20px",
                  color: "#64748b",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right: decorative score bars */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            justifyContent: "center",
            paddingLeft: "64px",
            width: "230px",
          }}
        >
          {SCORES.map(({ label, val, color }, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b", fontSize: "13px" }}>{label}</span>
                <span style={{ color: "#475569", fontSize: "13px" }}>{val}/10</span>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "8px",
                  width: "100%",
                  background: "#1e293b",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${val * 10}%`,
                    height: "100%",
                    background: color,
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
