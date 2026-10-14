"use client";

import { cn } from "@heroui/react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import { LinkButton } from "@/components/ui/link-button";

export type HeroSlide = {
  id: string;
  tab: string;
  kicker: string;
  title: string;
  sub: string;
  image: StaticImageData;
  alt: string;
  /** CSS object-position, to keep the subject in frame. */
  position?: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

type HeroCarouselProps = {
  slides: HeroSlide[];
  labels: { region: string; choose: string };
  /** Time on each slide while it plays by itself. */
  intervalMs?: number;
};

/**
 * Full-screen hero. The brand slide comes first, then one slide per wine.
 * Advances slowly by itself, stops for good as soon as someone picks a tab,
 * and never moves for visitors who prefer reduced motion.
 */
export function HeroCarousel({
  slides,
  labels,
  intervalMs = 7000,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [autoplay, intervalMs, slides.length]);

  const current = slides[active];

  const choose = (index: number) => {
    setAutoplay(false);
    setActive(index);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="bg-night text-on-night relative isolate flex min-h-[720px] flex-col items-center justify-between overflow-hidden text-center md:min-h-svh"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== active}
          className={cn(
            "absolute inset-0 -z-20 transition-opacity duration-[900ms] ease-out motion-reduce:transition-none",
            index === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            preload={index === 0}
            placeholder="blur"
            className="object-cover"
            style={{ objectPosition: slide.position ?? "50% 50%" }}
          />
        </div>
      ))}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.62)_0%,rgb(0_0_0/0.38)_32%,transparent_58%,rgb(0_0_0/0.6)_100%)]"
      />

      <div
        aria-live="polite"
        className="flex flex-col items-center px-6 pt-36 [text-shadow:0_1px_18px_rgb(0_0_0/0.35)] md:pt-40"
      >
        <p className="text-on-night/85 mb-3 text-[15px] font-medium">
          {current.kicker}
        </p>
        <h1 className="max-w-4xl text-[44px] leading-[1.04] font-semibold tracking-[-0.04em] text-balance md:text-7xl lg:text-[80px]">
          {current.title}
        </h1>
        <p className="text-on-night/85 mt-3.5 max-w-xl text-[17px] leading-relaxed tracking-[-0.01em] md:text-xl">
          {current.sub}
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-9 px-6 pb-10">
        <div className="flex w-full max-w-md flex-row flex-wrap justify-center gap-4 sm:w-auto sm:max-w-none">
          <LinkButton
            href={current.primary.href}
            size="xl"
            className="min-w-[200px] flex-1 sm:flex-none"
          >
            {current.primary.label}
          </LinkButton>
          <LinkButton
            href={current.secondary.href}
            tone="glass"
            size="xl"
            className="min-w-[200px] flex-1 sm:flex-none"
          >
            {current.secondary.label}
          </LinkButton>
        </div>

        <div
          role="tablist"
          aria-label={labels.choose}
          className="flex flex-wrap justify-center gap-4 md:gap-7"
        >
          {slides.map((slide, index) => {
            const selected = index === active;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => choose(index)}
                className={cn(
                  "flex min-w-[72px] cursor-pointer flex-col gap-2.5 py-1 text-xs font-medium transition-colors md:min-w-[120px] md:text-[13px]",
                  selected
                    ? "text-on-night"
                    : "text-on-night/65 hover:text-on-night",
                )}
              >
                <span>{slide.tab}</span>
                <span className="block h-0.5 overflow-hidden rounded-full bg-white/30">
                  <span
                    className={cn(
                      "bg-gold block h-full transition-[width] duration-500 motion-reduce:transition-none",
                      selected ? "w-full" : "w-0",
                    )}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
