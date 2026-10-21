import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { KineticExperience } from "@/components/kinetic/kinetic-experience";
import { getKineticContent } from "@/content/kinetic-content";
import { materializePortfolio } from "@/content/portfolio";
import { routing } from "@/i18n/routing";
import type { PortfolioContent } from "@/types/portfolio";

export const dynamic = "force-static";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  // Query selection is restored by the existing client history controller.
  // Keeping the home static sends the real hero in the first response instead
  // of hiding it in a streamed segment behind the route loader's JS handoff.
  const messages = await getMessages({ locale });
  return <KineticExperience key={locale} locale={locale} content={materializePortfolio(messages.Portfolio as PortfolioContent)} copy={getKineticContent(locale)} />;
}
