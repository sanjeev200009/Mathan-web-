"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WHATSAPP, type Locale } from "@/app/[lang]/dictionaries";
import { PRODUCTS, WHEN, addToBasket, clearBasket, orderMessage, phoneOk, rs, setQty, useBasket, whatsappLink, type Details } from "@/lib/shop";
import Veg from "./Veg";
import { Stepper } from "./ProductCard";

// The order page (owner, 22 Nov: "another page for the order... check out at the basket and send the
// order directly"). The basket on the left, the customer's details on the right, and one button that
// writes the whole order into WhatsApp for them to send. Payment is on arrival, as the site promises;
// the delivery charge and time are confirmed in the chat. The details are remembered in this browser so
// a second order is two clicks.
const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';
const KEY = "pasumai-details-v1";

const WORDS = {
  en: {
    title: "Your order",
    basket: "Your basket",
    empty: "Your basket is empty.",
    emptyLine: "Add a few fresh vegetables and come back here to order.",
    shop: "Shop vegetables",
    remove: "Remove",
    subtotal: "Vegetables",
    delivery: "Delivery",
    deliveryNote: "Confirmed on WhatsApp",
    total: "Total",
    details: "Your details",
    name: "Your name",
    phone: "Phone number",
    phoneHint: "So we can call you about the order",
    how: "How do you want it?",
    deliver: "Deliver to my home",
    pickup: "I will pick it up",
    address: "Delivery address",
    area: "Area / city",
    notes: "Anything we should know? (optional)",
    pay: "You pay when your order arrives. Cash on delivery.",
    send: "Send order on WhatsApp",
    need: { name: "Please write your name.", phone: "Please write a phone number we can call.", address: "Please write where we should deliver." },
    sentTitle: "Your order is ready in WhatsApp",
    sentLine: "Press send in WhatsApp. We will reply to confirm the total and the delivery time.",
    again: "Open WhatsApp again",
    done: "Done - empty my basket",
    more: "Keep shopping",
    steps: ["Basket", "Your details", "Send on WhatsApp"],
    addMore: "Add more to your order",
    add: "Add",
    when: "Preferred delivery time",
    whenNote: "We confirm the exact time on WhatsApp.",
    any: "Any time",
    help: "Need help? Message us on WhatsApp",
    trust: ["Fresh from local farms", "Delivered tomorrow in Colombo", "Pay when it arrives"],
  },
  ta: {
    title: "உங்கள் ஆர்டர்",
    basket: "உங்கள் கூடை",
    empty: "உங்கள் கூடை காலியாக உள்ளது.",
    emptyLine: "சில புதிய காய்கறிகளைச் சேர்த்து, ஆர்டர் செய்ய இங்கே வாருங்கள்.",
    shop: "காய்கறிகளை வாங்குங்கள்",
    remove: "நீக்கு",
    subtotal: "காய்கறிகள்",
    delivery: "விநியோகம்",
    deliveryNote: "WhatsApp-இல் உறுதிப்படுத்தப்படும்",
    total: "மொத்தம்",
    details: "உங்கள் விவரங்கள்",
    name: "உங்கள் பெயர்",
    phone: "தொலைபேசி எண்",
    phoneHint: "ஆர்டர் பற்றி உங்களை அழைக்க",
    how: "எப்படி பெற விரும்புகிறீர்கள்?",
    deliver: "வீட்டிற்கு அனுப்புங்கள்",
    pickup: "நானே பெற்றுக்கொள்வேன்",
    address: "விநியோக முகவரி",
    area: "பகுதி / நகரம்",
    notes: "ஏதாவது சொல்ல வேண்டுமா? (விருப்பம்)",
    pay: "பொருள் வந்த பிறகே பணம். Cash on delivery.",
    send: "WhatsApp-இல் ஆர்டர் அனுப்பு",
    need: { name: "உங்கள் பெயரை எழுதுங்கள்.", phone: "அழைக்கக்கூடிய தொலைபேசி எண்ணை எழுதுங்கள்.", address: "எங்கே அனுப்ப வேண்டும் என்று எழுதுங்கள்." },
    sentTitle: "உங்கள் ஆர்டர் WhatsApp-இல் தயார்",
    sentLine: "WhatsApp-இல் send அழுத்துங்கள். மொத்தத் தொகையையும் விநியோக நேரத்தையும் உறுதிப்படுத்துவோம்.",
    again: "WhatsApp-ஐ மீண்டும் திற",
    done: "முடிந்தது - கூடையை காலி செய்",
    more: "தொடர்ந்து வாங்க",
    steps: ["கூடை", "உங்கள் விவரங்கள்", "WhatsApp-இல் அனுப்பு"],
    addMore: "உங்கள் ஆர்டரில் மேலும் சேருங்கள்",
    add: "சேர்",
    when: "விருப்பமான விநியோக நேரம்",
    whenNote: "சரியான நேரத்தை WhatsApp-இல் உறுதிப்படுத்துவோம்.",
    any: "எந்த நேரமும்",
    help: "உதவி வேண்டுமா? WhatsApp-இல் எழுதுங்கள்",
    trust: ["உள்ளூர் தோட்டங்களிலிருந்து புதிதாக", "நாளை கொழும்பில் விநியோகம்", "வந்ததும் பணம்"],
  },
};

