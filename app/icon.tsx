import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#111111",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: "20px",
            letterSpacing: "-1px",
            backgroundImage:
              "linear-gradient(to bottom, #ffffff 0%, #dddddd 50%, #999999 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          CS
        </div>
      </div>
    ),
    { ...size }
  );
}
