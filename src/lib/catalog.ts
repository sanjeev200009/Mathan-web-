import { WHATSAPP, type Locale } from "@/app/[lang]/dictionaries";

// The shop (owner, 22 Nov: "add to cart need to be working... user able to check out at the basket and
// send the order directly"). One product list, one basket kept in this browser, one order message.
// The shop takes orders on WhatsApp and the customer pays when it arrives (what the site already says),
// so "checkout" writes the whole order into a WhatsApp message - no payment, no server needed.
// To add a product: one more row in PRODUCTS (a photo in public/img, ~600px wide .webp). The row order
// of the first four matches the special-products wheel (dictionary products.items).

export type Group = "local" | "upcountry" | "tubers" | "greens";
export const GROUPS: Group[] = ["local", "upcountry", "tubers", "greens"];

type Words = { en: string; ta: string };
export type Product = { id: string; group: Group; price: number; unit: Words; img: string; name: Words; line: Words };

export const PRODUCTS: Product[] = [
  {
    id: "tomato",
    group: "local",
    price: 120,
    unit: { en: "1 kg", ta: "1 கிலோ" },
    img: "/img/p-tomato.webp",
    name: { en: "Tomato", ta: "தக்காளி" },
    line: { en: "Firm, red and full of flavour, for curries, sambols and salads.", ta: "கறி, சம்பல் மற்றும் சாலட்டுக்கு." },
  },
  {
    id: "red-onion",
    group: "local",
    price: 100,
    unit: { en: "1 kg", ta: "1 கிலோ" },
    img: "/img/p-onion.webp",
    name: { en: "Red onion", ta: "வெங்காயம்" },
    line: { en: "The base of every curry, sorted and ready for your kitchen.", ta: "ஒவ்வொரு கறிக்கும் அடிப்படை." },
  },
  {
    id: "potato",
    group: "tubers",
    price: 90,
    unit: { en: "1 kg", ta: "1 கிலோ" },
    img: "/img/p-potato.webp",
    name: { en: "Potato", ta: "உருளைக்கிழங்கு" },
    line: { en: "Clean, even potatoes for curries, fries and roasting.", ta: "கறி, பொரியல் மற்றும் வறுவலுக்கு." },
  },
  {
    id: "green-chilli",
    group: "local",
    price: 140,
    unit: { en: "1 kg", ta: "1 கிலோ" },
    img: "/img/p-chilli.webp",
    name: { en: "Green chilli", ta: "பச்சை மிளகாய்" },
    line: { en: "Fresh green chillies for the heat in your everyday cooking.", ta: "தினசரி சமையலுக்கு புதிய பச்சை மிளகாய்." },
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const rs = (n: number) => `Rs. ${n.toLocaleString("en-US")}`;

// The order, written for WhatsApp.
export type Details = { name: string; phone: string; how: "delivery" | "pickup"; address: string; area: string; notes: string };

export function orderMessage(lang: Locale, items: { product: Product; qty: number }[], total: number, d: Details) {
  const ta = lang === "ta";
  const rows = items.map(({ product: p, qty }) => `• ${p.name[lang]} - ${qty} x ${p.unit[lang]} = ${rs(p.price * qty)}`);
  return [
    ta ? "வணக்கம் Pasumai Fresh, எனது ஆர்டர்:" : "Hello Pasumai Fresh, here is my order:",
    "",
    ...rows,
    "",
    `${ta ? "மொத்தம்" : "Total"}: ${rs(total)}`,
    "",
    `${ta ? "பெயர்" : "Name"}: ${d.name}`,
    `${ta ? "தொலைபேசி" : "Phone"}: ${d.phone}`,
    d.how === "delivery"
      ? `${ta ? "வீட்டிற்கு விநியோகம்" : "Home delivery"}: ${d.address}${d.area ? `, ${d.area}` : ""}`
      : ta ? "கடையில் பெற்றுக்கொள்வேன்" : "I will pick it up at the shop",
    ta ? "பணம்: பொருள் வந்த பிறகு" : "Payment: cash on delivery",
    ...(d.notes ? [`${ta ? "குறிப்பு" : "Note"}: ${d.notes}`] : []),
  ].join("\n");
}

export const whatsappLink = (text: string) => `${WHATSAPP.href}?text=${encodeURIComponent(text)}`;

// A Sri Lankan mobile or landline: 9 digits after 0 / +94 (spaces and dashes allowed).
export const phoneOk = (s: string) => /^(?:\+?94|0)?\d{9}$/.test(s.replace(/[\s-]/g, ""));
