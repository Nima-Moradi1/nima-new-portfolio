import { routing, type AppLocale } from "@/i18n/routing";

export const projectOgLocales: Record<AppLocale, string> = {
  en: "en_US",
  fa: "fa_IR",
  de: "de_DE",
};

export function localizedProjectPath(locale: AppLocale, slug: string) {
  const pathname = `/projects/${slug}`;
  return locale === routing.defaultLocale ? pathname : `/${locale}${pathname}`;
}

export function projectLanguages(slug: string) {
  return {
    en: localizedProjectPath("en", slug),
    fa: localizedProjectPath("fa", slug),
    de: localizedProjectPath("de", slug),
    "x-default": localizedProjectPath(routing.defaultLocale, slug),
  };
}
