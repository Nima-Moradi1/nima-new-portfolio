import { useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { BootLoader } from "@/components/kinetic/boot-loader";

export default function Loading() {
  const t = useTranslations("Routes");
  const { identity } = usePortfolio();

  return (
    <BootLoader visible name={identity.name} status={t("loading")} />
  );
}
