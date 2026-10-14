import { type Localized } from "@/lib/i18n";

export type Testimonial = {
  quote: Localized;
  name: string;
  place: Localized;
};

// TODO(family): replace with real testimonials, with each person's permission.
export const testimonials: Testimonial[] = [
  {
    quote: {
      pt: "[Testemunho de um cliente sobre o Tinto, nas palavras dele. Duas frases no máximo.]",
      en: "[A customer's words about the Red. Two sentences at most.]",
    },
    name: "[Nome do cliente]",
    place: { pt: "[Cidade]", en: "[City]" },
  },
  {
    quote: {
      pt: "[Testemunho de um restaurante ou garrafeira que trabalha com os vinhos.]",
      en: "[A restaurant or wine shop that works with the wines.]",
    },
    name: "[Nome do restaurante]",
    place: { pt: "[Cidade]", en: "[City]" },
  },
  {
    quote: {
      pt: "[Testemunho de quem provou numa feira de vinhos.]",
      en: "[Someone who tasted the wines at a wine fair.]",
    },
    name: "[Nome]",
    place: { pt: "[Feira, ano]", en: "[Fair, year]" },
  },
];
