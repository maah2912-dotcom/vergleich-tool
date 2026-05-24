import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#111111",
          borderRadius: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: "110px",
            letterSpacing: "-4px",
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
