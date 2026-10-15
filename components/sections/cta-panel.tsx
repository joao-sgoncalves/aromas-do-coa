import Image, { type StaticImageData } from "next/image";

import { LinkButton } from "@/components/ui/link-button";

type CtaPanelProps = {
  id: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  image: StaticImageData;
  alt: string;
};

/** Full-bleed photograph with a centered closing call to action. */
export function CtaPanel({ id, title, body, cta, image, alt }: CtaPanelProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="text-on-night relative isolate flex min-h-[720px] scroll-mt-16 flex-col items-center justify-center gap-8 overflow-hidden px-6 py-28 text-center"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/35" />
      <div className="flex flex-col items-center gap-3.5">
        <h2
          id={`${id}-title`}
          className="max-w-3xl text-[36px] leading-[1.04] font-semibold tracking-[-0.035em] text-balance md:text-[64px]"
        >
          {title}
        </h2>
        <p className="text-on-night/85 max-w-lg text-[17px] leading-relaxed md:text-xl">
          {body}
        </p>
      </div>
      <LinkButton href={cta.href} size="xl">
        {cta.label}
      </LinkButton>
    </section>
  );
}
