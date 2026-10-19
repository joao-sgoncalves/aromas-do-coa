import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/app/[lang]/dictionaries";
import terracesAmphitheatre from "@/assets/images/terraces-amphitheatre.jpg";
import terracesValley from "@/assets/images/terraces-valley.jpg";
import tintoLabel from "@/assets/images/tinto-2023-label.jpg";
import vineyardTrack from "@/assets/images/vineyard-track.jpg";
import youngVine from "@/assets/images/young-vine-schist.jpg";
import { SymbolSection } from "@/components/about/symbol-section";
import { Hero } from "@/components/home/hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Chapter } from "@/components/sections/chapter";
import { CtaPanel } from "@/components/sections/cta-panel";
import { IntroBand } from "@/components/sections/intro-band";
import { StatementLines } from "@/components/sections/statement-lines";
import { StorySplit } from "@/components/sections/story-split";
import { localeHref, navItems } from "@/content/site";
import { isLocale } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { about } = await getDictionary(lang);

  return {
    title: about.meta.title,
    description: about.meta.description,
    alternates: {
      languages: { "pt-PT": "/pt/about", en: "/en/about" },
    },
  };
}

/** The family, the land and the dream behind the wines, as the family tells it. */
export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { about } = dict;

  const navLabel = (href: string) =>
    navItems.find((item) => item.href === href)?.label[lang] ?? "";

  return (
    <>
      <SiteHeader lang={lang} dict={dict} path="/about" />
      <main>
        <Hero
          kicker={about.hero.kicker}
          title={about.hero.title}
          sub={about.hero.sub}
          image={terracesValley}
          alt={about.hero.alt}
        />

        <Chapter
          id="aromas"
          kicker={about.aromas.kicker}
          title={about.aromas.title}
          body={about.aromas.body}
        />

        <StorySplit
          id="raizes"
          kicker={about.roots.kicker}
          title={about.roots.title}
          body={about.roots.body}
          image={youngVine}
          alt={about.roots.alt}
        />

        <IntroBand
          id="terra"
          kicker={about.land.kicker}
          statement={about.land.statement}
          facts={about.land.facts}
        />

        <StorySplit
          id="sonho"
          kicker={about.dream.kicker}
          title={about.dream.title}
          body={about.dream.body}
          image={vineyardTrack}
          alt={about.dream.alt}
          reverse
        />

        <StatementLines lines={about.passion.lines} body={about.passion.body} />

        <StorySplit
          id="adega"
          kicker={about.cellar.kicker}
          title={about.cellar.title}
          body={about.cellar.body}
          image={tintoLabel}
          alt={about.cellar.alt}
          tone="paper"
        />

        <SymbolSection
          id="simbolo"
          kicker={about.symbol.kicker}
          title={about.symbol.title}
          body={about.symbol.body}
          forces={about.symbol.forces}
          closing={about.symbol.closing}
        />

        <CtaPanel
          id="memoria"
          title={about.closing.title}
          body={about.closing.body}
          cta={{ href: localeHref(lang, "#tinto"), label: about.closing.cta }}
          image={terracesAmphitheatre}
          alt={about.closing.alt}
        />
      </main>
      <SiteFooter
        lang={lang}
        dict={dict.footer}
        nav={{
          story: navLabel("/about"),
          process: navLabel("#processo"),
          agenda: navLabel("#agenda"),
        }}
      />
    </>
  );
}
