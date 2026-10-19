import { type Locale, type Localized } from "@/lib/i18n";

/** Anchors (`#tinto`) point into the home page; paths (`/about`) are inner pages. */
export type NavItem = { href: `#${string}` | `/${string}`; label: Localized };

/** Main navigation. */
export const navItems: NavItem[] = [
  { href: "#tinto", label: { pt: "Tinto", en: "Red" } },
  { href: "#branco", label: { pt: "Branco", en: "White" } },
  { href: "/about", label: { pt: "A nossa história", en: "Our story" } },
  {
    href: "#processo",
    label: { pt: "Do chão à garrafa", en: "Soil to bottle" },
  },
  { href: "#agenda", label: { pt: "Agenda", en: "Events" } },
  { href: "#contacto", label: { pt: "Contacto", en: "Contact" } },
];

/** Resolve a nav href for a locale, so home anchors also work from inner pages. */
export function localeHref(lang: Locale, href: NavItem["href"]): string {
  return `/${lang}${href}`;
}

export const socials = {
  instagram: "https://www.instagram.com/aromas_do_coa/",
  facebook: "https://www.facebook.com/quintadaafricana",
} as const;

export const place: Localized = {
  pt: "Vila Nova de Foz Côa, Douro, Portugal",
  en: "Vila Nova de Foz Côa, Douro, Portugal",
};
