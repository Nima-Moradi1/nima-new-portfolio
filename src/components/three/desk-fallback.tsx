import { useTranslations } from "next-intl";
import artwork from "./desk-fallback.module.css";

export function DeskFallback() {
  const t = useTranslations("Studio");

  return (
    <div
      className={`desk-fallback ${artwork.root}`}
      role="img"
      aria-label={t("fallbackAlt")}
    >
      <span className={`desk-fallback__chair ${artwork.chair}`} />
      <span className={`desk-fallback__person ${artwork.person}`} />
      <span className={`desk-fallback__hair ${artwork.hair}`} />
      <span className={`desk-fallback__desk ${artwork.desk}`} />
      <span className={`desk-fallback__monitor ${artwork.monitor}`}>
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className={`desk-fallback__keyboard ${artwork.keyboard}`} />
      <span className={`desk-fallback__resume ${artwork.resume}`} />
      <span className={`desk-fallback__lamp ${artwork.lamp}`} />
    </div>
  );
}
