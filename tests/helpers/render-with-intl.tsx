import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactElement, ReactNode } from "react";
import type { AppLocale } from "@/i18n/routing";
import deMessages from "@/messages/de";
import enMessages from "@/messages/en";
import faMessages from "@/messages/fa";

export const testMessages = {
  en: enMessages,
  fa: faMessages,
  de: deMessages,
} satisfies Record<AppLocale, typeof enMessages>;

type IntlRenderOptions = Omit<RenderOptions, "wrapper"> & {
  locale?: AppLocale;
};

export function renderWithIntl(
  ui: ReactElement,
  { locale = "en", ...renderOptions }: IntlRenderOptions = {},
): RenderResult {
  function IntlWrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider
        locale={locale}
        messages={testMessages[locale]}
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    );
  }

  return render(ui, { wrapper: IntlWrapper, ...renderOptions });
}
