import { cn } from "@heroui/react";

type TerraceLinesProps = {
  /**
   * `ornament`: a small terraced hill, set under a heading.
   * `field`: two wide hills of terraces, laid along the bottom of a section.
   */
  variant?: "ornament" | "field";
  className?: string;
};

/** One hill of terraces: stacked arcs that widen as they go down the slope. */
function hill(
  cx: number,
  top: number,
  rows: number,
  gap: number,
  grow: number,
) {
  return Array.from({ length: rows }, (_, i) => {
    const y = top + i * gap;
    const half = (i + 1) * grow;
    return `M${cx - half} ${y + gap * 1.6}Q${cx} ${y - gap * 1.6} ${cx + half} ${y + gap * 1.6}`;
  }).join("");
}

const shapes = {
  ornament: { viewBox: "0 0 120 32", d: hill(60, 4, 6, 4.4, 9) },
  field: {
    viewBox: "0 0 1200 260",
    d: hill(340, 40, 16, 13, 34) + hill(900, 90, 13, 13, 40),
  },
};

/**
 * The engraved terrace lines from the Aromas do Côa label, drawn in thin
 * strokes of the current text color. Purely decorative.
 */
export function TerraceLines({
  variant = "ornament",
  className,
}: TerraceLinesProps) {
  const { viewBox, d } = shapes[variant];
  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio={variant === "field" ? "xMidYMax slice" : undefined}
      className={cn("pointer-events-none", className)}
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
