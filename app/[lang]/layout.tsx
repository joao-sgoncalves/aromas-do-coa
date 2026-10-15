import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { type ReactNode } from "react";

import { getDictionary } from "@/app/[lang]/dictionaries";
import "@/app/globals.css";
import { htmlLang, isLocale, locales } from "@/lib/i18n";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

type LangParams = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<LangParams & { children: ReactNode }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={htmlLang[lang]}
      className={`light ${geist.variable}`}
      data-theme="light"
    >
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
