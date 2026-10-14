import Image from "next/image";
import NextLink from "next/link";

import { type Dictionary } from "@/app/[lang]/dictionaries";
import symbol from "@/assets/brand/symbol.png";
import { HeaderShell } from "@/components/layout/header-shell";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LinkButton } from "@/components/ui/link-button";
import { navItems } from "@/content/site";
import { type Locale } from "@/lib/i18n";

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <HeaderShell>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-4 md:px-8">
        <div className="flex w-56 items-center">
          <NextLink
            href={`/${lang}`}
            aria-label={dict.nav.home}
            className="flex items-center"
          >
            <Image src={symbol} alt="" height={30} preload />
          </NextLink>
        </div>

        <nav
          aria-label={dict.nav.label}
          className="hidden gap-9 text-sm font-medium whitespace-nowrap xl:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-70"
            >
              {item.label[lang]}
            </a>
          ))}
        </nav>

        <div className="flex w-56 items-center justify-end gap-3 md:gap-5">
          <LanguageSwitch lang={lang} label={dict.nav.language} />
          <LinkButton href="#contacto" size="sm" className="px-4">
            {dict.nav.buy}
          </LinkButton>
          <MobileNav
            lang={lang}
            items={navItems}
            labels={{
              menu: dict.nav.menu,
              close: dict.nav.close,
              nav: dict.nav.label,
            }}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
