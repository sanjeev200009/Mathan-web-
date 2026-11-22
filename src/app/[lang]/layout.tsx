import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "./dictionaries";
import "../globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";

// Fonts are self-hosted (src/app/fonts) so the site never waits on Google Fonts.
const inter = localFont({
  src: "../fonts/Inter.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const tamil = localFont({
  src: "../fonts/NotoSansTamil.woff2",
  weight: "100 900",
  variable: "--font-tamil",
  display: "swap",
});

// Both languages are built ahead of time: /ta and /en.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { ta: "/ta", en: "/en" } },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${inter.variable} ${tamil.variable} h-full antialiased`}>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's cz-shortcut-listen) add
          attributes to <body> before React loads; that is not a fault of the page. */}
      <body suppressHydrationWarning className="flex min-h-full flex-col font-sans">
        {/* Only the preloader is shown (21 Nov). The top bar (VNav) and cart (CartProvider) are kept
            on disk, unused, for when the sections come back. */}
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
