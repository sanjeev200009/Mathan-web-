import { Suspense } from "react";
import { notFound } from "next/navigation";
import ShopNav from "@/components/ShopNav";
import ShopList from "@/components/ShopList";
import SiteFooter from "@/components/SiteFooter";
import { getDictionary, hasLocale } from "../dictionaries";

// The shop: every vegetable, by group (?type=) or by search (?q=).
export default async function Vegetables({ params }: PageProps<"/[lang]/vegetables">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <ShopNav t={t} lang={lang} mode="page" />
      <main className="flex-1 bg-[#f6f7f1]">
        <Suspense>
          <ShopList t={t} lang={lang} />
        </Suspense>
      </main>
      <SiteFooter t={t} lang={lang} />
    </>
  );
}
