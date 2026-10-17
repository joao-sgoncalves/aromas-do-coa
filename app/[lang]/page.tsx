import { notFound } from "next/navigation";

import { getDictionary } from "@/app/[lang]/dictionaries";
import grapesOnVine from "@/assets/images/grapes-on-vine.jpg";
import redLandscape from "@/assets/images/red-2022-landscape.jpg";
import terracesAmphitheatre from "@/assets/images/terraces-amphitheatre.jpg";
import terracesSchist from "@/assets/images/terraces-schist.jpg";
import terracesValley from "@/assets/images/terraces-valley.jpg";
import vineyardTrack from "@/assets/images/vineyard-track.jpg";
import whiteGrapes from "@/assets/images/white-2023-grapes.jpg";
import youngVine from "@/assets/images/young-vine-schist.jpg";
import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CtaPanel } from "@/components/sections/cta-panel";
import { NextEvent } from "@/components/sections/next-event";
import { ProcessSteps } from "@/components/sections/process-steps";
import { StorySplit } from "@/components/sections/story-split";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { WineShelf } from "@/components/wine/wine-shelf";
import { upcomingEvents } from "@/content/events";
import { navItems } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { newestVintage, wines } from "@/content/wines";
import { isLocale } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string }> };

const wineHero = {
  tinto: { image: redLandscape, position: "60% 50%" },
  branco: { image: whiteGrapes, position: "50% 40%" },
} as const;

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const navLabel = (href: string) =>
    navItems.find((item) => item.href === href)?.label[lang] ?? "";

  const slides: HeroSlide[] = [
    {
      id: "brand",
      tab: dict.hero.brandTab,
      kicker: dict.hero.brandKicker,
      title: dict.hero.brandTitle,
      sub: dict.hero.brandSub,
      image: terracesAmphitheatre,
      alt: dict.hero.brandAlt,
      primary: { href: "#tinto", label: dict.hero.brandPrimary },
      secondary: { href: "#quinta", label: dict.hero.brandSecondary },
    },
    ...wines.map((wine) => {
      const newest = newestVintage(wine);
      const edition = newest.edition ? `, ${newest.edition[lang]}` : "";
      return {
        id: wine.slug,
        tab: wine.name[lang],
        kicker: `${dict.hero.newVintage}: ${wine.name[lang]} ${newest.year}${edition}`,
        title: wine.name[lang],
        sub: wine.slug === "tinto" ? dict.hero.tintoSub : dict.hero.brancoSub,
        image: wineHero[wine.slug].image,
        position: wineHero[wine.slug].position,
        alt: wine.slug === "tinto" ? dict.hero.tintoAlt : dict.hero.brancoAlt,
        primary: { href: "#contacto", label: dict.hero.buy },
        secondary: { href: `#${wine.slug}`, label: dict.hero.seeVintages },
      };
    }),
  ];

  const processImages = [youngVine, grapesOnVine, vineyardTrack];

  return (
    <>
      <SiteHeader lang={lang} dict={dict} />
      <main>
        <HeroCarousel
          slides={slides}
          labels={{ region: dict.hero.label, choose: dict.hero.choose }}
        />

        {wines.map((wine, index) => (
          <WineShelf
            key={wine.slug}
            wine={wine}
            lang={lang}
            dict={dict.wines}
            tone={index % 2 === 0 ? "sunk" : "paper"}
          />
        ))}

        <StorySplit
          id="quinta"
          title={dict.quinta.title}
          body={dict.quinta.body}
          cta={{ href: "#quinta", label: dict.quinta.cta }}
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
          quinta: navLabel("#quinta"),
          process: navLabel("#processo"),
          agenda: navLabel("#agenda"),
        }}
      />
    </>
  );
}
