import { LinkButton } from "@/components/ui/link-button";
import { type WineEvent } from "@/content/events";
import { type Locale } from "@/lib/i18n";

type NextEventProps = {
  id: string;
  lang: Locale;
  event?: WineEvent;
  labels: { title: string; cta: string; empty: string };
};

/** The next fair or tasting where people can meet the family. */
export function NextEvent({ id, lang, event, labels }: NextEventProps) {
  const date = event ? new Date(`${event.start}T12:00:00`) : undefined;
  const day = date
    ? new Intl.DateTimeFormat(lang, { day: "numeric" }).format(date)
    : null;
  const month = date
    ? new Intl.DateTimeFormat(lang, { month: "long" }).format(date)
    : null;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-paper scroll-mt-16 px-6 py-32"
    >
      <div className="max-w-site mx-auto">
        <h2
          id={`${id}-title`}
          className="mb-10 text-center font-serif text-[36px] leading-[1.04] font-medium tracking-[-0.01em] md:text-[58px]"
        >
          {labels.title}
        </h2>

        {event && date ? (
          <article className="border-line flex flex-wrap items-center gap-8 border-y py-8">
            <time
              dateTime={event.start}
              className="flex w-24 flex-none flex-col"
            >
              <span className="font-serif text-[48px] leading-none font-medium tabular-nums">
                {day}
              </span>
              <span className="text-gold-ink mt-1.5 text-sm font-medium">
                {month}
              </span>
            </time>
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-1.5">
              <h3 className="text-2xl font-semibold tracking-[-0.015em]">
                {event.title[lang]}
              </h3>
              <p className="text-ink-muted text-base leading-[1.47]">
                {event.details[lang]}
              </p>
            </div>
            <LinkButton href={event.href ?? `#${id}`} tone="outline" size="xl">
              {labels.cta}
            </LinkButton>
          </article>
        ) : (
          <p className="border-line text-ink-muted border-y py-8 text-center text-lg">
            {labels.empty}
          </p>
        )}
      </div>
    </section>
  );
}
