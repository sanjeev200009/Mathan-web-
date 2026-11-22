"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/app/[lang]/dictionaries";

const OPTIONS: { lang: Locale; label: string }[] = [
  { lang: "ta", label: "தமிழ்" },
  { lang: "en", label: "EN" },
];

// Two plain words; the one you are reading is dark. Keeps you on the same page.
export default function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const rest = usePathname().replace(/^\/(ta|en)(?=\/|$)/, "");
  return (
    <nav aria-label={label} className="flex items-center">
      {OPTIONS.map((o, i) => (
        <span key={o.lang} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="h-3.5 w-px bg-line" />}
          <Link
            href={`/${o.lang}${rest}`}
            hrefLang={o.lang}
            lang={o.lang}
            aria-current={o.lang === lang ? "true" : undefined}
            className="flex min-h-11 min-w-11 items-center justify-center px-2 text-[14px] text-muted transition-colors duration-150 hover:text-ink aria-[current=true]:font-medium aria-[current=true]:text-ink"
          >
            {o.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
