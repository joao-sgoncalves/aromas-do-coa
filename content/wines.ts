import { type StaticImageData } from "next/image";

import branco2024 from "@/assets/bottles/branco-2024.png";
import tinto2022 from "@/assets/bottles/tinto-2022.png";
import tinto2023 from "@/assets/bottles/tinto-2023.png";
import { type Localized } from "@/lib/i18n";

export type WineType = "tinto" | "branco";

export type Vintage = {
  year: number;
  /** Special label printed on that year's bottle, e.g. Superior, Edição Limitada. */
  edition?: Localized;
  /** Newest release gets the "Nova colheita" tag. */
  isNew?: boolean;
  /** Transparent studio cut-out. Missing ones render a drawn bottle until the photo exists. */
  bottle?: StaticImageData;
  /** Colors for the drawn stand-in bottle, taken from the real capsule and label. */
  capsule: string;
  stripe: string;
};

export type Wine = {
  slug: WineType;
  name: Localized;
  tagline: Localized;
  /** Glass color for drawn stand-in bottles. */
  glass: string;
  vintages: Vintage[];
};

const gold = "#c9a679";
const silver = "#b5b2ae";

export const wines: Wine[] = [
  {
    slug: "tinto",
    name: { pt: "Tinto", en: "Red" },
    tagline: {
      pt: "Feito de xisto e de verões longos. Três colheitas, a mesma vinha.",
      en: "Made of schist and long summers. Three vintages, one vineyard.",
    },
    glass: "#1c1a19",
    vintages: [
      { year: 2024, isNew: true, capsule: gold, stripe: gold },
      {
        year: 2023,
        edition: { pt: "Superior", en: "Superior" },
        bottle: tinto2023,
        capsule: "#6b2b33",
        stripe: "#9c4a5c",
      },
      { year: 2022, bottle: tinto2022, capsule: gold, stripe: gold },
    ],
  },
  {
    slug: "branco",
    name: { pt: "Branco", en: "White" },
    tagline: {
      pt: "Fresco como as manhãs da vindima.",
      en: "Fresh as the mornings of the harvest.",
    },
    glass: "#d9d2b8",
    vintages: [
      {
        year: 2024,
        isNew: true,
        edition: { pt: "Edição Limitada", en: "Limited Edition" },
        bottle: branco2024,
        capsule: silver,
        stripe: silver,
      },
      { year: 2023, capsule: gold, stripe: silver },
    ],
  },
];

export function newestVintage(wine: Wine): Vintage {
  return wine.vintages.reduce((a, b) => (b.year > a.year ? b : a));
}
