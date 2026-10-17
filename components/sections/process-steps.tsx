import Image, { type StaticImageData } from "next/image";

export type ProcessStep = {
  title: string;
  text: string;
  image: StaticImageData;
  alt: string;
};

/** The path from vine to bottle. It is a real sequence, so the steps are numbered. */
export function ProcessSteps({
  id,
  title,
  steps,
}: {
  id: string;
  title: string;
  steps: ProcessStep[];
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-paper scroll-mt-16 px-6 py-32"
    >
      <div className="max-w-site mx-auto">
        <h2
          id={`${id}-title`}
          className="mb-14 text-center font-serif text-[36px] leading-[1.04] font-medium tracking-[-0.01em] md:text-[58px]"
        >
          {title}
        </h2>
        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-2.5">
              <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-[20px]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <span className="text-gold-ink text-[13px] font-semibold tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[22px] font-semibold tracking-[-0.015em]">
                {step.title}
              </h3>
              <p className="text-ink-muted text-[15px] leading-[1.47]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
