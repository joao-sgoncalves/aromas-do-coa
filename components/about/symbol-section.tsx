import Image from "next/image";

import symbol from "@/assets/brand/symbol-large.png";

type SymbolSectionProps = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  /** The invisible forces the atom stands for. */
  forces: string[];
  closing: string;
};

/** The gold atom of the label, set large, with the forces it brings together. */
export function SymbolSection({
  id,
  kicker,
  title,
  body,
  forces,
  closing,
}: SymbolSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-gold-soft scroll-mt-16 px-6 py-28 md:py-36"
    >
      <div className="max-w-site mx-auto grid items-center gap-14 md:grid-cols-[5fr_6fr] md:gap-20">
        <Image
          src={symbol}
          alt=""
          sizes="(min-width: 768px) 420px, 280px"
          className="mx-auto w-[280px] md:w-[420px]"
        />
        <div className="flex flex-col gap-5">
          <p className="text-gold-ink text-[11px] font-semibold tracking-[0.18em] uppercase">
            {kicker}
          </p>
          <h2
            id={`${id}-title`}
            className="font-serif text-[36px] leading-[1.06] font-medium tracking-[-0.01em] text-balance md:text-[52px]"
          >
            {title}
          </h2>
          <p className="text-ink-muted max-w-lg text-lg leading-[1.56]">
            {body}
          </p>
          <ul className="mt-3 flex max-w-lg flex-wrap gap-2.5">
            {forces.map((force) => (
              <li
                key={force}
                className="border-gold-ink/30 text-ink rounded-full border px-4 py-1.5 font-serif text-xl font-medium"
              >
                {force}
              </li>
            ))}
          </ul>
          <p className="text-ink mt-3 max-w-lg font-serif text-2xl leading-snug italic">
            {closing}
          </p>
        </div>
      </div>
    </section>
  );
}
