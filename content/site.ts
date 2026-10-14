import { type Localized } from "@/lib/i18n";

export type NavItem = { href: `#${string}`; label: Localized };

/** Main navigation. Anchors on the home page until the inner pages exist. */
export const navItems: NavItem[] = [
  { href: "#tinto", label: { pt: "Tinto", en: "Red" } },
  { href: "#branco", label: { pt: "Branco", en: "White" } },
  { href: "#quinta", label: { pt: "A Quinta", en: "The vineyard" } },
  {
    href: "#processo",
    label: { pt: "Do xisto ao copo", en: "From schist to glass" },
  },
  { href: "#agenda", label: { pt: "Agenda", en: "Events" } },
  { href: "#contacto", label: { pt: "Contacto", en: "Contact" } },
];

export const socials = {
  instagram: "https://www.instagram.com/aromas_do_coa/",
  facebook: "https://www.facebook.com/quintadaafricana",
} as const;

export const place: Localized = {
  pt: "Vila Nova de Foz Côa, Douro, Portugal",
  en: "Vila Nova de Foz Côa, Douro, Portugal",
};
