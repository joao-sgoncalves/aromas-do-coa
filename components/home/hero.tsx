import Image, { type StaticImageData } from "next/image";

import { LinkButton } from "@/components/ui/link-button";

type HeroProps = {
  kicker: string;
  title: string;
  sub: string;
  image: StaticImageData;
  alt: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

/**
 * Opening photograph of the vineyard with the brand promise and two ways in:
 * the wines, or the place they come from.
 */
export function Hero({
  kicker,
  title,
  sub,
  image,
  alt,
  primary,
  secondary,
}: HeroProps) {
  return (
    <section className="bg-night text-on-night relative isolate flex min-h-[720px] flex-col items-center justify-between overflow-hidden text-center md:min-h-svh">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="100vw"
        preload
        placeholder="blur"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(27_20_18/0.62)_0%,rgb(27_20_18/0.42)_36%,transparent_62%,rgb(27_20_18/0.55)_100%)]"
      />

      <div className="flex flex-col items-center px-6 pt-36 [text-shadow:0_1px_18px_rgb(0_0_0/0.35)] md:pt-40">
        <p className="text-on-night/85 mb-4 text-[11px] font-semibold tracking-[0.18em] uppercase">
          {kicker}
        </p>
        <h1 className="max-w-4xl font-serif text-[48px] leading-[1.02] font-medium tracking-[-0.015em] text-balance md:text-[80px] lg:text-[92px]">
          {title}
        </h1>
        <p className="text-on-night/85 mt-4 max-w-xl text-[17px] leading-relaxed md:text-xl">
          {sub}
        </p>
      </div>

      <div className="flex w-full max-w-md flex-row flex-wrap justify-center gap-4 px-6 pb-14 sm:w-auto sm:max-w-none">
        <LinkButton
          href={primary.href}
          size="xl"
          className="min-w-[200px] flex-1 sm:flex-none"
        >
          {primary.label}
        </LinkButton>
        <LinkButton
          href={secondary.href}
          tone="glass"
          size="xl"
          className="min-w-[200px] flex-1 sm:flex-none"
        >
          {secondary.label}
        </LinkButton>
      </div>
    </section>
  );
}
