import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { xoArenaLoadingClassNames as styles } from "./loading.class-names";
import artwork from "./loading.module.css";

export default function XoArenaLoading() {
  const t = useTranslations("Routes");

  return (
    <div className={styles.root} role="status" aria-live="polite">
      <div className={styles.board} aria-hidden="true">
        <span className={cn(styles.cell, artwork.cell)}>X</span>
        <span className={cn(styles.cell, artwork.cell)} />
        <span className={cn(styles.cell, artwork.cell)}>O</span>
        <span className={cn(styles.cell, artwork.cell)} />
        <span className={cn(styles.cell, artwork.cell)}>X</span>
        <span className={cn(styles.cell, artwork.cell)}>O</span>
        <span className={cn(styles.cell, artwork.cell)} />
        <span className={cn(styles.cell, artwork.cell)}>X</span>
        <span className={cn(styles.cell, artwork.cell)}>O</span>
      </div>
      <p className={styles.label}>{t("xoLoading")}</p>
    </div>
  );
}
