"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { routeStateClassNames as styles } from "@/app/route-state.class-names";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Routes");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.message}>
      <p className={styles.eyebrow}>{t("errorEyebrow")}</p>
      <h1 className={styles.title}>{t("errorTitle")}</h1>
      <p className={styles.description}>{t("errorDescription")}</p>
      <button className={styles.button} type="button" onClick={reset}>
        {t("errorRetry")}
      </button>
    </main>
  );
}
