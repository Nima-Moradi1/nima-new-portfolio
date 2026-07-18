import { useTranslations } from "next-intl";

export function DeskFallback() {
  const t = useTranslations("Studio");

  return (
    <div className="desk-fallback" role="img" aria-label={t("fallbackAlt")}>
      <span className="desk-fallback__chair" />
      <span className="desk-fallback__person" />
      <span className="desk-fallback__hair" />
      <span className="desk-fallback__desk" />
      <span className="desk-fallback__monitor">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="desk-fallback__keyboard" />
      <span className="desk-fallback__resume" />
      <span className="desk-fallback__lamp" />
    </div>
  );
}
