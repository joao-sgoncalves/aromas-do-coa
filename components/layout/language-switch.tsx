import { cn } from "@heroui/react";
import NextLink from "next/link";

import { type Locale, locales } from "@/lib/i18n";

export function LanguageSwitch({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  return (
    <nav
      aria-label={label}
      className="flex items-center gap-3 text-[13px] font-medium"
    >
      {locales.map((locale) => (
        <NextLink
          key={locale}
          href={`/${locale}`}
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
