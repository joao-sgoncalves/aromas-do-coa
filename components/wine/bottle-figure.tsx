import Image from "next/image";

import silhouette from "@/assets/bottles/silhouette.png";
import { type Vintage } from "@/content/wines";

type BottleFigureProps = {
  vintage: Vintage;
  glass: string;
  /** Accessible name when a real photo is shown. */
  alt: string;
  /** Accessible name for the drawn stand-in. */
  pendingLabel: string;
  className?: string;
};

/** Rendered height of every bottle, photo or stand-in. */
const HEIGHT = 360;

/**
 * The bottle cut-out for a vintage. Until the studio photo exists, shows a
 * stand-in cut from the real bottle's silhouette, so it has the same size and
 * shape as the photos beside it, painted in the glass, capsule and label colors.
 */
export function BottleFigure({
  vintage,
  glass,
  alt,
  pendingLabel,
  className,
}: BottleFigureProps) {
  if (vintage.bottle) {
    return (
      <Image
        src={vintage.bottle}
        alt={alt}
        height={HEIGHT}
        sizes="120px"
        className={className}
        style={{ width: "auto" }}
      />
    );
  }

  const mask = `url(${silhouette.src}) center / contain no-repeat`;

  // The mask sits on an inner box: a mask on the outer one would also cut
  // away the hover drop-shadow passed in through className.
  return (
    <div role="img" aria-label={pendingLabel} className={className}>
      <div
        style={{
          height: HEIGHT,
          aspectRatio: `${silhouette.width} / ${silhouette.height}`,
          // Capsule over the top fifth, label from 42% to 87%, as on the photos.
          background: [
            `linear-gradient(to bottom, transparent 42%, #fbfaf7 42% 87%, transparent 87%)`,
            `linear-gradient(to bottom, ${vintage.capsule} 20%, ${glass} 20%)`,
          ].join(", "),
          mask,
          WebkitMask: mask,
        }}
      />
    </div>
  );
}
