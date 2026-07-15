import { ImageResponse } from "next/og";
import { portfolio } from "@/content/portfolio";

export const alt = `${portfolio.identity.name} — senior front-end engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#090b0a",
        color: "#f3f6ef",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "64px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(184,255,69,.35)",
          borderRadius: 999,
          height: 310,
          position: "absolute",
          right: 90,
          top: 150,
          transform: "rotate(-18deg)",
          width: 310,
        }}
      />
      <div
        style={{
          background: "#b8ff45",
          borderRadius: 999,
          boxShadow: "0 0 90px rgba(184,255,69,.45)",
          height: 160,
          position: "absolute",
          right: 165,
          top: 225,
          width: 160,
        }}
      />
      <div style={{ color: "#b8ff45", display: "flex", fontSize: 25 }}>
        SIGNAL ATELIER · PORTFOLIO
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: 760 }}>
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 650,
            letterSpacing: "-0.055em",
            lineHeight: 0.98,
          }}
        >
          Digital systems with signal.
        </div>
        <div
          style={{
            color: "#9da59a",
            display: "flex",
            fontSize: 24,
            marginTop: 28,
          }}
        >
          {portfolio.identity.name} · {portfolio.identity.role}
        </div>
      </div>
    </div>,
    size,
  );
}
