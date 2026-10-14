import Image from "next/image";

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

/**
 * The bottle cut-out for a vintage. Until the studio photo exists, draws a
 * simple stand-in in the bottle's glass, capsule and label-stripe colors.
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
        height={360}
        sizes="120px"
        className={className}
        style={{ width: "auto" }}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 80 300"
      role="img"
      aria-label={pendingLabel}
      className={className}
      style={{ height: 360, width: "auto" }}
    >
      <path
        d="M32 0h16v72c0 22 24 30 24 62v156a10 10 0 0 1-10 10H18a10 10 0 0 1-10-10V134c0-32 24-40 24-62Z"
        fill={glass}
      />
      <rect x="31" y="0" width="18" height="52" rx="2" fill={vintage.capsule} />
      <rect x="12" y="160" width="56" height="86" rx="2" fill="#fbfaf7" />
      <circle cx="40" cy="182" r="7" fill="#c9a679" />
      <path
        d="M16 214c10-5 24 3 48-3M16 222c10-5 24 3 48-3M16 230c10-5 24 3 48-3"
        fill="none"
        stroke={vintage.stripe}
        strokeWidth="1.6"
      />
    </svg>
  );
}
