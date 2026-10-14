import { buttonVariants, cn } from "@heroui/react";
import { type Route } from "next";
import NextLink from "next/link";
import { type AnchorHTMLAttributes, type ReactNode } from "react";

/**
 * A link styled as a HeroUI Button.
 * - `primary`: gold (the brand accent), for the one main action on screen
 * - `glass`: frosted white, for a second action over photography
 * - `ink`: solid black, for a second action on light grounds
 * - `outline`: hairline border on light grounds
 */
export type ButtonTone = "primary" | "glass" | "ink" | "outline";

type LinkButtonProps = {
  href: string;
  tone?: ButtonTone;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

const toneVariant = {
  primary: { variant: "primary", extra: "" },
  glass: { variant: "ghost", extra: "button--glass" },
  ink: { variant: "primary", extra: "button--ink" },
  outline: { variant: "outline", extra: "" },
} as const;

export function linkButtonClass(
  tone: ButtonTone = "primary",
  size: LinkButtonProps["size"] = "md",
  className?: string,
): string {
  const { variant, extra } = toneVariant[tone];
  return (
    cn(
      buttonVariants({ variant, size: size === "xl" ? "lg" : size }),
      extra,
      size === "xl" && "button--xl",
      "rounded-full",
      className,
    ) ?? ""
  );
}

export function LinkButton({
  href,
  tone = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const classes = linkButtonClass(tone, size, className);

  // Routes inside the app go through next/link; anchors and external URLs stay plain links.
  if (href.startsWith("/")) {
    return (
      <NextLink href={href as Route} className={classes} {...rest}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
