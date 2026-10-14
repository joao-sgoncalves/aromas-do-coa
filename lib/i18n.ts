export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pick the text for the current locale from a `{ pt, en }` pair. */
export type Localized = Record<Locale, string>;

export function t(text: Localized, locale: Locale): string {
  return text[locale];
}

export const htmlLang: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
};