const BLANK: Details = { name: "", phone: "", how: "delivery", address: "", area: "", when: "", notes: "" };

export default function OrderView({ lang }: { lang: Locale }) {
  const w = WORDS[lang];
  const { items, count, total } = useBasket();
  const [d, setD] = useState<Details>(BLANK);
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [sent, setSent] = useState<string | null>(null);

  // Remember the customer's details in this browser.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read after hydration so the first render matches the server
      if (saved) setD({ ...BLANK, ...saved });
    } catch {}
  }, []);
  const put = (k: keyof Details, v: string) => {
    const next = { ...d, [k]: v } as Details;
    setD(next);
    setErrors((e) => ({ ...e, [k]: undefined }));
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const send = () => {
    const e: typeof errors = {};
    if (!d.name.trim()) e.name = w.need.name;
    if (!phoneOk(d.phone)) e.phone = w.need.phone;
    if (d.how === "delivery" && !d.address.trim()) e.address = w.need.address;
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const link = whatsappLink(orderMessage(lang, items, total, { ...d, name: d.name.trim(), address: d.address.trim(), notes: d.notes.trim() }));
    setSent(link);
    window.open(link, "_blank", "noopener");
  };

  const input = (k: keyof Details) =>
    `mt-1.5 h-12 w-full rounded-[10px] border bg-white px-4 text-[15px] text-[#1c2a1e] outline-none transition-colors focus:border-[#4f7047] ${
      errors[k] ? "border-[#c0392b]" : "border-[#dbdee5]"
    }`;
  const label = "block text-[14px] font-semibold text-[#1c2a1e]";
  const err = (k: keyof Details) => errors[k] && <span className="mt-1 block text-[13px] text-[#c0392b]">{errors[k]}</span>;

  if (sent)
    return (
      <section className="frame flex min-h-[60vh] flex-col items-center justify-center py-20 text-center" style={{ fontFamily: OS }}>
        <span className="flex size-16 items-center justify-center rounded-full bg-[#cbec4b] text-[#022a09]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h1 className="mt-6 text-[clamp(26px,3vw,40px)] font-bold text-[#1c2a1e]">{w.sentTitle}</h1>
        <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.6] text-[#5b6460]">{w.sentLine}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={sent} target="_blank" rel="noopener" className="inline-flex h-12 items-center rounded-[10px] bg-[#4f7047] px-6 text-[15px] font-semibold text-white hover:bg-[#3d5a37]">
            {w.again}
          </a>
          <Link
            href={`/${lang}/vegetables/`}
            onClick={() => clearBasket()}
            className="inline-flex h-12 items-center rounded-[10px] border border-[#cfd6c5] bg-white px-6 text-[15px] font-semibold text-[#1c2a1e] hover:border-[#4f7047]"
          >
            {w.done}
          </Link>
        </div>
      </section>
    );

  if (!count)
    return (
      <section className="frame flex min-h-[60vh] flex-col items-center justify-center py-20 text-center" style={{ fontFamily: OS }}>
        <span className="flex size-16 items-center justify-center rounded-full bg-[#e8efda] text-[#4f7047]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 9h14l-1.5 10.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5z" />
            <path d="M9 9 12 4l3 5" />
          </svg>
        </span>
        <h1 className="mt-6 text-[clamp(26px,3vw,40px)] font-bold text-[#1c2a1e]">{w.empty}</h1>
        <p className="mt-3 text-[16px] text-[#5b6460]">{w.emptyLine}</p>
        <Link href={`/${lang}/vegetables/`} className="mt-8 inline-flex h-12 items-center rounded-[10px] bg-[#4f7047] px-6 text-[15px] font-semibold text-white hover:bg-[#3d5a37]">
          {w.shop}
        </Link>
      </section>
    );

  return (
    <section className="frame pb-24 pt-[clamp(28px,5vh,56px)]" style={{ fontFamily: OS }}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-[clamp(30px,3.4vw,52px)] font-bold tracking-[-0.02em] text-[#1c2a1e]">{w.title}</h1>
        <ol className="flex items-center gap-2 text-[13px] font-semibold">
          {w.steps.map((x, i) => (
            <li key={x} className="flex items-center gap-2">
              <span
                className={`flex size-7 items-center justify-center rounded-full ${
                  i === 0 ? "bg-[#4f7047] text-white" : i === 1 ? "bg-[#cbec4b] text-[#022a09]" : "border border-[#cfd6c5] text-[#5b6460]"
                }`}
              >
                {i === 0 ? "✓" : i + 1}
              </span>
              <span className={i === 1 ? "text-[#1c2a1e]" : "text-[#5b6460] max-sm:hidden"}>{x}</span>
              {i < 2 && <span aria-hidden="true" className="h-px w-6 bg-[#cfd6c5]" />}
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-10">
        {/* The basket */}
        <div className="rounded-[20px] border border-[#e8ebe3] bg-white p-[clamp(16px,2vw,28px)]">
          <h2 className="text-[18px] font-bold text-[#1c2a1e]">
            {w.basket} · {count}
          </h2>
          <ul className="mt-4 divide-y divide-[#eef0ea]">
            {items.map(({ product: p, qty }) => (
              <li key={p.id} className="flex items-center gap-4 py-4">
                <Link href={`/${lang}/product/${p.id}/`} className="size-[72px] shrink-0 overflow-hidden rounded-[12px] border border-[#eef0ea] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" className="size-full object-contain p-1.5 mix-blend-multiply" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/${lang}/product/${p.id}/`} className="font-bold text-[#1c2a1e] hover:underline">
                    {p.name[lang]}
                  </Link>
                  <p className="text-[13px] text-[#5b6460]">
                    {rs(p.price)} / {p.unit[lang]}
                  </p>
                  <button type="button" onClick={() => setQty(p.id, 0)} className="mt-1 text-[13px] text-[#5b6460] underline hover:text-[#c0392b]">
                    {w.remove}
                  </button>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Stepper id={p.id} qty={qty} lang={lang} />
                  <span className="text-[15px] font-bold tabular-nums text-[#1c2a1e]">{rs(p.price * qty)}</span>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-2 space-y-2 border-t border-[#eef0ea] pt-4 text-[15px]">
            <div className="flex justify-between text-[#444]">
              <dt>{w.subtotal}</dt>
              <dd className="tabular-nums">{rs(total)}</dd>
            </div>
            <div className="flex justify-between text-[#444]">
              <dt>{w.delivery}</dt>
              <dd className="text-[#5b6460]">{w.deliveryNote}</dd>
            </div>
            <div className="flex justify-between pt-1 text-[19px] font-bold text-[#1c2a1e]">
              <dt>{w.total}</dt>
              <dd className="tabular-nums">{rs(total)}</dd>
            </div>
          </dl>
          {PRODUCTS.some((p) => !items.find((x) => x.product.id === p.id)) && (
            <div className="mt-6 border-t border-[#eef0ea] pt-5">
              <h3 className="text-[15px] font-bold text-[#1c2a1e]">{w.addMore}</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PRODUCTS.filter((p) => !items.find((x) => x.product.id === p.id)).map((p) => (
                  <li key={p.id} className="flex items-center gap-2 rounded-[12px] bg-[#f6f7f1] p-2">
                    <Veg kind={p.kind} className="size-10 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-bold text-[#1c2a1e]">{p.name[lang]}</span>
                      <span className="block text-[12px] text-[#5b6460]">{rs(p.price)}</span>
                    </span>
                    <button type="button" onClick={() => addToBasket(p.id)} aria-label={`${w.add} ${p.name[lang]}`} className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#4f7047] text-[18px] text-white hover:bg-[#3d5a37]">
                      +
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* The details and the send */}
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="rounded-[20px] border border-[#e8ebe3] bg-white p-[clamp(16px,2vw,28px)] lg:sticky lg:top-24"
        >
          <h2 className="text-[18px] font-bold text-[#1c2a1e]">{w.details}</h2>
          <div className="mt-4 space-y-4">
            <label className={label}>
              {w.name}
              <input id="f-name" value={d.name} onChange={(e) => put("name", e.target.value)} autoComplete="name" className={input("name")} />
              {err("name")}
            </label>
            <label className={label}>
              {w.phone}
              <input id="f-phone" value={d.phone} onChange={(e) => put("phone", e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="07X XXX XXXX" className={input("phone")} />
              {err("phone") || <span className="mt-1 block text-[13px] font-normal text-[#999fa6]">{w.phoneHint}</span>}
            </label>
            <fieldset>
              <legend className={label}>{w.how}</legend>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(["delivery", "pickup"] as const).map((h) => (
                  <label
                    key={h}
                    className={`flex cursor-pointer items-center justify-center rounded-[10px] border px-3 py-3 text-center text-[14px] font-semibold transition-colors ${
                      d.how === h ? "border-[#4f7047] bg-[#eef3e3] text-[#1c2a1e]" : "border-[#dbdee5] text-[#444] hover:border-[#4f7047]"
                    }`}
                  >
                    <input type="radio" name="how" value={h} checked={d.how === h} onChange={() => put("how", h)} className="sr-only" />
                    {h === "delivery" ? w.deliver : w.pickup}
                  </label>
                ))}
              </div>
            </fieldset>
            {d.how === "delivery" && (
              <>
                <label className={label}>
                  {w.address}
                  <textarea id="f-address" value={d.address} onChange={(e) => put("address", e.target.value)} autoComplete="street-address" rows={2} className={`${input("address")} h-auto py-3`} />
                  {err("address")}
                </label>
                <label className={label}>
                  {w.area}
                  <input value={d.area} onChange={(e) => put("area", e.target.value)} autoComplete="address-level2" placeholder="Colombo" className={input("area")} />
                </label>
              </>
            )}
            {d.how === "delivery" && (
              <fieldset>
                <legend className={label}>{w.when}</legend>
                <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(["", "morning", "afternoon", "evening"] as const).map((k) => (
                    <label
                      key={k || "any"}
                      className={`flex cursor-pointer items-center justify-center rounded-[10px] border px-2 py-2.5 text-center text-[13.5px] font-semibold transition-colors ${
                        d.when === k ? "border-[#4f7047] bg-[#eef3e3] text-[#1c2a1e]" : "border-[#dbdee5] text-[#444] hover:border-[#4f7047]"
                      }`}
                    >
                      <input type="radio" name="when" checked={d.when === k} onChange={() => put("when", k)} className="sr-only" />
                      {k ? WHEN[lang][k] : w.any}
                    </label>
                  ))}
                </div>
                <span className="mt-1 block text-[13px] text-[#999fa6]">{w.whenNote}</span>
              </fieldset>
            )}
            <label className={label}>
              {w.notes}
              <textarea value={d.notes} onChange={(e) => put("notes", e.target.value)} rows={2} className={`${input("notes")} h-auto py-3`} />
            </label>
          </div>
          <p className="mt-5 rounded-[10px] bg-[#f6f7f1] px-4 py-3 text-[14px] text-[#444]">{w.pay}</p>
          <button
            type="submit"
            className="mt-4 flex h-14 w-full items-center justify-center gap-2.5 rounded-[10px] bg-[#4f7047] text-[16px] font-semibold text-white transition-colors hover:bg-[#3d5a37]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/whatsapp.svg" alt="" className="size-5 brightness-0 invert" />
            {w.send} · {rs(total)}
          </button>
          <ul className="mt-4 space-y-1.5">
            {w.trust.map((x) => (
              <li key={x} className="flex items-center gap-2 text-[13px] text-[#5b6460]">
                <span className="text-[#4f7047]">✓</span>
                {x}
              </li>
            ))}
          </ul>
          <a href={WHATSAPP.href} target="_blank" rel="noopener" className="mt-4 block text-center text-[13.5px] font-semibold text-[#4f7047] underline">
            {w.help}
          </a>
        </form>
      </div>
    </section>
  );
}
