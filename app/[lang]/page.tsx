import { notFound } from "next/navigation";

import { getDictionary } from "@/app/[lang]/dictionaries";
import brancoTable from "@/assets/images/branco-2024-table.jpg";
import grapesOnVine from "@/assets/images/grapes-on-vine.jpg";
import terracesAmphitheatre from "@/assets/images/terraces-amphitheatre.jpg";
import terracesSchist from "@/assets/images/terraces-schist.jpg";
import terracesValley from "@/assets/images/terraces-valley.jpg";
import tintoDecanter from "@/assets/images/tinto-2023-decanter.jpg";
import tintoDriftwood from "@/assets/images/tinto-2023-driftwood.jpg";
import youngVine from "@/assets/images/young-vine-schist.jpg";
import { Hero } from "@/components/home/hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CtaPanel } from "@/components/sections/cta-panel";
import { IntroBand } from "@/components/sections/intro-band";
import { NextEvent } from "@/components/sections/next-event";
import { ProcessSteps } from "@/components/sections/process-steps";
import { StorySplit } from "@/components/sections/story-split";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { WineShelf } from "@/components/wine/wine-shelf";
import { upcomingEvents } from "@/content/events";
import { localeHref, navItems } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { wines } from "@/content/wines";
import { isLocale } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const winePhoto = { tinto: tintoDriftwood, branco: brancoTable } as const;

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const navLabel = (href: string) =>
    navItems.find((item) => item.href === href)?.label[lang] ?? "";

  const processImages = [youngVine, grapesOnVine, tintoDecanter];

  return (
    <>
      <SiteHeader lang={lang} dict={dict} />
      <main>
        <Hero
          kicker={dict.hero.kicker}
          title={dict.hero.title}
          sub={dict.hero.sub}
          image={terracesAmphitheatre}
          alt={dict.hero.alt}
          primary={{ href: "#tinto", label: dict.hero.primary }}
          secondary={{
            href: localeHref(lang, "/about"),
            label: dict.hero.secondary,
          }}
        />

        <IntroBand
          id="intro"
          kicker={dict.intro.kicker}
          statement={dict.intro.statement}
          facts={dict.intro.facts}
        />

        {wines.map((wine, index) => (
          <WineShelf
            key={wine.slug}
            wine={wine}
            lang={lang}
            dict={dict.wines}
            tone={index % 2 === 0 ? "sunk" : "paper"}
            photo={{
              image: winePhoto[wine.slug],
              alt: dict.wines.photoAlt[wine.slug],
            }}
            reverse={index % 2 === 1}
          />
        ))}

        <StorySplit
          id="quinta"
          title={dict.quinta.title}
          body={dict.quinta.body}
          cta={{ href: localeHref(lang, "/about"), label: dict.quinta.cta }}
          image={terracesSchist}
          alt={dict.quinta.alt}
        />

        <ProcessSteps
          id="processo"
          title={dict.process.title}
          steps={dict.process.steps.map((step, index) => ({
            ...step,
            image: processImages[index],
          }))}
        />

        <TestimonialsCarousel
          items={testimonials.map((item) => ({
            quote: item.quote[lang],
            name: item.name,
            place: item.place[lang],
          }))}
          labels={dict.testimonials}
        />

        <NextEvent
          id="agenda"
          lang={lang}
          event={upcomingEvents()[0]}
          labels={dict.agenda}
        />

        <CtaPanel
          id="contacto"
          title={dict.contact.title}
          body={dict.contact.body}
          cta={{ href: "#contacto", label: dict.contact.cta }}
          image={terracesValley}
          alt={dict.contact.alt}
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
