type ChapterProps = {
  id: string;
  kicker: string;
  title: string;
  /** One string per paragraph. The first one is set larger, as the lead. */
  body: string[];
};

/** A chapter of the story told in words alone, on a narrow reading measure. */
export function Chapter({ id, kicker, title, body }: ChapterProps) {
  const [lead, ...rest] = body;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-paper scroll-mt-16 px-6 pt-28 pb-24 md:pt-36 md:pb-32"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="text-gold-ink text-[11px] font-semibold tracking-[0.18em] uppercase">
          {kicker}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-5 font-serif text-[36px] leading-[1.08] font-medium tracking-[-0.01em] text-balance md:text-[58px]"
        >
          {title}
        </h2>
        <p className="text-ink mt-10 text-xl leading-[1.6] md:text-[22px]">
          {lead}
        </p>
        {rest.map((paragraph) => (
          <p
            key={paragraph}
            className="text-ink-muted mt-6 text-lg leading-[1.62]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
