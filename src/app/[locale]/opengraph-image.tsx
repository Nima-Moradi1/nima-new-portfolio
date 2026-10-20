import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { materializePortfolio } from "@/content/portfolio";
import deCommon from "@/messages/de/common.json";
import enCommon from "@/messages/en/common.json";
import faCommon from "@/messages/fa/common.json";
import { getLocaleDirection, routing, type AppLocale } from "@/i18n/routing";
import type { PortfolioContent } from "@/types/portfolio";

const imageSize = { width: 1200, height: 630 };
const openGraphAltByLocale = {
  de: deCommon.Metadata.openGraphAlt,
  en: enCommon.Metadata.openGraphAlt,
  fa: faCommon.Metadata.openGraphAlt,
} satisfies Record<AppLocale, string>;

type ImageParams = { locale: string };

export function generateImageMetadata({ params }: { params: ImageParams }) {
  const locale = hasLocale(routing.locales, params.locale)
    ? params.locale
    : routing.defaultLocale;

  return [
    {
      id: "default",
      alt: openGraphAltByLocale[locale],
      size: imageSize,
      contentType: "image/png",
    },
  ];
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<ImageParams>;
  id: Promise<string | number>;
}) {
  const { locale: requestedLocale } = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const [t, messages, fontData] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getMessages({ locale }),
    readFile(
      join(process.cwd(), "src", "assets", "fonts", "Vazirmatn-Regular.ttf"),
    ),
  ]);
  const portfolio = materializePortfolio(
    messages.Portfolio as PortfolioContent,
  );
  const isRtl = getLocaleDirection(locale) === "rtl";
  const artPosition = isRtl ? { left: 60 } : { right: 60 };

  return new ImageResponse(
    <div
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        alignItems: "stretch",
        background: "#05070b",
        color: "#f4f7fc",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Vazirmatn",
        height: "100%",
        justifyContent: "space-between",
        padding: "64px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          ...artPosition,
          display: "flex",
          height: 420,
          position: "absolute",
          top: 120,
          transform: "rotate(8deg)",
          width: 350,
        }}
      >
        <svg width="350" height="420" viewBox="0 0 350 420" fill="none">
          <path d="m76 15 194 15 43 45-14 301-199 25-54-42Z" fill="#10141e" stroke="#354153" strokeWidth="2" />
          <path d="m76 15 24 386-54-42V70Z" fill="#1a2330" />
          <path d="m270 30 43 45-14 301-27-28Z" fill="#1a2330" />
          <path d="m84 53 173 11 13 280-158 20Z" fill="#151b26" />
          <path d="m95 83 164 10" stroke="#8be9f4" strokeWidth="3" />
          <path d="M105 263V156h25l42 65v-65h25v107h-25l-42-65v65h-25Zm101 0V156h22l24 42 24-42h22v107h-25v-59l-21 34-21-34v59h-25Z" fill="#f4f7fc" opacity="0.85" transform="translate(-12 0) scale(.96 1)" />
          <path d="m113 310 142-12" stroke="#354153" strokeWidth="2" />
        </svg>
      </div>
      <div
        style={{
          color: "#8be9f4",
          display: "flex",
          fontSize: 25,
          justifyContent: isRtl ? "flex-end" : "flex-start",
        }}
      >
        {t("openGraphLabel")}
      </div>
      <div
        style={{
          alignItems: isRtl ? "flex-end" : "flex-start",
          alignSelf: isRtl ? "flex-end" : "flex-start",
          display: "flex",
          flexDirection: "column",
          textAlign: isRtl ? "right" : "left",
          width: 720,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: isRtl ? 64 : 82,
            fontWeight: 400,
            lineHeight: 1.08,
          }}
        >
          {t("openGraphHeadline")}
        </div>
        <div
          style={{
            color: "#99a5b8",
            display: "flex",
            fontSize: 24,
            marginTop: 28,
          }}
        >
          {portfolio.identity.name} · {portfolio.identity.role}
        </div>
      </div>
    </div>,
    {
      ...imageSize,
      fonts: [
        {
          name: "Vazirmatn",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
