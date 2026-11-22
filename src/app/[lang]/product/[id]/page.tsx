import { notFound } from "next/navigation";
import ShopNav from "@/components/ShopNav";
import ProductView from "@/components/ProductView";
import SiteFooter from "@/components/SiteFooter";
import { PRODUCTS, productById } from "@/lib/catalog";
import { getDictionary, hasLocale } from "../../dictionaries";

// One page per vegetable, built ahead of time for both languages.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: PageProps<"/[lang]/product/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang) || !productById(id)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <ShopNav t={t} lang={lang} mode="page" />
      <main className="flex-1 bg-[#f6f7f1]">
        <ProductView id={id} t={t} lang={lang} />
      </main>
      <SiteFooter t={t} lang={lang} />
    </>
  );
}
