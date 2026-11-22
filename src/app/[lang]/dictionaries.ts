// Every word the site shows, in both languages. English is written first and is the default while the
// site is built (next.config.ts sends / to /en); the Tamil is translated from it afterwards.
// Only facts the owner gave: fresh vegetables and fruits, home delivery on every order, WhatsApp orders,
// and the categories. The sub-groups under Vegetables and Fruits are placeholders to confirm.

const ta = {
  meta: {
    title: "Pasumai Fresh",
    description: "புத்தம் புதிய காய்கறிகள், பழங்கள் - உங்கள் வீட்டு கதவில்",
  },
  skip: "உள்ளடக்கத்திற்குச் செல்ல",
  home: "முகப்பு",
  menu: { label: "மெனு", open: "மெனுவைத் திற", close: "மெனுவை மூடு" },
  categories: "வகைகள்",
  language: "மொழி",
  search: { label: "பொருட்களைத் தேடுங்கள்", placeholder: "தேடுங்கள்", button: "தேடு" },
  cart: "கார்ட்",
  cartItems: "பொருட்கள்",
  whatsapp: "WhatsApp-இல் ஆர்டர்",
  nav: [
    {
      label: "காய்கறிகள்",
      slug: "/vegetables",
      links: [
        { label: "நாட்டுக் காய்கறிகள்", href: "/vegetables?type=local" },
        { label: "மலையகக் காய்கறிகள்", href: "/vegetables?type=upcountry" },
        { label: "கிழங்கு வகைகள்", href: "/vegetables?type=tubers" },
        { label: "கீரைகள்", href: "/greens" },
      ],
      all: "அனைத்து காய்கறிகள்",
    },
    {
      label: "பழங்கள்",
      slug: "/fruits",
      links: [
        { label: "உள்நாட்டுப் பழங்கள்", href: "/fruits?type=local" },
        { label: "பருவகாலப் பழங்கள்", href: "/fruits?type=seasonal" },
        { label: "இறக்குமதிப் பழங்கள்", href: "/fruits?type=imported" },
      ],
      all: "அனைத்து பழங்கள்",
    },
    {
      label: "மளிகை",
      slug: "/groceries",
      links: [
        { label: "இறைச்சி", href: "/meat" },
        { label: "மசாலா பொருட்கள்", href: "/spices" },
        { label: "சமையல் பொருள்கள்", href: "/cooking" },
      ],
      all: "அனைத்து மளிகை",
    },
  ],
  hero: {
    chip: "அனைத்து ஆர்டர்களுக்கும் வீட்டிற்கு விநியோகம்",
    title: "புத்தம் புதிய காய்கறிகள், உங்கள் வீட்டு கதவில்",
    lead: "காய்கறிகள், பழங்கள், கீரைகள், இறைச்சி, மசாலா - ஒரே இடத்தில் ஆர்டர் செய்யுங்கள்.",
    deliveryLabel: "விநியோகம்",
    deliveryValue: "ஒவ்வொரு ஆர்டருக்கும்",
    shop: "காய்கறிகளை வாங்க",
    tags: [
      { label: "காய்கறிகள்", slug: "/vegetables" },
      { label: "பழங்கள்", slug: "/fruits" },
      { label: "கீரைகள்", slug: "/greens" },
    ],
    imageAlt: "பூசணி, குடைமிளகாய், வெங்காயம், ப்ரோக்கோலி மற்றும் மிளகாய்",
    basketAlt: "கூடையில் புத்தம் புதிய காய்கறிகள், கீரைகள் மற்றும் பழங்கள்",
  },
  // The page that rises over the hero: the categories (owner, 12 Nov - wording and counts from the
  // owner's own design).
  // The site's hero: full-screen photo slides (owner's reference, 16 Nov). Written in English first;
  // this Tamil is a first pass to be redone when the site is translated.
  front: {
    slides: [
      { label: "Pasumai Fresh", title: "பசுமையான காய்கறிகள், பழங்கள், இளநீர் - உங்கள் வீட்டிற்கே", img: "/img/hero-1.jpg" },
      { label: "வீட்டிற்கு விநியோகம்", title: "இன்றே ஆர்டர் செய்யுங்கள், நாளை உங்கள் கதவில்", img: "/img/hero-2.jpg" },
      { label: "புத்தம் புதியது · தரமானது", title: "நல்ல உணவு, நல்ல வாழ்க்கை", img: "/img/hero-3.jpg" },
    ],
    shop: "கடையில் வாங்க",
    scroll: "கீழே",
    slide: "படம்",
    categories: "வகைகள்",
    categoriesEyebrow: "வகைகள்",
  },
  products: {
    title: "சிறப்பு பொருட்கள்",
    all: "அனைத்தையும் காண",
    shop: "WhatsApp மூலம் ஆர்டர்",
    add: "கார்டில் சேர்க்க",
    added: "சேர்க்கப்பட்டது",
    unit: "ரூ.",
    order: "வணக்கம் Pasumai Fresh, எனக்கு ஆர்டர் செய்ய வேண்டும்",
    items: [
      { group: "தினசரி காய்கறிகள்", name: "தக்காளி", price: 120, line: "கறி, சம்பல் மற்றும் சாலட்டுக்கு.", tags: ["1 கிலோ", "காய்கறிகள்", "வீட்டிற்கு விநியோகம்"], img: "/img/p-tomato.jpg" },
      { group: "சமையல் அடிப்படை", name: "வெங்காயம்", price: 100, line: "ஒவ்வொரு கறிக்கும் அடிப்படை.", tags: ["1 கிலோ", "காய்கறிகள்", "Home delivery"], img: "/img/p-onion.jpg" },
      { group: "கிழங்கு வகைகள்", name: "உருளைக்கிழங்கு", price: 90, line: "கறி, பொரியல் மற்றும் வறுவலுக்கு.", tags: ["1 கிலோ", "காய்கறிகள்", "வீட்டிற்கு விநியோகம்"], img: "/img/p-potato.jpg" },
      { group: "காரம்", name: "பச்சை மிளகாய்", price: 140, line: "தினசரி சமையலுக்கு புதிய பச்சை மிளகாய்.", tags: ["1 கிலோ", "காய்கறிகள்", "Home delivery"], img: "/img/p-chilli.jpg" },
      { group: "புதிய பழங்கள்", name: "வாழைப்பழம்", price: 180, line: "இனிப்பான பழுத்த வாழைப்பழம்.", tags: ["1 கிலோ", "பழங்கள்", "வீட்டிற்கு விநியோகம்"], img: "/img/p-banana.jpg" },
      { group: "இயற்கை குளிர்ச்சி", name: "இளநீர்", price: 150, line: "புதிதாக வெட்டிய இனிப்பான இளநீர்.", tags: ["1 பெரியது", "இளநீர்", "Home delivery"], img: "/img/p-coconut.jpg" },
    ],
  },
  // The lower sections (owner, 19 Nov: "complete all the sections"), in the order of the owner's shop
  // design: services and the two banners, why choose us, the footer. Tamil is a first pass.
  more: {
    services: {
      eyebrow: "விநியோகம்",
      title: "உங்கள் விருப்பப்படி",
      lead: "WhatsApp அல்லது இணையத்தில் ஆர்டர் செய்யுங்கள். எப்படி பெறுவது, எப்படி செலுத்துவது என்பதை நீங்களே தேர்ந்தெடுங்கள்.",
      items: [
        { icon: "truck", title: "வீட்டிற்கு விநியோகம்", line: "ஒவ்வொரு ஆர்டரும் உங்கள் வீட்டு வாசலுக்கு." },
        { icon: "store", title: "கடையில் வாங்குதல்", line: "உங்களுக்கு வசதியான நேரத்தில் கடையில் பெற்றுக்கொள்ளுங்கள்." },
        { icon: "cash", title: "பாதுகாப்பான கொடுப்பனவு", line: "Cash on delivery - பொருள் வந்ததும் பணம் செலுத்துங்கள்." },
      ],
      food: { title: "நல்ல உணவு, நல்ல வாழ்க்கை", line: "உங்கள் சமையலறைக்கு புதிய காய்கறிகள்.", cta: "கடையில் வாங்க", img: "/img/banner-basket.jpg" },
      order: { title: "உங்கள் ஆர்டர் எங்கள் பொறுப்பு", line: "பசுமையான பொருட்கள், நேரத்தில் உங்கள் வீட்டிற்கு.", cta: "WhatsApp மூலம் ஆர்டர்", img: "/img/banner-delivery.jpg" },
    },
    why: {
      eyebrow: "ஏன் நாங்கள்",
      title: "எங்களை ஏன் தேர்ந்தெடுக்க வேண்டும்?",
      lead: "ஒவ்வொரு ஆர்டரிலும் நாம் கவனிக்கும் ஐந்து விஷயங்கள்.",
      img: "/img/why-hands.jpg",
      items: [
        { icon: "leaf", title: "புதிய மற்றும் தரமான பொருட்கள்", line: "அனுப்பும் முன் ஒவ்வொரு பொருளும் சரிபார்க்கப்படும்." },
        { icon: "tag", title: "நியாயமான விலை", line: "ஒவ்வொரு பொருளுக்கும் தெளிவான விலை." },
        { icon: "clock", title: "விரைவான சேவை", line: "இன்று ஆர்டர் செய்தால் நாளை உங்கள் வீட்டில்." },
        { icon: "shield", title: "பாதுகாப்பான கொடுப்பனவு", line: "பொருள் வந்த பிறகே பணம்." },
        { icon: "headset", title: "வாடிக்கையாளர் ஆதரவு", line: "WhatsApp-இல் எப்போதும் எங்களை தொடர்பு கொள்ளுங்கள்." },
      ],
    },
    footer: {
      tagline: "பசுமை... உங்கள் வாழ்க்கைக்கு",
      about: "புத்தம் புதிய காய்கறிகள், பழங்கள் மற்றும் இளநீர் - உங்கள் வீட்டு கதவில்.",
      links: "விரைவு இணைப்புகள்",
      home: "முகப்பு",
      contact: "தொடர்பு கொள்ள",
      place: "கொழும்பு, இலங்கை",
      follow: "எங்களை பின்தொடருங்கள்",
      rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      photos: "படங்கள்: Unsplash",
    },
  },
  shelf: {
    title: "பசுமையான காய்கறிகள், பழங்கள், இளநீர் - உங்கள் வீட்டிற்கே!",
    lead: "இன்றே ஆர்டர் செய்யுங்கள்... நாளை உங்கள் கதவில்!",
    shop: "கடையில் வாங்க",
    items: [
      { label: "காய்கறிகள்", note: "150+ பொருட்கள்", slug: "/vegetables", img: "/img/cat-vegetables.jpg" },
      { label: "பழங்கள்", note: "100+ பொருட்கள்", slug: "/fruits", img: "/img/cat-fruits.jpg" },
      { label: "இளநீர்", note: "புதிய இளநீர்", slug: "/king-coconut", img: "/img/cat-coconut.jpg" },
      { label: "கீரைகள்", note: "50+ வகைகள்", slug: "/greens", img: "/img/cat-greens.jpg" },
      { label: "மளிகை பொருட்கள்", note: "200+ பொருட்கள்", slug: "/groceries", img: "/img/cat-groceries.jpg" },
    ],
    // Two rows of five (owner, 12 Nov). The first six are from the owner's design; the last four are
    // common items added to fill the second row - to confirm.
    popular: [
      "தக்காளி", "வெங்காயம்", "உருளைக்கிழங்கு", "பச்சை மிளகாய்", "வாழைப்பழம்",
      "இளநீர்", "கேரட்", "கத்தரிக்காய்", "பப்பாளி", "எலுமிச்சை",
    ],
  },
};

