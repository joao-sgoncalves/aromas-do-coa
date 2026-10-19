import { cn } from "@heroui/react";
import { type Route } from "next";
import NextLink from "next/link";

import { type Locale, locales } from "@/lib/i18n";

export function LanguageSwitch({
  lang,
  label,
  path = "",
}: {
  lang: Locale;
  label: string;
  /** Path after the locale, so switching language keeps the reader on the same page. */
  path?: string;
}) {
  return (
    <nav
      aria-label={label}
      className="flex items-center gap-3 text-[13px] font-medium"
    >
      {locales.map((locale) => (
        <NextLink
          key={locale}
          href={`/${locale}${path}` as Route}
          hrefLang={locale}
          aria-current={locale === lang ? "true" : undefined}
          className={cn(
            "uppercase transition-opacity hover:opacity-100",
            locale === lang ? "opacity-100" : "opacity-60",
          )}
        >
          {locale}
        </NextLink>
      ))}
    </nav>
  );
}
