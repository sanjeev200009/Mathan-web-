import { notFound } from "next/navigation";
import ShopNav from "@/components/ShopNav";
import OrderView from "@/components/OrderView";
import SiteFooter from "@/components/SiteFooter";
import { getDictionary, hasLocale } from "../dictionaries";

// The order page: the basket, the customer's details, and the order sent on WhatsApp.
export default async function OrderPage({ params }: PageProps<"/[lang]/order">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <ShopNav t={t} lang={lang} mode="page" />
      <main className="flex-1 bg-[#f6f7f1]">
        <OrderView lang={lang} />
      </main>
      <SiteFooter t={t} lang={lang} />
    </>
  );
}
