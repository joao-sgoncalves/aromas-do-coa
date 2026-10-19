import { cn } from "@heroui/react";
import Image, { type StaticImageData } from "next/image";

import { LinkButton } from "@/components/ui/link-button";

type StorySplitProps = {
  id: string;
  kicker?: string;
  title: string;
  /** One string per paragraph. */
  body: string[];
  cta?: { href: string; label: string };
  image: StaticImageData;
  alt: string;
  /** Put the photograph on the right instead of the left. */
  reverse?: boolean;
  tone?: "paper" | "sunk";
};

/** Full-width band: a photograph filling one half, the story in the other. */
export function StorySplit({
  id,
  kicker,
  title,
  body,
  cta,
  image,
  alt,
  reverse = false,
  tone = "sunk",
}: StorySplitProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "grid scroll-mt-16 md:min-h-[720px] md:grid-cols-2",
        tone === "sunk" ? "bg-paper-sunk" : "bg-paper",
      )}
    >
      <div className={cn("relative min-h-[420px]", reverse && "md:order-last")}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-5 px-6 py-16 md:px-16 lg:px-28">
        {kicker && (
          <p className="text-gold-ink text-[11px] font-semibold tracking-[0.18em] uppercase">
            {kicker}
          </p>
        )}
        <h2
          id={`${id}-title`}
          className="max-w-lg font-serif text-[36px] leading-[1.04] font-medium tracking-[-0.01em] text-balance md:text-[58px]"
        >
          {title}
        </h2>
        {body.map((paragraph) => (
          <p
            key={paragraph}
            className="text-ink-muted max-w-md text-lg leading-[1.56]"
          >
            {paragraph}
          </p>
        ))}
        {cta && (
          <div className="mt-2.5">
            <LinkButton href={cta.href} tone="ink" size="xl">
              {cta.label}
            </LinkButton>
          </div>
        )}
      </div>
    </section>
  );
}
