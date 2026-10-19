import { format } from "@/app/[lang]/dictionaries";
import en from "@/app/[lang]/dictionaries/en.json";
import pt from "@/app/[lang]/dictionaries/pt.json";
import { upcomingEvents } from "@/content/events";
import { localeHref } from "@/content/site";
import { newestVintage, wines } from "@/content/wines";
import { isLocale } from "@/lib/i18n";

test("isLocale accepts only the supported languages", () => {
  expect(isLocale("pt")).toBe(true);
  expect(isLocale("en")).toBe(true);
  expect(isLocale("fr")).toBe(false);
});

test("format fills placeholders and leaves unknown ones visible", () => {
  expect(
    format("Garrafa de {name} {year}", { name: "Tinto", year: 2024 }),
  ).toBe("Garrafa de Tinto 2024");
  expect(format("{missing}", {})).toBe("{missing}");
});

test("both dictionaries have the same keys", () => {
  const keys = (value: unknown, prefix = ""): string[] =>
    value && typeof value === "object"
      ? Object.entries(value).flatMap(([k, v]) => keys(v, `${prefix}${k}.`))
      : [prefix];

  expect(keys(en).sort()).toEqual(keys(pt).sort());
});

test("newestVintage picks the latest year of each wine", () => {
  const years = Object.fromEntries(
    wines.map((w) => [w.slug, newestVintage(w).year]),
  );
  expect(years).toEqual({ tinto: 2024, branco: 2024 });
});

test("upcomingEvents drops events that have ended", () => {
  expect(upcomingEvents(new Date("2099-01-01"))).toEqual([]);
});

test("localeHref points home anchors and inner pages at the locale", () => {
  expect(localeHref("pt", "#tinto")).toBe("/pt#tinto");
  expect(localeHref("en", "/about")).toBe("/en/about");
});
