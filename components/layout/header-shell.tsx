"use client";

import { type ReactNode, useEffect, useState } from "react";

/**
 * Fixed header that sits transparent over the hero and turns into a
 * translucent white bar once the page scrolls. Children inherit its text
 * color, so links and icons switch from white to ink with it.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="group text-on-night data-[scrolled=true]:border-line data-[scrolled=true]:bg-paper/85 data-[scrolled=true]:text-ink fixed inset-x-0 top-0 z-40 transition-colors duration-300 data-[scrolled=true]:border-b data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:backdrop-saturate-150 motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
