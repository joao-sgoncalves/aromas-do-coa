"use client";

import { Button, Drawer } from "@heroui/react";
import { useState } from "react";

import { localeHref, type NavItem } from "@/content/site";
import { type Locale } from "@/lib/i18n";

type MobileNavProps = {
  lang: Locale;
  items: NavItem[];
  labels: { menu: string; close: string; nav: string };
};

export function MobileNav({ lang, items, labels }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        variant="ghost"
        aria-label={labels.menu}
        onPress={() => setIsOpen(true)}
        className="text-current xl:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M3 7h14M3 13h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </Button>

      <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Content placement="right">
          <Drawer.Dialog aria-label={labels.nav} className="bg-paper">
            <Drawer.CloseTrigger aria-label={labels.close} />
            <Drawer.Body>
              <nav aria-label={labels.nav} className="mt-12 flex flex-col">
                {items.map((item) => (
                  <a
                    key={item.href}
                    href={localeHref(lang, item.href)}
                    onClick={() => setIsOpen(false)}
                    className="border-line text-ink border-b py-4 text-2xl font-semibold tracking-tight"
                  >
                    {item.label[lang]}
                  </a>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
}
