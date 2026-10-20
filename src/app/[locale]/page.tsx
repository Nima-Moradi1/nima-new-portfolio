import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { KineticExperience } from "@/components/kinetic/kinetic-experience";
import { getKineticContent } from "@/content/kinetic-content";
import { materializePortfolio } from "@/content/portfolio";
import { routing } from "@/i18n/routing";
import type { PortfolioContent } from "@/types/portfolio";

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ view?: string; item?: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [messages, query] = await Promise.all([getMessages({ locale }), searchParams]);
  return <KineticExperience key={locale} locale={locale} content={materializePortfolio(messages.Portfolio as PortfolioContent)} copy={getKineticContent(locale)} initialMode={query.view === "experience" ? "experience" : "projects"} initialItem={query.item} />;
}
