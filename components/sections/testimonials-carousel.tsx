"use client";

import { Button, cn } from "@heroui/react";
import { useEffect, useState } from "react";

export type TestimonialItem = { quote: string; name: string; place: string };

type TestimonialsCarouselProps = {
  items: TestimonialItem[];
  /** `item` is a template such as "Testemunho {n} de {total}". */
  labels: { title: string; previous: string; next: string; item: string };
  intervalMs?: number;
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 3 5 8l5 5" : "m6 3 5 5-5 5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One quote at a time on black. Rotates slowly; any control stops the rotation. */
export function TestimonialsCarousel({
  items,
  labels,
  intervalMs = 7000,
}: TestimonialsCarouselProps) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const total = items.length;

  useEffect(() => {
    if (!autoplay || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % total),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [autoplay, intervalMs, total]);

  const go = (index: number) => {
    setAutoplay(false);
    setActive((index + total) % total);
  };

  const current = items[active];

  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-night text-on-night px-6 py-32"
    >
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-8 text-center">
        <h2
          id="testimonials-title"
          className="text-gold text-[15px] font-medium"
        >
          {labels.title}
        </h2>
        <figure aria-live="polite" className="flex flex-col items-center gap-8">
          <blockquote className="min-h-[3.9em] text-[26px] leading-[1.28] font-medium tracking-[-0.025em] text-balance md:text-[40px]">
            {current.quote}
          </blockquote>
          <figcaption className="flex flex-col gap-1">
            <span className="text-base font-semibold">{current.name}</span>
            <span className="text-on-night-muted text-sm">{current.place}</span>
          </figcaption>
        </figure>

        <div className="mt-2 flex items-center gap-5">
          <Button
            isIconOnly
            variant="outline"
            aria-label={labels.previous}
            onPress={() => go(active - 1)}
            className="text-on-night size-11 rounded-full border-white/40"
          >
            <Chevron direction="left" />
          </Button>
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.quote}
                type="button"
                aria-label={labels.item
                  .replace("{n}", String(index + 1))
                  .replace("{total}", String(total))}
                aria-current={index === active ? "true" : undefined}
                onClick={() => go(index)}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                  index === active
                    ? "bg-gold w-7"
                    : "w-2 bg-white/30 hover:bg-white/50",
                )}
              />
            ))}
          </div>
          <Button
            isIconOnly
            variant="outline"
            aria-label={labels.next}
            onPress={() => go(active + 1)}
            className="text-on-night size-11 rounded-full border-white/40"
          >
            <Chevron direction="right" />
          </Button>
        </div>
      </div>
    </section>
  );
}
