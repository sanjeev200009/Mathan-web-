"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHATSAPP, type Locale } from "@/app/[lang]/dictionaries";

gsap.registerPlugin(ScrollTrigger);

// "Why Pasumai Fresh" (owner, 22 Nov): the part after the special products. It slides up over them as a
// layer (rounded top, soft shadow; SpecialWheel holds still for one screen so this can cover it), then
// stays in place while a WhatsApp chat plays with the scroll: a customer asks why to choose the shop, how it
// delivers and what it sells, and the shop answers, each answer after a moment of "typing...". The three
// topics beside the phone fill up in step with the chat: each topic's line fills while its part plays.
// The phone is drawn as an iPhone 14 Pro (393 x 852 points, Dynamic Island, side buttons) showing the iOS
// WhatsApp chat screen: light header, beige doodle wallpaper, bubbles with tails, the iOS input bar.
// Type: Open Sans (owner: a clear, premium face).
// Every answer is a fact the shop already states elsewhere on the site (home delivery, order today at
// your door tomorrow, store pickup, cash on delivery, checked before it leaves, one clear price, the four
// vegetable categories). ponytail: no numbers or milestones yet - add real ones (orders delivered, years
// open) when the shop gives them; never invent them.
type Msg = { me?: boolean; text: string; topic: number };

const COPY = {
  en: {
    eyebrow: "Why Pasumai Fresh",
    title: "Fresh vegetables, one message away",
    lead: "Ask us anything on WhatsApp. This is how a chat with us usually goes.",
    topics: [
      { title: "Why choose us", line: "Farm-fresh, checked by hand, one clear price." },
      { title: "How we deliver", line: "Order on WhatsApp, at your door tomorrow, pay on delivery." },
      { title: "What we offer", line: "Local and up-country vegetables, tubers and greens." },
    ],
    cta: "Chat with us on WhatsApp",
    online: "online",
    typing: "typing…",
    today: "Today",
    input: "Message",
    msgs: [
      { me: true, text: "Hi! Why should I order my vegetables from you?", topic: 0 },
      { text: "Fresh from local farms 🌱 Picked at the right time and checked by hand before it leaves us.", topic: 0 },
      { text: "One clear price on every product. No hidden extras at the door.", topic: 0 },
      { me: true, text: "How do you deliver?", topic: 1 },
      { text: "Send your list right here. We confirm it with you in minutes.", topic: 1 },
      { text: "Order today, at your door tomorrow 🚚 Or collect it from the shop.", topic: 1 },
      { text: "And you pay when it arrives. Cash on delivery.", topic: 1 },
      { me: true, text: "What can I get?", topic: 2 },
      { text: "Local and up-country vegetables, tubers and greens 🥬 Everything for your kitchen.", topic: 2 },
      { me: true, text: "Perfect, sending my list now 👍", topic: 2 },
    ] as Msg[],
  },
  ta: {
    eyebrow: "ஏன் பசுமை ஃப்ரெஷ்",
    title: "புதிய காய்கறிகள், ஒரு செய்தி தூரத்தில்",
    lead: "WhatsApp-இல் எதையும் கேளுங்கள். எங்களுடன் ஒரு உரையாடல் பொதுவாக இப்படித்தான் இருக்கும்.",
    topics: [
      { title: "ஏன் எங்களைத் தேர்ந்தெடுக்க வேண்டும்", line: "பண்ணைப் புதுமை, கையால் சரிபார்ப்பு, ஒரே தெளிவான விலை." },
      { title: "எப்படி விநியோகிக்கிறோம்", line: "WhatsApp-இல் ஆர்டர், நாளை உங்கள் வாசலில், வந்தபின் பணம்." },
      { title: "என்ன கிடைக்கும்", line: "நாட்டு, மலையகக் காய்கறிகள், கிழங்குகள், கீரைகள்." },
    ],
    cta: "WhatsApp-இல் எங்களுடன் பேசுங்கள்",
    online: "இணைப்பில்",
    typing: "தட்டச்சு செய்கிறது…",
    today: "இன்று",
    input: "செய்தி",
    msgs: [
      { me: true, text: "வணக்கம்! உங்களிடம் ஏன் காய்கறி ஆர்டர் செய்ய வேண்டும்?", topic: 0 },
      { text: "உள்ளூர் பண்ணைகளிலிருந்து புதிதாக 🌱 சரியான நேரத்தில் பறித்து, அனுப்பும் முன் கையால் சரிபார்க்கிறோம்.", topic: 0 },
      { text: "ஒவ்வொரு பொருளுக்கும் ஒரே தெளிவான விலை. வாசலில் மறைவான கட்டணம் இல்லை.", topic: 0 },
      { me: true, text: "எப்படி விநியோகம் செய்கிறீர்கள்?", topic: 1 },
      { text: "உங்கள் பட்டியலை இங்கேயே அனுப்புங்கள். சில நிமிடங்களில் உறுதிப்படுத்துவோம்.", topic: 1 },
      { text: "இன்று ஆர்டர் செய்தால், நாளை உங்கள் வாசலில் 🚚 அல்லது கடையில் எடுத்துக்கொள்ளலாம்.", topic: 1 },
      { text: "பொருள் வந்தபின் பணம் செலுத்துங்கள்.", topic: 1 },
      { me: true, text: "என்ன கிடைக்கும்?", topic: 2 },
      { text: "நாட்டு, மலையகக் காய்கறிகள், கிழங்குகள், கீரைகள் 🥬 உங்கள் சமையலறைக்கு எல்லாமே.", topic: 2 },
      { me: true, text: "அருமை, இப்போதே பட்டியலை அனுப்புகிறேன் 👍", topic: 2 },
    ] as Msg[],
  },
};

