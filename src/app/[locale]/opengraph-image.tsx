import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { materializePortfolio } from "@/content/portfolio";
import { routing } from "@/i18n/routing";
import type { PortfolioContent } from "@/types/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Nima Moradirad | Senior Frontend Engineer | React & Next.js";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const [messages, fontData, preview] = await Promise.all([
    getMessages({ locale }),
    readFile(join(process.cwd(), "src/assets/fonts/Vazirmatn-Regular.ttf")),
    readFile(
      join(process.cwd(), "public/assets/projects/3d-online-shop/share.jpg"),
    ),
  ]);
  const portfolio = materializePortfolio(
    messages.Portfolio as PortfolioContent,
  );
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 64,
        background: "#090b0a",
        color: "#f1f4ec",
        fontFamily: "Vazirmatn",
        alignItems: "center",
        gap: 40,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 610 }}>
        <div style={{ fontSize: 30, color: "#b8ff45", marginBottom: 28 }}>
          {portfolio.identity.name}
        </div>
        <div style={{ fontSize: 64, lineHeight: 1.2 }}>
          {portfolio.identity.role}
        </div>
        <div style={{ fontSize: 28, color: "#c9cec6", marginTop: 28 }}>
          React / Next.js / TypeScript
        </div>
        <div style={{ fontSize: 23, color: "#c9cec6", marginTop: 36 }}>
          nimamoradirad.com
        </div>
      </div>
      {/* Actual project imagery, rather than an invented product screenshot. */}
      <img
        src={`data:image/jpeg;base64,${preview.toString("base64")}`}
        width={390}
        height={390}
        alt=""
        style={{ objectFit: "cover", borderRadius: 16 }}
      />
    </div>,
    {
      ...size,
      fonts: [
        { name: "Vazirmatn", data: fontData, weight: 400, style: "normal" },
      ],
    },
  );
}
