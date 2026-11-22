"use client";

import { useSyncExternalStore } from "react";
import { productById } from "./catalog";

// The basket, in the browser only (the product list and the order message are in ./catalog, which the
// pages built ahead of time also read).
export * from "./catalog";

// The basket: { productId: quantity }, kept in localStorage and shared by every page and tab.
type Lines = Record<string, number>;
const KEY = "pasumai-basket-v1";
const EMPTY: Lines = {};
let lines: Lines = EMPTY;
let loaded = false;
const subs = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Lines;
    lines = Object.fromEntries(Object.entries(saved).filter(([id, q]) => productById(id) && q > 0));
  } catch {
    lines = EMPTY;
  }
}

function save(next: Lines) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private windows may refuse storage; the basket still works for this visit.
  }
  subs.forEach((f) => f());
}

export function setQty(id: string, qty: number) {
  load();
  const next = { ...lines };
  if (qty <= 0) delete next[id];
  else next[id] = Math.min(50, Math.round(qty));
  save(next);
}

export function addToBasket(id: string, qty = 1) {
  load();
  setQty(id, (lines[id] ?? 0) + qty);
  // Tell the page, so the "added" pop-up can show (AddedToast).
  window.dispatchEvent(new CustomEvent(ADDED, { detail: { id, qty } }));
}
export const ADDED = "pasumai:added";

export const clearBasket = () => save({});

function subscribe(f: () => void) {
  subs.add(f);
  const other = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    load();
    f();
  };
  window.addEventListener("storage", other);
  return () => {
    subs.delete(f);
    window.removeEventListener("storage", other);
  };
}

export function useBasket() {
  const l = useSyncExternalStore(
    subscribe,
    () => {
      load();
      return lines;
    },
    () => EMPTY,
  );
  const items = Object.entries(l)
    .map(([id, qty]) => ({ product: productById(id)!, qty }))
    .filter((x) => x.product);
  return {
    lines: l,
    items,
    count: items.reduce((n, x) => n + x.qty, 0),
    total: items.reduce((n, x) => n + x.qty * x.product.price, 0),
  };
}

