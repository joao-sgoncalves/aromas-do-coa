import Image from "next/image";
import { type ReactNode } from "react";

import { type Dictionary } from "@/app/[lang]/dictionaries";
import logo from "@/assets/brand/logo.png";
import { SocialLinks } from "@/components/layout/social-links";
import { localeHref } from "@/content/site";
import { wines } from "@/content/wines";
import { type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  lang: Locale;
  dict: Dictionary["footer"];
  nav: { story: string; process: string; agenda: string };
};

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-ink mb-1 text-[13px] font-semibold">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

const linkClass = "text-ink-muted transition-colors hover:text-ink";

export function SiteFooter({ lang, dict, nav }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper-sunk text-ink-muted text-[13px] leading-[1.45]">
      <div className="max-w-site mx-auto flex flex-col gap-12 px-6 pt-[72px] pb-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col items-start gap-5 md:col-span-1">
            <Image
              src={logo}
              alt={dict.logoAlt}
              height={92}
              style={{ width: "auto" }}
            />
            <SocialLinks />
          </div>

          <Column title={dict.wines}>
            {wines.map((wine) => (
              <li key={wine.slug}>
                <a
                  href={localeHref(lang, `#${wine.slug}`)}
                  className={linkClass}
                >
                  {wine.name[lang]}:{" "}
                  {[...wine.vintages]
                    .sort((a, b) => b.year - a.year)
                    .map((v) => v.year)
                    .join(", ")}
                </a>
              </li>
            ))}
            <li>
              <a href={localeHref(lang, "#contacto")} className={linkClass}>
                {dict.whereToBuy}
              </a>
            </li>
          </Column>

          <Column title={dict.brand}>
            <li>
              <a href={localeHref(lang, "/about")} className={linkClass}>
                {nav.story}
              </a>
            </li>
            <li>
              <a href={localeHref(lang, "#processo")} className={linkClass}>
                {nav.process}
              </a>
            </li>
            <li>
              <a href={localeHref(lang, "#agenda")} className={linkClass}>
                {nav.agenda}
              </a>
            </li>
          </Column>

          <Column title={dict.contact}>
            <li>
              <a href={localeHref(lang, "#contacto")} className={linkClass}>
                {dict.write}
              </a>
            </li>
            <li>Vila Nova de Foz Côa</li>
            <li>Douro, Portugal</li>
          </Column>
        </div>

        <div className="border-line flex flex-wrap justify-between gap-4 border-t pt-5 text-xs">
          <span>{dict.responsible}</span>
          <span>
            © {year} Aromas do Côa. {dict.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
