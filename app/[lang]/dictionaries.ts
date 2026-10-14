import { type Locale } from "@/lib/i18n";

export type Dictionary = typeof import("@/app/[lang]/dictionaries/pt.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pt: () => import("@/app/[lang]/dictionaries/pt.json").then((m) => m.default),
  en: () => import("@/app/[lang]/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

/** Fill `{name}` style placeholders in dictionary strings. */
export function format(
  text: string,
  values: Record<string, string | number>,
): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? `{${key}}`),
  );
}
