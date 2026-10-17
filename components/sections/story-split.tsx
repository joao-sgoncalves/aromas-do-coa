import Image, { type StaticImageData } from "next/image";

import { LinkButton } from "@/components/ui/link-button";

type StorySplitProps = {
  id: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  image: StaticImageData;
  alt: string;
};

/** Full-width band: a photograph filling one half, the story in the other. */
export function StorySplit({
  id,
  title,
  body,
  cta,
  image,
  alt,
}: StorySplitProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-paper-sunk grid scroll-mt-16 md:min-h-[720px] md:grid-cols-2"
    >
      <div className="relative min-h-[420px]">
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
        <h2
          id={`${id}-title`}
          className="max-w-lg font-serif text-[36px] leading-[1.04] font-medium tracking-[-0.01em] text-balance md:text-[58px]"
        >
          {title}
        </h2>
        <p className="text-ink-muted max-w-md text-lg leading-[1.56]">{body}</p>
        <div className="mt-2.5">
          <LinkButton href={cta.href} tone="ink" size="xl">
            {cta.label}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
