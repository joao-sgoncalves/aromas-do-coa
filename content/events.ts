import { type Localized } from "@/lib/i18n";

export type WineEvent = {
  /** ISO dates, local time in Portugal. */
  start: string;
  end: string;
  title: Localized;
  details: Localized;
  href?: string;
};

// TODO(family): confirm the year and details; this edition was announced on Instagram.
export const events: WineEvent[] = [
  {
    start: "2026-11-28",
    end: "2026-11-29",
    title: {
      pt: "Vinhos no Mercado, especial de Natal",
      en: "Vinhos no Mercado, Christmas edition",
    },
    details: {
      pt: "Mercado Ferreira Borges, Porto. 28 e 29 de novembro, das 14h às 20h.",
      en: "Mercado Ferreira Borges, Porto. 28 and 29 November, 2pm to 8pm.",
    },
  },
];

/** Events that have not ended yet, soonest first. */
export function upcomingEvents(now = new Date()): WineEvent[] {
  const today = now.toISOString().slice(0, 10);
  return events
    .filter((event) => event.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start));
}
