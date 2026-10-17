import { cn } from "@heroui/react";
import Image, { type StaticImageData } from "next/image";

import { format, type Dictionary } from "@/app/[lang]/dictionaries";
import { LinkButton } from "@/components/ui/link-button";
import { BottleFigure } from "@/components/wine/bottle-figure";
import { type Wine } from "@/content/wines";
import { type Locale } from "@/lib/i18n";

type WineShelfProps = {
  wine: Wine;
  lang: Locale;
  dict: Dictionary["wines"];
  /** Alternate the section ground so Tinto and Branco read as two chapters. */
  tone?: "paper" | "sunk";
  /** Styled photograph of the wine, set beside its name. */
  photo?: { image: StaticImageData; alt: string };
  /** Put the photo on the left instead of the right, to alternate shelves. */
  reverse?: boolean;
};

/**
 * One wine, all its vintages standing side by side, newest first.
 * Hovering a bottle lifts it; on touch screens the bottles are plain links
 * and the buy button is always visible. Swipes sideways on phones.
 */
export function WineShelf({
  wine,
  lang,
  dict,
  tone = "paper",
  photo,
  reverse = false,
}: WineShelfProps) {
  const name = wine.name[lang];
  const vintages = [...wine.vintages].sort((a, b) => b.year - a.year);

  return (
    <section
      id={wine.slug}
      aria-labelledby={`${wine.slug}-title`}
      className={cn(
        "scroll-mt-16 px-6 pt-32 pb-28",
        tone === "sunk" ? "bg-paper-sunk" : "bg-paper",
      )}
    >
      <div className="max-w-site mx-auto flex flex-col items-center">
        <div
          className={cn(
            "grid w-full items-center gap-12",
            photo && "md:grid-cols-2 md:gap-20",
          )}
        >
          <header
            className={cn(
              "flex flex-col items-center gap-3 text-center",
              photo && "md:items-start md:text-left",
              photo && reverse && "md:order-last",
            )}
          >
            <h2
              id={`${wine.slug}-title`}
              className="font-serif text-[44px] leading-[1.02] font-medium tracking-[-0.01em] md:text-[72px]"
            >
              {name}
            </h2>
            <p className="text-ink-muted max-w-xl text-[17px] leading-relaxed md:text-xl">
              {wine.tagline[lang]}
            </p>
          </header>
          {photo && (
            <div className="rounded-tile relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden">
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 460px, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* overflow-x also clips vertically, so pt-4 leaves room for the hover lift. */}
        <ul className="mt-16 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pt-4 pb-2 max-sm:justify-start sm:justify-center md:gap-[72px]">
          {vintages.map((vintage) => {
            const label = [
              vintage.edition?.[lang],
              vintage.isNew && dict.newVintage,
            ]
              .filter(Boolean)
              .join(" · ");
            return (
              <li
                key={vintage.year}
                className="group/bottle flex shrink-0 basis-[62%] snap-center flex-col items-center text-center sm:basis-[200px]"
              >
                <a
                  href={`#${wine.slug}`}
                  aria-label={format(dict.viewVintage, { year: vintage.year })}
                  className="flex h-[360px] w-full items-end justify-center"
                >
                  <BottleFigure
                    vintage={vintage}
                    glass={wine.glass}
                    alt={format(dict.bottleAlt, { name, year: vintage.year })}
                    pendingLabel={format(dict.photoPending, {
                      name,
                      year: vintage.year,
                    })}
                    className="h-[360px] transition-[transform,filter] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none [@media(hover:hover)]:group-hover/bottle:-translate-y-2.5 [@media(hover:hover)]:group-hover/bottle:drop-shadow-[0_24px_18px_rgb(0_0_0/0.14)]"
                  />
                </a>
                <p className="mt-7 font-serif text-[32px] leading-none font-medium tracking-[0.12em] tabular-nums">
                  {vintage.year}
                </p>
                <p className="text-gold-ink mt-2 min-h-[18px] text-[11px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase">
                  {label}
                </p>
                <LinkButton href="#contacto" size="sm" className="mt-4 px-5">
                  {dict.buy}
                </LinkButton>
              </li>
            );
          })}
        </ul>

        <a
          href={`#${wine.slug}`}
          className="mt-12 text-[15px] font-medium underline decoration-1 underline-offset-[5px] hover:decoration-2"
        >
          {dict.seeAll}
        </a>
      </div>
    </section>
  );
}