const OS = '"Open Sans Variable", "Open Sans", "Noto Sans Tamil", system-ui, sans-serif';
const SF = '-apple-system, "SF Pro Text", "Segoe UI", "Open Sans Variable", "Noto Sans Tamil", sans-serif';
const PER_MSG = 0.35; // screens of scrolling per chat message
const TIMES = ["9:41", "9:41", "9:41", "9:42", "9:42", "9:42", "9:43", "9:43", "9:43", "9:44"];
const WA = "#1daa61"; // WhatsApp's iOS tint
const PHONE_W = 421; // iPhone 14 Pro outside, in points: 393 x 852 screen + 14pt bezel each side
const PHONE_H = 880;

// The light WhatsApp wallpaper: beige with faint line doodles.
const DOODLES = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' fill='none' stroke='#cdc3b0' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' opacity='0.55'>` +
    `<path d='M20 40c0-11 9-20 20-20 0 11-9 20-20 20z M20 40l12-12'/>` +
    `<circle cx='120' cy='30' r='9'/><path d='M116 30h8M120 26v8'/>` +
    `<path d='M150 90l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z'/>` +
    `<path d='M30 120c-6-6-6-14 0-17 4-2 8 0 9 3 1-3 5-5 9-3 6 3 6 11 0 17l-9 8z'/>` +
    `<rect x='80' y='70' width='26' height='20' rx='5'/><path d='M86 90l-4 6 9-6'/>` +
    `<path d='M95 140c10-10 22-6 26 2-8 2-14 8-14 18-8-4-14-12-12-20z'/>` +
    `<circle cx='160' cy='160' r='4'/><circle cx='60' cy='80' r='3'/><path d='M50 160h14M57 153v14'/>` +
  `</svg>`,
)}")`;

function Tick() {
  return (
    <svg viewBox="0 0 16 11" width="16" height="11" fill="#53bdeb" aria-hidden="true">
      <path d="M11.07.65 10.4.12a.36.36 0 0 0-.5.06L4.68 6.9 2.4 4.75a.36.36 0 0 0-.5.02l-.6.66a.36.36 0 0 0 .02.5l3.07 2.9a.36.36 0 0 0 .52-.03l6.2-7.66a.36.36 0 0 0-.04-.5zm4 0-.66-.53a.36.36 0 0 0-.5.06L8.68 6.9 8.2 6.45l-.86 1.06 1.13 1.07a.36.36 0 0 0 .52-.03l6.2-7.66a.36.36 0 0 0-.04-.5z" />
    </svg>
  );
}

