import { useTranslations } from "next-intl";
import { routeStateClassNames as styles } from "@/app/route-state.class-names";

export default function Loading() {
  const t = useTranslations("Routes");

  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <span className={styles.loadingCore} aria-hidden="true" />
      <p className={styles.loadingLabel}>{t("loading")}</p>
    </div>
  );
}
