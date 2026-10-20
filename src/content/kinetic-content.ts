import type { AppLocale } from "@/i18n/routing";
import de from "@/messages/de/kinetic.json";
import en from "@/messages/en/kinetic.json";
import fa from "@/messages/fa/kinetic.json";
import type { KineticContent } from "@/types/kinetic-content";

const content: Record<AppLocale, KineticContent> = {
  de: de as KineticContent,
  en: en as KineticContent,
  fa: fa as KineticContent,
};

/** Narrative copy is separate from the canonical project and employment records. */
export function getKineticContent(locale: AppLocale): KineticContent {
  return content[locale];
}

export type { KineticContent } from "@/types/kinetic-content";
