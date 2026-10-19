type StatementLinesProps = {
  /** Short lines read as one statement; the last one carries the gold. */
  lines: string[];
  body?: string;
};

/** A pause between chapters: a few short lines set large on the night ground. */
export function StatementLines({ lines, body }: StatementLinesProps) {
  const last = lines.length - 1;

  return (
    <section className="bg-night text-on-night px-6 py-32 md:py-40">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
        <p className="flex flex-col font-serif text-[40px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[68px]">
          {lines.map((line, index) => (
            <span
              key={line}
              className={index === last ? "text-gold-light italic" : undefined}
            >
              {line}
            </span>
          ))}
        </p>
        {body && (
          <p className="text-on-night-muted max-w-xl text-lg leading-[1.6]">
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
