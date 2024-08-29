import createIntlMiddleware from "next-intl/middleware";

import { E_SupportedLocales } from "@/core";

const locales = Object.values(E_SupportedLocales);

export const I18NMiddleware = createIntlMiddleware({
  locales,
  localeDetection: true,
  defaultLocale: E_SupportedLocales.EN,
});
