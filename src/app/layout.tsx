import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are self-hosted (src/app/fonts) so the site never waits on Google Fonts.
// ponytail: Latin characters only; add the other subsets' files if the store needs them.

// Body and UI text: Inter reads cleanly at small sizes (product cards, prices, forms).
const inter = localFont({
  src: "./fonts/Inter.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

// Headings, product names, hero text.
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mathan",
  description: "Online store",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
