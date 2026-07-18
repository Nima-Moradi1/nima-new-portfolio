import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routeStateClassNames as styles } from "@/app/route-state.class-names";

export default function NotFound() {
  const t = useTranslations("Routes");

  return (
    <main className={styles.message}>
      <p className={styles.eyebrow}>{t("notFoundEyebrow")}</p>
      <h1 className={styles.title}>{t("notFoundTitle")}</h1>
      <Link className={styles.link} href="/">
        {t("notFoundReturn")}
      </Link>
    </main>
  );
}
