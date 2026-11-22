import { WHATSAPP, type Locale } from "@/app/[lang]/dictionaries";

// The shop (owner, 22 Nov: "add to cart need to be working... user able to check out at the basket and
// send the order directly"). One product list, one basket kept in this browser, one order message.
// The shop takes orders on WhatsApp and the customer pays when it arrives (what the site already says),
// so "checkout" writes the whole order into a WhatsApp message - no payment, no server needed.
// To add a product: one more row in PRODUCTS (a photo in public/img, ~600px wide .webp). The row order
// of the first four matches the special-products wheel (dictionary products.items).

export type Group = "local" | "upcountry" | "tubers" | "greens";
export const GROUPS: Group[] = ["local", "upcountry", "tubers", "greens"];
// The cartoon vegetable that stands for each group (src/components/Veg.tsx).
export const GROUP_VEG = { local: "tomato", upcountry: "carrot", tubers: "potato", greens: "greens" } as const;

type Words = { en: string; ta: string };
// store = how to keep it, uses = what to cook with it, pairs = what goes with it (product ids),
// kind = its cartoon drawing in Veg.tsx.
export type Product = {
  id: string;
  group: Group;
  price: number;
  unit: Words;
  img: string;
  name: Words;
  line: Words;
  store: Words;
  uses: Words;
  pairs: string[];
  kind: "tomato" | "onion" | "potato" | "chilli";
};

export const PRODUCTS: Product[] = [
  {
    id: "tomato",
    group: "local",
    price: 120,
    unit: { en: "1 kg", ta: "1 கிலோ" },
    img: "/img/p-tomato.webp",
    name: { en: "Tomato", ta: "தக்காளி" },
    line: { en: "Firm, red and full of flavour, for curries, sambols and salads.", ta: "கறி, சம்பல் மற்றும் சாலட்டுக்கு." },
    store: { en: "Keep at room temperature until fully ripe, then in the fridge for a few more days.", ta: "முழுமையாகப் பழுக்கும் வரை அறை வெப்பநிலையில் வையுங்கள், பிறகு சில நாட்கள் குளிர்சாதனப் பெட்டியில்." },
    uses: { en: "Tomato curry, sambols, salads, rasam and sauces.", ta: "தக்காளிக் கறி, சம்பல், சாலட், ரசம் மற்றும் சோஸ்." },
    pairs: ["red-onion", "green-chilli"],
    kind: "tomato",
  },
  {
    id: "red-onion",
    group: "local",
    price: 100,
    unit: { en: "1 kg", ta: "1 கிலோ" },
    img: "/img/p-onion.webp",
    name: { en: "Red onion", ta: "வெங்காயம்" },
    line: { en: "The base of every curry, sorted and ready for your kitchen.", ta: "ஒவ்வொரு கறிக்கும் அடிப்படை." },
    store: { en: "Keep in a cool, dry, airy place - away from potatoes, so both last longer.", ta: "குளிர்ந்த, உலர்ந்த, காற்றோட்டமான இடத்தில் வையுங்கள் - உருளைக்கிழங்கிலிருந்து தள்ளி." },
    uses: { en: "The base of curries, sambols, fried rice and tempering.", ta: "கறி, சம்பல், ஃப்ரைட் ரைஸ் மற்றும் தாளிப்புக்கு அடிப்படை." },
    pairs: ["tomato", "potato"],
    kind: "onion",
  },
  {
    id: "potato",
    group: "tubers",
    price: 90,
    unit: { en: "1 kg", ta: "1 கிலோ" },
    img: "/img/p-potato.webp",
    name: { en: "Potato", ta: "உருளைக்கிழங்கு" },
    line: { en: "Clean, even potatoes for curries, fries and roasting.", ta: "கறி, பொரியல் மற்றும் வறுவலுக்கு." },
    store: { en: "Keep in a cool, dark place - not in the fridge, and away from onions.", ta: "குளிர்ந்த, இருண்ட இடத்தில் வையுங்கள் - குளிர்சாதனப் பெட்டியில் அல்ல, வெங்காயத்திலிருந்து தள்ளி." },
    uses: { en: "Potato curry, tempered potatoes, fries and roasts.", ta: "உருளைக்கிழங்குக் கறி, தாளித்த உருளைக்கிழங்கு, பொரியல் மற்றும் வறுவல்." },
    pairs: ["red-onion", "green-chilli"],
    kind: "potato",
  },
  {
    id: "green-chilli",
    group: "local",
    price: 140,
    unit: { en: "1 kg", ta: "1 கிலோ" },
    img: "/img/p-chilli.webp",
    name: { en: "Green chilli", ta: "பச்சை மிளகாய்" },
    line: { en: "Fresh green chillies for the heat in your everyday cooking.", ta: "தினசரி சமையலுக்கு புதிய பச்சை மிளகாய்." },
    store: { en: "Keep in a paper bag in the fridge; they stay fresh for about a week.", ta: "காகிதப் பையில் குளிர்சாதனப் பெட்டியில் வையுங்கள்; சுமார் ஒரு வாரம் புதிதாக இருக்கும்." },
    uses: { en: "Sambols, curries, tempering and pickles.", ta: "சம்பல், கறி, தாளிப்பு மற்றும் ஊறுகாய்." },
    pairs: ["tomato", "red-onion"],
    kind: "chilli",
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const rs = (n: number) => `Rs. ${n.toLocaleString("en-US")}`;

// The order, written for WhatsApp.
export const WHEN = {
  en: { morning: "Morning", afternoon: "Afternoon", evening: "Evening" },
  ta: { morning: "காலை", afternoon: "மதியம்", evening: "மாலை" },
};
export type Details = { name: string; phone: string; how: "delivery" | "pickup"; address: string; area: string; when: "" | "morning" | "afternoon" | "evening"; notes: string };

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
    ...(d.when ? [`${ta ? "விருப்பமான நேரம்" : "Preferred time"}: ${WHEN[lang][d.when]}`] : []),
    ta ? "பணம்: பொருள் வந்த பிறகு" : "Payment: cash on delivery",
    ...(d.notes ? [`${ta ? "குறிப்பு" : "Note"}: ${d.notes}`] : []),
  ].join("\n");
}

export const whatsappLink = (text: string) => `${WHATSAPP.href}?text=${encodeURIComponent(text)}`;

// A Sri Lankan mobile or landline: 9 digits after 0 / +94 (spaces and dashes allowed).
export const phoneOk = (s: string) => /^(?:\+?94|0)?\d{9}$/.test(s.replace(/[\s-]/g, ""));
