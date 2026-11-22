import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main id="top" className="flex-1">
      <Hero t={t} lang={lang} />
    </main>
  );
}