export type Dictionary = typeof ta;

const en: Dictionary = {
  meta: {
    title: "Pasumai Fresh",
    description: "Fresh vegetables and fruits, delivered to your door",
  },
  skip: "Skip to content",
  home: "Home",
  menu: { label: "Menu", open: "Open menu", close: "Close menu" },
  categories: "Categories",
  language: "Language",
  search: { label: "Search products", placeholder: "Search", button: "Search" },
  cart: "Cart",
  cartItems: "items",
  whatsapp: "Order on WhatsApp",
  nav: [
    {
      label: "Vegetables",
      slug: "/vegetables",
      links: [
        { label: "Local vegetables", href: "/vegetables?type=local" },
        { label: "Up-country vegetables", href: "/vegetables?type=upcountry" },
        { label: "Tubers", href: "/vegetables?type=tubers" },
        { label: "Greens", href: "/greens" },
      ],
      all: "All vegetables",
    },
    {
      label: "Fruits",
      slug: "/fruits",
      links: [
        { label: "Local fruits", href: "/fruits?type=local" },
        { label: "Seasonal fruits", href: "/fruits?type=seasonal" },
        { label: "Imported fruits", href: "/fruits?type=imported" },
      ],
      all: "All fruits",
    },
    {
      label: "Groceries",
      slug: "/groceries",
      links: [
        { label: "Meat", href: "/meat" },
        { label: "Spices", href: "/spices" },
        { label: "Cooking essentials", href: "/cooking" },
      ],
      all: "All groceries",
    },
  ],
  hero: {
    chip: "Home delivery on every order",
    title: "Fresh vegetables, delivered to your door",
    lead: "Vegetables, fruits, greens, meat and spices, ordered in one place.",
    deliveryLabel: "Delivery",
    deliveryValue: "On every order",
    shop: "Shop vegetables",
    tags: [
      { label: "Vegetables", slug: "/vegetables" },
      { label: "Fruits", slug: "/fruits" },
      { label: "Greens", slug: "/greens" },
    ],
    imageAlt: "Pumpkins, bell peppers, onions, broccoli and chillies",
    basketAlt: "Baskets of fresh vegetables, greens and fruit",
  },
  front: {
    slides: [
      { label: "Pasumai Fresh", title: "Fresh vegetables, fruits and king coconut, right to your home", img: "/img/hero-1.jpg" },
      { label: "Home delivery", title: "Order today, at your door tomorrow", img: "/img/hero-2.jpg" },
      { label: "Fresh · Quality", title: "Good food, good life", img: "/img/hero-3.jpg" },
    ],
    shop: "Shop now",
    scroll: "Scroll",
    slide: "Slide",
    categories: "Shop by category",
    categoriesEyebrow: "Categories",
  },
  // Special products (owner, 17 Nov, layout after the owner's lumera product reference). Names, the
  // 1 kg / each units and the prices are from the owner's own shop design; photos from Unsplash.
  products: {
    title: "Special products",
    all: "See all products",
    shop: "Order now",
    add: "Add to cart",
    added: "Added",
    unit: "Rs.",
    order: "Hello Pasumai Fresh, I would like to order",
    items: [
      { group: "Everyday vegetables", name: "Tomato", price: 120, line: "Firm, red and full of flavour, for curries, sambols and salads.", tags: ["1 kg", "Vegetables", "Home delivery"], img: "/img/p-tomato.jpg" },
      { group: "Kitchen staples", name: "Red onion", price: 100, line: "The base of every curry, sorted and ready for your kitchen.", tags: ["1 kg", "Vegetables", "Home delivery"], img: "/img/p-onion.jpg" },
      { group: "Root vegetables", name: "Potato", price: 90, line: "Clean, even potatoes for curries, fries and roasting.", tags: ["1 kg", "Vegetables", "Home delivery"], img: "/img/p-potato.jpg" },
      { group: "Spice and heat", name: "Green chilli", price: 140, line: "Fresh green chillies for the heat in your everyday cooking.", tags: ["1 kg", "Vegetables", "Home delivery"], img: "/img/p-chilli.jpg" },
      { group: "Fresh fruit", name: "Banana", price: 180, line: "Sweet, ripe bananas for breakfast, lunch boxes and snacks.", tags: ["1 kg", "Fruits", "Home delivery"], img: "/img/p-banana.jpg" },
      { group: "Cool and natural", name: "King coconut", price: 150, line: "Sweet king coconut water, cut fresh and ready to drink.", tags: ["Each", "King coconut", "Home delivery"], img: "/img/p-coconut.jpg" },
    ],
  },
  more: {
    services: {
      eyebrow: "Delivery",
      title: "Delivered your way",
      lead: "Order on WhatsApp or online. You choose how it reaches you and how you pay.",
      items: [
        { icon: "truck", title: "Home delivery", line: "Every order brought to your door." },
        { icon: "store", title: "Store pickup", line: "Collect your order from the shop when it suits you." },
        { icon: "cash", title: "Cash on delivery", line: "Pay when your order arrives, not before." },
      ],
      food: { title: "Good food, good life", line: "Fresh vegetables, picked for your kitchen.", cta: "Shop now", img: "/img/banner-basket.jpg" },
      order: { title: "Your order, on its way", line: "Fresh food, brought home on time.", cta: "Order on WhatsApp", img: "/img/banner-delivery.jpg" },
    },
    why: {
      eyebrow: "Why us",
      title: "Why shop with Pasumai Fresh",
      lead: "Five things we look after on every order.",
      img: "/img/why-hands.jpg",
      items: [
        { icon: "leaf", title: "Fresh and quality products", line: "Every item is checked before it leaves us." },
        { icon: "tag", title: "Fair prices", line: "One clear price on every product." },
        { icon: "clock", title: "Fast service", line: "Order today, at your door tomorrow." },
        { icon: "shield", title: "Safe payment", line: "You pay only when your order arrives." },
        { icon: "headset", title: "Customer support", line: "Reach us any time on WhatsApp." },
      ],
    },
    footer: {
      tagline: "Fresh, for your life",
      about: "Fresh vegetables, fruits and king coconut, delivered to your door.",
      links: "Quick links",
      home: "Home",
      contact: "Contact",
      place: "Colombo, Sri Lanka",
      follow: "Follow us",
      rights: "All rights reserved.",
      photos: "Photos: Unsplash",
    },
  },
  shelf: {
    title: "Fresh vegetables, fruits and king coconut, right to your home",
    lead: "Order today, at your door tomorrow.",
    shop: "Shop now",
    items: [
      { label: "Vegetables", note: "150+ products", slug: "/vegetables", img: "/img/cat-vegetables.jpg" },
      { label: "Fruits", note: "100+ products", slug: "/fruits", img: "/img/cat-fruits.jpg" },
      { label: "King coconut", note: "Fresh king coconut", slug: "/king-coconut", img: "/img/cat-coconut.jpg" },
      { label: "Greens", note: "50+ kinds", slug: "/greens", img: "/img/cat-greens.jpg" },
      { label: "Groceries", note: "200+ products", slug: "/groceries", img: "/img/cat-groceries.jpg" },
    ],
    popular: [
      "Tomato", "Onion", "Potato", "Green chilli", "Banana",
      "King coconut", "Carrot", "Brinjal", "Papaya", "Lime",
    ],
  },
};

const dictionaries = { ta, en };

// The owner's WhatsApp line (from their first screenshot; it looks like a sample number, to confirm).
export const WHATSAPP = { label: "+94 76 123 4567", href: "https://wa.me/94761234567" };

export type Locale = keyof typeof dictionaries;
export const LOCALES = Object.keys(dictionaries) as Locale[];
export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;
export const getDictionary = (locale: Locale) => dictionaries[locale];