// The iPhone itself, at its own 421 x 880 size; the caller scales it.
function Phone({ c, shown, typing }: { c: (typeof COPY)["en"]; shown: number; typing: boolean }) {
  return (
    <div className="relative" style={{ width: PHONE_W, height: PHONE_H, fontFamily: SF }}>
      {/* Side buttons: action and volume on the left, power on the right */}
      {[
        { left: -3, top: 170, h: 32 },
        { left: -3, top: 228, h: 62 },
        { left: -3, top: 302, h: 62 },
        { right: -3, top: 260, h: 96 },
      ].map((b, i) => (
        <span key={i} aria-hidden="true" className="absolute w-[5px] rounded-[3px] bg-[linear-gradient(90deg,#3a3a3c,#6e6e73,#3a3a3c)]" style={{ left: b.left, right: b.right, top: b.top, height: b.h }} />
      ))}
      {/* Titanium band and black bezel */}
      <div className="absolute inset-0 rounded-[68px] bg-[linear-gradient(145deg,#8e8e93,#3a3a3c_35%,#2c2c2e_65%,#8e8e93)] p-[3px] shadow-[0_50px_90px_-35px_rgba(0,0,0,0.55),0_18px_36px_-18px_rgba(0,0,0,0.35)]">
        <div className="size-full rounded-[65px] bg-black p-[11px]">
          {/* The screen: 393 x 852 */}
          <div className="relative flex size-full flex-col overflow-hidden rounded-[55px] bg-[#efeae2]">
            {/* Status bar + Dynamic Island */}
            <div className="relative flex h-[54px] shrink-0 items-center justify-between bg-[#f6f6f6] px-[34px] pt-[6px] text-black">
              <span className="text-[17px] font-semibold tracking-[-0.02em]">9:41</span>
              <span aria-hidden="true" className="absolute left-1/2 top-[11px] h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
              <span className="flex items-center gap-[6px]" aria-hidden="true">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="black"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="black"><path d="M8 2.4c2.3 0 4.4.9 6 2.3l1.1-1.2A10.6 10.6 0 0 0 8 .7 10.6 10.6 0 0 0 .9 3.5L2 4.7a8.9 8.9 0 0 1 6-2.3zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.1-1.2A7 7 0 0 0 8 4.1a7 7 0 0 0-4.7 1.9l1.1 1.2c1-.9 2.2-1.4 3.6-1.4zm0 3.4c.5 0 1 .2 1.3.5L8 11.3 6.7 9.7c.3-.3.8-.5 1.3-.5z" /></svg>
                <svg width="27" height="13" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" fill="none" stroke="black" opacity="0.35" /><rect x="2" y="2" width="19" height="9" rx="2" fill="black" /><path d="M24.5 4.5v4c.8-.3 1.5-1 1.5-2s-.7-1.7-1.5-2z" fill="black" opacity="0.4" /></svg>
              </span>
            </div>

            {/* WhatsApp header (iOS): light, tinted icons */}
            <div className="flex h-[56px] shrink-0 items-center gap-[10px] border-b border-black/[0.08] bg-[#f6f6f6] px-[10px]">
              <svg width="13" height="22" viewBox="0 0 13 22" fill="none" stroke={WA} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 2 2 11l9 9" /></svg>
              <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#cbec4b] text-[#022a09]">
                <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true"><path fill="currentColor" d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18z" /></svg>
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[17px] font-semibold text-black">Pasumai Fresh</span>
                <span className="block truncate text-[13px] text-[#667781]">{typing ? c.typing : c.online}</span>
              </span>
              <svg width="26" height="18" viewBox="0 0 26 18" fill="none" stroke={WA} strokeWidth="1.9" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="2" width="16" height="14" rx="3.5" /><path d="m17 7 7-4v12l-7-4z" /></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={WA} strokeWidth="1.9" strokeLinejoin="round" className="ml-[14px] mr-[4px]" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
            </div>

            {/* Messages over the wallpaper: the newest at the bottom, older ones pushed up */}
            <div className="flex min-h-0 flex-1 flex-col justify-end gap-[3px] overflow-hidden px-[12px] pb-[10px] pt-[8px]" style={{ backgroundImage: DOODLES }}>
              <span className="mx-auto mb-[6px] rounded-[8px] bg-white/90 px-[10px] py-[3px] text-[12px] font-medium text-[#54656f] shadow-[0_1px_0.5px_rgba(11,20,26,0.1)]">{c.today}</span>
              {c.msgs.slice(0, shown).map((m, i) => {
                const first = i === 0 || c.msgs[i - 1].me !== m.me; // a new speaker gets the bubble tail and a little space
                return (
                  <div
                    key={i}
                    className={`bubble relative max-w-[78%] px-[9px] pb-[5px] pt-[6px] text-[16px] leading-[21px] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${first ? "mt-[6px]" : ""} ${
                      m.me ? `self-end bg-[#d9fdd3] [transform-origin:bottom_right] ${first ? "rounded-[17px] rounded-tr-[4px]" : "rounded-[17px]"}` : `self-start bg-white [transform-origin:bottom_left] ${first ? "rounded-[17px] rounded-tl-[4px]" : "rounded-[17px]"}`
                    }`}
                  >
                    {first && (
                      <svg aria-hidden="true" width="9" height="13" viewBox="0 0 9 13" className={`absolute top-0 ${m.me ? "-right-[7px]" : "-left-[7px] -scale-x-100"}`} fill={m.me ? "#d9fdd3" : "#ffffff"}>
                        <path d="M0 0h9C6 3 3 7 1 13 1 8 .6 3 0 0z" />
                      </svg>
                    )}
                    {m.text}
                    <span className="float-right ml-[8px] mt-[6px] inline-flex items-center gap-[3px] text-[11px] leading-none text-[#667781]">
                      {TIMES[i] ?? ""}
                      {m.me && <Tick />}
                    </span>
                  </div>
                );
              })}
              {typing && (
                <div className="bubble mt-[6px] self-start rounded-[17px] rounded-tl-[4px] bg-white px-[14px] py-[12px] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] [transform-origin:bottom_left]" aria-hidden="true">
                  <span className="flex gap-[4px]">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="size-[7px] rounded-full bg-[#8696a0]" style={{ animation: `typing-dot 1s ${d * 0.15}s infinite ease-in-out` }} />
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* iOS WhatsApp input bar + home indicator */}
            <div className="shrink-0 bg-[#f6f6f6] px-[10px] pb-[30px] pt-[8px]">
              <div className="flex items-center gap-[12px]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={WA} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 4v16M4 12h16" /></svg>
                <span className="flex h-[36px] flex-1 items-center justify-between rounded-full border border-black/[0.12] bg-white px-[12px] text-[16px] text-[#8696a0]">
                  {c.input}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="1.8" aria-hidden="true"><path d="M14 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h4l9-9V8a5 5 0 0 0-5-5z" /><path d="M12 21v-4a5 5 0 0 1 5-5h4" /></svg>
                </span>
                <svg width="24" height="20" viewBox="0 0 26 22" fill="none" stroke={WA} strokeWidth="1.9" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h4l2-3h8l2 3h4v13H3z" /><circle cx="13" cy="12" r="4" /></svg>
                <svg width="18" height="22" viewBox="0 0 18 24" fill="none" stroke={WA} strokeWidth="1.9" strokeLinecap="round" aria-hidden="true"><rect x="5" y="2" width="8" height="13" rx="4" /><path d="M2 11a7 7 0 0 0 14 0M9 18v4" /></svg>
              </div>
            </div>
            <span aria-hidden="true" className="absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyChat({ lang }: { lang: Locale }) {
  const c = COPY[lang];
  const M = c.msgs.length;
  const section = useRef<HTMLElement>(null);
  const [x, setX] = useState(0); // how far the chat has played, in messages (0 .. M)
  const [phoneH, setPhoneH] = useState(680);

  useEffect(() => {
    const size = () => setPhoneH(Math.max(440, Math.min(window.innerHeight * (window.innerWidth < 1024 ? 0.66 : 0.82), 760)));
    size();
    window.addEventListener("resize", size);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setX(M); // eslint-disable-line react-hooks/set-state-in-effect -- reduced motion: show the whole chat at once
      return () => window.removeEventListener("resize", size);
    }
    const st = ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      end: () => `+=${M * PER_MSG * window.innerHeight}`,
      pin: true,
      onUpdate: (self) => setX(self.progress * M),
    });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      st.kill();
      window.removeEventListener("resize", size);
    };
  }, [M]);

  const shown = Math.min(M, 1 + Math.floor(x));
  // The shop "types" for a moment before each of its answers.
  const typing = shown < M && !c.msgs[shown].me && x - Math.floor(x) > 0.45;
  // Each topic's line fills while its part of the chat plays.
  const fill = c.topics.map((_, t) => {
    const ids = c.msgs.map((m, i) => (m.topic === t ? i : -1)).filter((i) => i >= 0);
    const a = ids[0];
    const b = ids[ids.length - 1] + 1;
    return Math.max(0, Math.min(1, (x + 1 - a) / (b - a)));
  });
  const topic = c.msgs[shown - 1].topic;
  const k = phoneH / PHONE_H;

  return (
    // The negative margin pulls this part up over the last screen of the special products, so it arrives
    // as a layer sliding over them; the wrapper sits above them.
    <div className="relative z-20 -mt-[100vh]">
      <section
        ref={section}
        aria-labelledby="why-chat"
        className="relative flex h-svh min-h-[600px] items-center overflow-clip rounded-t-[40px] bg-white shadow-[0_-24px_60px_-28px_rgba(2,42,9,0.35)]"
        style={{ fontFamily: OS }}
      >
        <div className="frame grid items-center justify-center gap-6 lg:grid-cols-[minmax(0,540px)_auto] lg:gap-[clamp(64px,8vw,150px)]">
          {/* The words */}
          <div className="text-center lg:text-left">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#4f7047]">{c.eyebrow}</p>
            <h2 id="why-chat" className="mx-auto mt-3 max-w-[15ch] text-[clamp(30px,min(3.6vw,7vh),56px)] font-bold leading-[1.08] tracking-[-0.02em] text-[#1c2a1e] lg:mx-0">
              {c.title}
            </h2>
            <p className="mt-4 hidden max-w-[42ch] text-[clamp(15px,1.1vw,18px)] leading-[1.6] text-[#5b6460] lg:block">{c.lead}</p>

            <ol className="mt-[clamp(20px,4vh,40px)] hidden lg:block">
              {c.topics.map((tp, i) => (
                <li key={tp.title} className="relative flex gap-5 py-[clamp(10px,1.8vh,16px)] pl-6">
                  {/* The topic's progress line: it fills while its part of the chat plays */}
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-[#e6e9e3]">
                    <span className="absolute inset-x-0 top-0 rounded-full bg-[#4f7047]" style={{ height: `${fill[i] * 100}%` }} />
                  </span>
                  <span
                    className={`flex size-[30px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold tabular-nums transition-colors duration-300 ${
                      fill[i] >= 1 ? "bg-[#4f7047] text-white" : i === topic ? "border-2 border-[#4f7047] text-[#4f7047]" : "border-2 border-[#dbdee5] text-[#9aa29c]"
                    }`}
                  >
                    {fill[i] >= 1 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className={`transition-opacity duration-300 ${i === topic || fill[i] >= 1 ? "opacity-100" : "opacity-50"}`}>
                    <span className="block text-[clamp(16px,1.25vw,20px)] font-semibold leading-tight text-[#1c2a1e]">{tp.title}</span>
                    <span className="mt-1 block text-[15px] leading-snug text-[#5b6460]">{tp.line}</span>
                  </span>
                </li>
              ))}
            </ol>

            <a
              href={WHATSAPP.href}
              className="mt-[clamp(20px,4vh,36px)] hidden h-[54px] items-center gap-3 rounded-[10px] bg-[#4f7047] px-7 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-[#3d5a37] lg:inline-flex"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/whatsapp.svg" alt="" className="size-5 brightness-0 invert" />
              {c.cta}
            </a>
          </div>

          {/* The phone, scaled from its own size to fit the screen */}
          <div className="relative mx-auto" style={{ width: PHONE_W * k, height: PHONE_H * k }}>
            <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${k})` }}>
              <Phone c={c} shown={shown} typing={typing} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
