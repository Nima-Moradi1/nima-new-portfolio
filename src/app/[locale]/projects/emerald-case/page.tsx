import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { EvidenceCaseStudy } from "@/components/projects/evidence-case-study";
import { evidenceMetadata } from "@/lib/evidence-metadata";
import { routing } from "@/i18n/routing";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return evidenceMetadata("emerald-case", locale);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <EvidenceCaseStudy slug="emerald-case" locale={locale} />;
}
