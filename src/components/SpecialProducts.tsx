"use client";

import { WHATSAPP, type Dictionary, type Locale } from "@/app/[lang]/dictionaries";
import { Icon } from "./icons";
import { useCart } from "./Cart";

// Special products (owner, 17 Nov). The whole screen divided into four equal boxes, one product
// filling each ("take the whole viewport divided as 4 boxes and add all the products into the
// boxes"), with the lumera reference's contents: the group label, the photo, name, price, one line,
// three equal tag boxes, a dark "Order now" and a light "Add to cart". No heading row: the four boxes
// are the section (its heading is kept for screen readers). A phone stacks the boxes.
// "Order now" opens WhatsApp with the product named; "Add to cart" only marks the box until the cart
// exists. ponytail: no cart store yet - add one when checkout lands.
export default function SpecialProducts({ t }: { t: Dictionary; lang: Locale }) {
  const p = t.products;
  const { add, setQty, qtyOf } = useCart();

  return (
    <section aria-labelledby="special-products" className="wrap py-4 md:py-6 lg:h-svh lg:min-h-[600px]">
      <h2 id="special-products" className="sr-only">
        {p.title}
      </h2>
      <ul className="grid h-full gap-3 md:gap-4 lg:grid-cols-2 lg:grid-rows-2">
        {/* Tomato, Banana, Red onion, King coconut: vegetables, fruit and coconut in one view. */}
        {[0, 4, 1, 5].map((n) => p.items[n]).map((item) => {
          const id = `sp-${item.name}`;
          const isAdded = qtyOf(id) > 0;
          const order = `${WHATSAPP.href}?text=${encodeURIComponent(`${p.order}: ${item.name} (${item.tags[0]})`)}`;
          return (
            <li
              key={item.name}
              className="flex min-h-0 flex-col gap-5 rounded-[24px] bg-panel p-5 sm:flex-row sm:items-center md:gap-8 md:p-7 lg:p-[clamp(18px,3svh,36px)]"
            >
              {/* The photo takes the box's full height (and stays square), so the box is filled. */}
              <div className="group aspect-square w-full shrink-0 overflow-hidden rounded-[18px] bg-ground sm:w-[42%] lg:h-full lg:w-auto lg:max-w-[48%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-ui group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-leaf">{item.group}</h3>
                <p className="mt-2 text-[clamp(20px,1.9vw,28px)] font-medium leading-tight">{item.name}</p>
                <p className="mt-1 text-[clamp(18px,1.5vw,22px)] font-medium">
                  {p.unit} {item.price}
                </p>
                <p className="mt-2 line-clamp-2 text-[14px] leading-snug text-muted lg:[@media(max-height:700px)]:hidden">
                  {item.line}
                </p>
                {/* Three equal boxes in a row, text centred, as the reference (owner, 17 Nov). */}
                <ul className="mt-4 grid max-w-[420px] grid-cols-[1fr_1fr_1.3fr] gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex h-[34px] items-center justify-center whitespace-nowrap rounded-[7px] border border-[rgb(20_23_20/0.18)] bg-ground px-1.5 text-center text-[12px]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={order}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-forest px-5 text-[13px] font-medium text-white transition-transform duration-150 ease-ui hover:-translate-y-px active:translate-y-0"
                  >
                    {p.shop}
                    <Icon name="arrowUpRight" className="size-3.5" />
                  </a>
                  <button
                    type="button"
                    aria-pressed={isAdded}
                    onClick={() => (isAdded ? setQty(id, 0) : add({ id, name: item.name, price: item.price, unit: item.tags[0] }))}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-ground px-5 text-[13px] font-medium transition-[translate,background-color] duration-150 ease-ui hover:-translate-y-px active:translate-y-0 aria-pressed:bg-[#e3efe5] aria-pressed:text-forest"
                  >
                    {isAdded ? p.added : p.add}
                    <Icon name={isAdded ? "check" : "arrowUpRight"} className="size-3.5" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
