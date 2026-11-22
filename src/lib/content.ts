import type { Locale } from "@/app/[lang]/dictionaries";

// Copy for the Verdantix-style home page (owner, 21 Nov). Products, delivery options and the footer
// text still come from the dictionaries; everything new lives here, in English and Tamil.
// ponytail: the three testimonials are SAMPLES - replace them with real customer words before launch.
const en = {
  nav: { links: [["About", "#about"], ["Products", "#products"], ["How it works", "#how"], ["FAQ", "#faq"]], cta: "Order on WhatsApp", open: "Open menu", close: "Close menu" },
  hero: {
    before: "Fresh Vegetables & Fruit,",
    accent: "Delivered Home",
    lead: "Vegetables, fruits, greens, spices and meat from one shop in Colombo, ordered on WhatsApp or online.",
    fact: "Order today, at your door tomorrow",
    primary: "Shop now",
    secondary: "Order on WhatsApp",
    points: ["Home delivery on every order", "Pay when it arrives", "Fair, clear prices"],
  },
  marquee: ["Vegetables", "Fruits", "King coconut", "Greens", "Groceries", "Spices", "Meat"],
  marqueeLead: "Everything for your kitchen, in one place",
  about: {
    eyebrow: "About Pasumai Fresh",
    scrub:
      "We bring the freshest vegetables, fruits and king coconut from local growers straight to your kitchen, so every family eats better with less effort.",
    title: "Fresh Food Solutions That Deliver Real Quality",
    features: [
      { icon: "leaf", title: "Farm-fresh quality", line: "Picked at the right time and sorted by hand, so what you get is firm, clean and full of flavour." },
      { icon: "shield", title: "Checked before it leaves", line: "Every item is looked over before it goes into your bag. Nothing tired, nothing guessed." },
      { icon: "tag", title: "Fair, clear prices", line: "One honest price on every product, with no hidden extras at the door." },
      { icon: "truck", title: "Fast home delivery", line: "Order today and it reaches you tomorrow, wherever you are in the city." },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "Fresh Food Made Simple and Easy",
    lead: "From the farm to your table in three easy steps.",
    steps: [
      { n: "01", title: "Choose", line: "Browse vegetables, fruits, greens and groceries and pick what your kitchen needs this week.", emoji: "🛒" },
      { n: "02", title: "Order", line: "Send your list on WhatsApp or order online. We confirm it with you in minutes.", emoji: "📲" },
      { n: "03", title: "Receive", line: "We pack it fresh and bring it home. Pay when it arrives, or collect it from the shop.", emoji: "🚚" },
    ],
  },
  products: { eyebrow: "Products", title: "Fresh Picks of the Day", lead: "A few favourites our customers order every week.", more: "See all products" },
  solutions: {
    eyebrow: "Delivery",
    title: "Smart Ways to Get Your Food",
    cards: [
      { title: "Home delivery", line: "Every order brought to your door, packed fresh.", img: "/img/banner-delivery.jpg" },
      { title: "Store pickup", line: "Collect your order from the shop when it suits you.", img: "/img/cat-groceries.jpg" },
      { title: "Cash on delivery", line: "Pay when your order arrives, never before.", img: "/img/cat-fruits.jpg" },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Kind Words from Our Customers",
    items: [
      { quote: "The vegetables are always fresh and the delivery is on time. I have stopped going to the market.", name: "Nadeesha P.", place: "Colombo 05" },
      { quote: "King coconut cut fresh and at my door. Ordering on WhatsApp takes me two minutes.", name: "Ruwan S.", place: "Nugegoda" },
      { quote: "Fair prices and no surprises. The greens last the whole week in my fridge.", name: "Anitha K.", place: "Dehiwala" },
    ],
    prev: "Previous",
    next: "Next",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common Customer Questions",
    items: [
      { q: "How do I place an order?", a: "Send your list to us on WhatsApp or order online. We confirm your items and the delivery time with you." },
      { q: "How fast is delivery?", a: "Order today and it is at your door tomorrow. Every order gets home delivery." },
      { q: "How do I pay?", a: "You pay when your order arrives (cash on delivery), so you only pay once you have seen it." },
      { q: "Can I collect my order myself?", a: "Yes. Choose store pickup and collect your order from the shop when it suits you." },
      { q: "What if something is not fresh?", a: "Tell us on WhatsApp straight away and we will put it right." },
    ],
  },
  shop: {
    eyebrow: "Shop",
    title: "Shop by Category",
    lead: "Vegetables, fruits, spices, meat and more. Add to your cart and order on WhatsApp.",
    all: "All",
    prev: "Previous",
    next: "Next",
    cats: [["veg", "🥕", "Vegetables"], ["fruit", "🍎", "Fruits"], ["green", "🥬", "Greens"], ["coconut", "🥥", "King coconut"], ["spice", "🌶️", "Spices"], ["meat", "🥩", "Meat"]],
    // ponytail: prices of items without a photo are placeholders - set the shop's real prices.
    items: [
      { id: "tomato", cat: "veg", name: "Tomato", price: 120, unit: "1 kg", emoji: "🍅", img: "/img/p-tomato.jpg" },
      { id: "onion", cat: "veg", name: "Red onion", price: 100, unit: "1 kg", emoji: "🧅", img: "/img/p-onion.jpg" },
      { id: "potato", cat: "veg", name: "Potato", price: 90, unit: "1 kg", emoji: "🥔", img: "/img/p-potato.jpg" },
      { id: "chilli", cat: "veg", name: "Green chilli", price: 140, unit: "1 kg", emoji: "🌶️", img: "/img/p-chilli.jpg" },
      { id: "carrot", cat: "veg", name: "Carrot", price: 160, unit: "1 kg", emoji: "🥕", img: "" },
      { id: "brinjal", cat: "veg", name: "Brinjal", price: 130, unit: "1 kg", emoji: "🍆", img: "" },
      { id: "banana", cat: "fruit", name: "Banana", price: 180, unit: "1 kg", emoji: "🍌", img: "/img/p-banana.jpg" },
      { id: "lime", cat: "fruit", name: "Lime", price: 90, unit: "250 g", emoji: "🍋", img: "" },
      { id: "pineapple", cat: "fruit", name: "Pineapple", price: 250, unit: "Each", emoji: "🍍", img: "" },
      { id: "watermelon", cat: "fruit", name: "Watermelon", price: 220, unit: "1 kg", emoji: "🍉", img: "" },
      { id: "spinach", cat: "green", name: "Spinach", price: 80, unit: "250 g", emoji: "🥬", img: "" },
      { id: "mint", cat: "green", name: "Mint", price: 60, unit: "100 g", emoji: "🌿", img: "" },
      { id: "kingcoconut", cat: "coconut", name: "King coconut", price: 150, unit: "Each", emoji: "🥥", img: "/img/p-coconut.jpg" },
      { id: "chillipowder", cat: "spice", name: "Chilli powder", price: 350, unit: "250 g", emoji: "🌶️", img: "" },
      { id: "garlic", cat: "spice", name: "Garlic", price: 600, unit: "1 kg", emoji: "🧄", img: "" },
      { id: "currylv", cat: "spice", name: "Curry leaves", price: 50, unit: "50 g", emoji: "🍃", img: "" },
      { id: "chicken", cat: "meat", name: "Chicken", price: 1250, unit: "1 kg", emoji: "🍗", img: "" },
      { id: "beef", cat: "meat", name: "Beef", price: 2200, unit: "1 kg", emoji: "🥩", img: "" },
      { id: "fish", cat: "meat", name: "Fresh fish", price: 1800, unit: "1 kg", emoji: "🐟", img: "" },
      { id: "eggs", cat: "meat", name: "Eggs", price: 540, unit: "Dozen", emoji: "🥚", img: "" },
    ],
  },
  cart: { title: "Your cart", empty: "Your cart is empty. Add something fresh!", total: "Total", checkout: "Order on WhatsApp", clear: "Clear cart", close: "Close cart", open: "Open cart", add: "Add to cart", order: "Hello Pasumai Fresh, I would like to order:" },
  footer: { cta: "Fresh, for your life", ctaLead: "Order today and have it at your door tomorrow.", button: "Order on WhatsApp" },
};

const ta: typeof en = {
  nav: { links: [["எங்களைப் பற்றி", "#about"], ["பொருட்கள்", "#products"], ["எப்படி", "#how"], ["கேள்விகள்", "#faq"]], cta: "WhatsApp-இல் ஆர்டர்", open: "மெனுவைத் திற", close: "மெனுவை மூடு" },
  hero: {
    before: "புதிய காய்கறி, பழங்கள்,",
    accent: "வீடு தேடி",
    lead: "காய்கறிகள், பழங்கள், கீரைகள், மசாலா, இறைச்சி - கொழும்பில் ஒரே கடையிலிருந்து, WhatsApp அல்லது இணையத்தில் ஆர்டர்.",
    fact: "இன்று ஆர்டர் செய்தால், நாளை உங்கள் வாசலில்",
    primary: "இப்போது வாங்குங்கள்",
    secondary: "WhatsApp-இல் ஆர்டர்",
    points: ["ஒவ்வொரு ஆர்டருக்கும் வீட்டு விநியோகம்", "வந்தபின் பணம்", "நியாயமான, தெளிவான விலை"],
  },
  marquee: ["காய்கறிகள்", "பழங்கள்", "செவ்விளநீர்", "கீரைகள்", "மளிகை", "மசாலா", "இறைச்சி"],
  marqueeLead: "உங்கள் சமையலறைக்கு எல்லாமே, ஓரிடத்தில்",
  about: {
    eyebrow: "பசுமை ஃப்ரெஷ் பற்றி",
    scrub:
      "உள்ளூர் விவசாயிகளிடமிருந்து புதிய காய்கறிகள், பழங்கள், செவ்விளநீரை நேராக உங்கள் சமையலறைக்குக் கொண்டுவருகிறோம். ஒவ்வொரு குடும்பமும் குறைந்த சிரமத்தில் நன்றாக உண்ண.",
    title: "உண்மையான தரம் தரும் புதிய உணவுத் தீர்வுகள்",
    features: [
      { icon: "leaf", title: "பண்ணைப் புதுமை", line: "சரியான நேரத்தில் பறித்து, கையால் தரம் பிரிக்கிறோம். உறுதியாக, சுத்தமாக, சுவையாக உங்களிடம் வரும்." },
      { icon: "shield", title: "அனுப்பும் முன் சரிபார்ப்பு", line: "ஒவ்வொரு பொருளும் பையில் போகும் முன் பார்க்கப்படுகிறது." },
      { icon: "tag", title: "நியாயமான, தெளிவான விலை", line: "ஒவ்வொரு பொருளுக்கும் ஒரே நேர்மையான விலை. மறைவான கட்டணம் இல்லை." },
      { icon: "truck", title: "விரைவான வீட்டு விநியோகம்", line: "இன்று ஆர்டர் செய்தால், நாளை உங்கள் வீட்டில்." },
    ],
  },
  how: {
    eyebrow: "எப்படி வேலை செய்கிறது",
    title: "புதிய உணவு, எளிதாக",
    lead: "பண்ணையிலிருந்து உங்கள் மேசைக்கு மூன்று எளிய படிகளில்.",
    steps: [
      { n: "01", title: "தேர்ந்தெடுங்கள்", line: "காய்கறிகள், பழங்கள், கீரைகள், மளிகையைப் பார்த்து இந்த வாரத்துக்குத் தேவையானதைத் தேர்ந்தெடுங்கள்.", emoji: "🛒" },
      { n: "02", title: "ஆர்டர்", line: "WhatsApp-இல் பட்டியலை அனுப்புங்கள் அல்லது இணையத்தில் ஆர்டர் செய்யுங்கள். சில நிமிடங்களில் உறுதிப்படுத்துவோம்.", emoji: "📲" },
      { n: "03", title: "பெறுங்கள்", line: "புதிதாகப் பொதி செய்து வீட்டுக்குக் கொண்டுவருவோம். வந்தபின் பணம் செலுத்துங்கள், அல்லது கடையில் எடுத்துக்கொள்ளுங்கள்.", emoji: "🚚" },
    ],
  },
  products: { eyebrow: "பொருட்கள்", title: "இன்றைய புதிய தேர்வுகள்", lead: "எங்கள் வாடிக்கையாளர்கள் ஒவ்வொரு வாரமும் ஆர்டர் செய்யும் சில விருப்பங்கள்.", more: "எல்லா பொருட்களையும் பார்" },
  solutions: {
    eyebrow: "விநியோகம்",
    title: "உணவைப் பெற எளிய வழிகள்",
    cards: [
      { title: "வீட்டு விநியோகம்", line: "ஒவ்வொரு ஆர்டரும் புதிதாகப் பொதி செய்து உங்கள் வாசலுக்கு.", img: "/img/banner-delivery.jpg" },
      { title: "கடையில் எடுத்தல்", line: "உங்களுக்கு வசதியான நேரத்தில் கடையில் எடுத்துக்கொள்ளுங்கள்.", img: "/img/cat-groceries.jpg" },
      { title: "கொடுக்கும்போது பணம்", line: "ஆர்டர் வந்தபின் பணம் செலுத்துங்கள், முன்பு அல்ல.", img: "/img/cat-fruits.jpg" },
    ],
  },
  testimonials: {
    eyebrow: "கருத்துகள்",
    title: "வாடிக்கையாளர்களின் அன்பான சொற்கள்",
    items: [
      { quote: "காய்கறிகள் எப்போதும் புதிது, விநியோகமும் நேரத்தில். இப்போது சந்தைக்குப் போவதையே நிறுத்திவிட்டேன்.", name: "நதீஷா பி.", place: "கொழும்பு 05" },
      { quote: "செவ்விளநீர் புதிதாக வெட்டி வாசலில். WhatsApp-இல் ஆர்டர் செய்ய இரண்டு நிமிடம் போதும்.", name: "ருவன் எஸ்.", place: "நுகேகொடை" },
      { quote: "நியாயமான விலை, ஆச்சரியங்கள் இல்லை. கீரைகள் வாரம் முழுவதும் குளிர்சாதனப் பெட்டியில் தாங்கும்.", name: "அனிதா கே.", place: "தெஹிவளை" },
    ],
    prev: "முந்தையது",
    next: "அடுத்தது",
  },
  faq: {
    eyebrow: "கேள்விகள்",
    title: "வாடிக்கையாளர்களின் பொதுவான கேள்விகள்",
    items: [
      { q: "ஆர்டர் செய்வது எப்படி?", a: "உங்கள் பட்டியலை WhatsApp-இல் அனுப்புங்கள் அல்லது இணையத்தில் ஆர்டர் செய்யுங்கள். பொருட்களையும் விநியோக நேரத்தையும் உறுதிப்படுத்துவோம்." },
      { q: "விநியோகம் எவ்வளவு விரைவு?", a: "இன்று ஆர்டர் செய்தால் நாளை உங்கள் வாசலில். ஒவ்வொரு ஆர்டருக்கும் வீட்டு விநியோகம் உண்டு." },
      { q: "பணம் எப்படிச் செலுத்துவது?", a: "ஆர்டர் வந்தபின் செலுத்துங்கள் (கொடுக்கும்போது பணம்). பார்த்த பின்பே செலுத்துவீர்கள்." },
      { q: "ஆர்டரை நானே எடுத்துக்கொள்ளலாமா?", a: "ஆம். கடையில் எடுத்தலைத் தேர்ந்தெடுத்து, வசதியான நேரத்தில் எடுத்துக்கொள்ளுங்கள்." },
      { q: "ஏதேனும் புதிதாக இல்லையென்றால்?", a: "உடனே WhatsApp-இல் சொல்லுங்கள், சரிசெய்வோம்." },
    ],
  },
  shop: {
    eyebrow: "கடை",
    title: "வகைப்படி வாங்குங்கள்",
    lead: "காய்கறிகள், பழங்கள், மசாலா, இறைச்சி மற்றும் பல. கூடையில் சேர்த்து WhatsApp-இல் ஆர்டர் செய்யுங்கள்.",
    all: "எல்லாம்",
    prev: "முந்தையது",
    next: "அடுத்தது",
    cats: [["veg", "🥕", "காய்கறிகள்"], ["fruit", "🍎", "பழங்கள்"], ["green", "🥬", "கீரைகள்"], ["coconut", "🥥", "செவ்விளநீர்"], ["spice", "🌶️", "மசாலா"], ["meat", "🥩", "இறைச்சி"]],
    items: [
      { id: "tomato", cat: "veg", name: "தக்காளி", price: 120, unit: "1 கிலோ", emoji: "🍅", img: "/img/p-tomato.jpg" },
      { id: "onion", cat: "veg", name: "சிவப்பு வெங்காயம்", price: 100, unit: "1 கிலோ", emoji: "🧅", img: "/img/p-onion.jpg" },
      { id: "potato", cat: "veg", name: "உருளைக்கிழங்கு", price: 90, unit: "1 கிலோ", emoji: "🥔", img: "/img/p-potato.jpg" },
      { id: "chilli", cat: "veg", name: "பச்சை மிளகாய்", price: 140, unit: "1 கிலோ", emoji: "🌶️", img: "/img/p-chilli.jpg" },
      { id: "carrot", cat: "veg", name: "கேரட்", price: 160, unit: "1 கிலோ", emoji: "🥕", img: "" },
      { id: "brinjal", cat: "veg", name: "கத்தரிக்காய்", price: 130, unit: "1 கிலோ", emoji: "🍆", img: "" },
      { id: "banana", cat: "fruit", name: "வாழைப்பழம்", price: 180, unit: "1 கிலோ", emoji: "🍌", img: "/img/p-banana.jpg" },
      { id: "lime", cat: "fruit", name: "எலுமிச்சை", price: 90, unit: "250 கி", emoji: "🍋", img: "" },
      { id: "pineapple", cat: "fruit", name: "அன்னாசி", price: 250, unit: "ஒன்று", emoji: "🍍", img: "" },
      { id: "watermelon", cat: "fruit", name: "தர்பூசணி", price: 220, unit: "1 கிலோ", emoji: "🍉", img: "" },
      { id: "spinach", cat: "green", name: "பசலைக்கீரை", price: 80, unit: "250 கி", emoji: "🥬", img: "" },
      { id: "mint", cat: "green", name: "புதினா", price: 60, unit: "100 கி", emoji: "🌿", img: "" },
      { id: "kingcoconut", cat: "coconut", name: "செவ்விளநீர்", price: 150, unit: "ஒன்று", emoji: "🥥", img: "/img/p-coconut.jpg" },
      { id: "chillipowder", cat: "spice", name: "மிளகாய்த் தூள்", price: 350, unit: "250 கி", emoji: "🌶️", img: "" },
      { id: "garlic", cat: "spice", name: "பூண்டு", price: 600, unit: "1 கிலோ", emoji: "🧄", img: "" },
      { id: "currylv", cat: "spice", name: "கறிவேப்பிலை", price: 50, unit: "50 கி", emoji: "🍃", img: "" },
      { id: "chicken", cat: "meat", name: "கோழி", price: 1250, unit: "1 கிலோ", emoji: "🍗", img: "" },
      { id: "beef", cat: "meat", name: "மாட்டிறைச்சி", price: 2200, unit: "1 கிலோ", emoji: "🥩", img: "" },
      { id: "fish", cat: "meat", name: "புதிய மீன்", price: 1800, unit: "1 கிலோ", emoji: "🐟", img: "" },
      { id: "eggs", cat: "meat", name: "முட்டை", price: 540, unit: "டஜன்", emoji: "🥚", img: "" },
    ],
  },
  cart: { title: "உங்கள் கூடை", empty: "உங்கள் கூடை காலியாக உள்ளது. புதியதைச் சேருங்கள்!", total: "மொத்தம்", checkout: "WhatsApp-இல் ஆர்டர்", clear: "கூடையை அழி", close: "கூடையை மூடு", open: "கூடையைத் திற", add: "கூடையில் சேர்", order: "வணக்கம் பசுமை ஃப்ரெஷ், நான் ஆர்டர் செய்ய விரும்புகிறேன்:" },
  footer: { cta: "உங்கள் வாழ்வுக்குப் புதியது", ctaLead: "இன்று ஆர்டர் செய்யுங்கள், நாளை உங்கள் வாசலில்.", button: "WhatsApp-இல் ஆர்டர்" },
};

export type Content = typeof en;
export const getContent = (lang: Locale): Content => (lang === "ta" ? ta : en);
