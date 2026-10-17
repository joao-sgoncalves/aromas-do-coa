type IntroBandProps = {
  id: string;
  kicker: string;
  statement: string;
  facts: { value: string; label: string }[];
};

/**
 * Who we are, in one sentence, before the wines: the origin that sets the
 * bottles below in context, with a few plain facts underneath.
 */
export function IntroBand({ id, kicker, statement, facts }: IntroBandProps) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="bg-paper px-6 pt-28 pb-24 md:pt-36 md:pb-32"
    >
      <div className="max-w-site mx-auto flex flex-col items-center text-center">
        <p className="text-gold-ink text-[11px] font-semibold tracking-[0.18em] uppercase">
          {kicker}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-5 max-w-3xl font-serif text-[32px] leading-[1.14] font-medium tracking-[-0.01em] text-balance md:text-[48px]"
        >
          {statement}
        </h2>
        <dl className="divide-line mt-14 grid w-full max-w-3xl grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {facts.map((fact) => (
            <div
              key={fact.value}
              className="flex flex-col gap-1.5 py-5 sm:px-6 sm:py-1"
            >
              <dt className="font-serif text-[24px] leading-tight font-medium">
                {fact.value}
              </dt>
              <dd className="text-ink-muted text-[15px]">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
