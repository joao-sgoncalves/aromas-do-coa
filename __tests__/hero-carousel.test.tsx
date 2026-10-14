import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";

const image = {
  src: "/test.jpg",
  width: 1600,
  height: 900,
  blurDataURL: "data:image/png;base64,AA==",
};

const slides: HeroSlide[] = [
  {
    id: "brand",
    tab: "Aromas do Côa",
    kicker: "Vila Nova de Foz Côa",
    title: "Do Douro Superior para o seu copo.",
    sub: "Vinhos de família.",
    image,
    alt: "Socalcos",
    primary: { href: "#tinto", label: "Descobrir os vinhos" },
    secondary: { href: "#quinta", label: "Conhecer a quinta" },
  },
  {
    id: "tinto",
    tab: "Tinto",
    kicker: "Nova colheita: Tinto 2024",
    title: "Tinto",
    sub: "Feito de xisto e de verões longos.",
    image,
    alt: "Garrafa de Tinto",
    primary: { href: "#contacto", label: "Comprar" },
    secondary: { href: "#tinto", label: "Ver as colheitas" },
  },
];

beforeAll(() => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: true });
});

test("shows the brand slide first and switches when a tab is chosen", async () => {
  const user = userEvent.setup();
  render(
    <HeroCarousel
      slides={slides}
      labels={{ region: "Hero", choose: "Escolher" }}
    />,
  );

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Do Douro Superior para o seu copo.",
    }),
  ).toBeVisible();
  expect(screen.getByRole("tab", { name: "Aromas do Côa" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await user.click(screen.getByRole("tab", { name: "Tinto" }));

  expect(
    screen.getByRole("heading", { level: 1, name: "Tinto" }),
  ).toBeVisible();
  expect(screen.getByRole("tab", { name: "Tinto" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByRole("link", { name: "Comprar" })).toHaveAttribute(
    "href",
    "#contacto",
  );
});
