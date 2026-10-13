import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cafe } from "../data/info.js";

/*
  SETUP (once): wrap your app with the provider, e.g. in main.jsx or App.jsx

    import { OrderProvider } from "./components/OrderNow";
    <OrderProvider> ...your routes / layout... </OrderProvider>

  OPEN THE ORDER DRAWER FROM ANYWHERE (navbar, hero, footer, menu cards):

    import { useOrder } from "./components/OrderNow";
    const { openOrder, count } = useOrder();
    <button onClick={() => openOrder()}>ORDER NOW</button>
    <button onClick={() => openOrder({ category: "Snacks" })}>Order snacks</button>

  READY-MADE BUTTONS (default export):
    <OrderNow />                      -> inline "Order Now" button
    <OrderNow variant="floating" />   -> floating button fixed at the bottom-right
    <OrderNow label="Order Online" /> -> custom button label

  Flow: Menu -> Details -> Review -> opens WhatsApp with the full order pre-written.
*/

// Replace with your real WhatsApp number: country code + number, no "+", no spaces.
// If your `cafe` object has a `whatsapp` field, that one is used instead.
const WHATSAPP_NUMBER = "919876543210";
const WA_NUMBER = String(cafe?.whatsapp || WHATSAPP_NUMBER).replace(/\D/g, "");
const CAFE_NAME = cafe?.name || "Our Cafe";

const CURRENCY = "\u20B9";
const DELIVERY_FEE = 0; // set e.g. 30 to add a delivery charge for delivery orders
const MAX_QTY = 20;
const MIN_GUESTS = 1;
const MAX_GUESTS = 12;

// Replace with your real menu. `id` must be unique.
const MENU = [
  { id: "chai", cat: "Hot Drinks", name: "Masala Chai", price: 30, note: "ginger & cardamom" },
  { id: "filter-coffee", cat: "Hot Drinks", name: "Filter Coffee", price: 60, note: "slow-brewed, strong" },
  { id: "hot-choc", cat: "Hot Drinks", name: "Hot Chocolate", price: 120, note: "thick and creamy" },
  { id: "cold-coffee", cat: "Cold Drinks", name: "Cold Coffee", price: 110, note: "with a scoop of ice cream" },
  { id: "iced-tea", cat: "Cold Drinks", name: "Lemon Iced Tea", price: 90, note: "fresh mint" },
  { id: "mango-shake", cat: "Cold Drinks", name: "Mango Shake", price: 120, note: "seasonal mangoes" },
  { id: "sandwich", cat: "Snacks", name: "Veg Grilled Sandwich", price: 90, note: "green chutney" },
  { id: "wrap", cat: "Snacks", name: "Paneer Tikka Wrap", price: 160, note: "smoky & stuffed" },
  { id: "fries", cat: "Snacks", name: "French Fries", price: 100, note: "peri-peri dusted" },
  { id: "brownie", cat: "Snacks", name: "Chocolate Brownie", price: 130, note: "warm, with fudge" },
];

const CATEGORIES = [...new Set(MENU.map((i) => i.cat))];

const ORDER_TYPES = [
  { id: "dine", label: "Dine-in" },
  { id: "pickup", label: "Takeaway" },
  { id: "delivery", label: "Delivery" },
];

const WHEN_OPTIONS = [
  { id: "asap", label: "ASAP" },
  { id: "30", label: "In 30 min" },
  { id: "60", label: "In 1 hour" },
  { id: "custom", label: "Pick a time" },
];

const STEPS = ["Menu", "Details", "Review"];

/* ---------- helpers ---------- */

const money = (n) => `${CURRENCY}${n.toLocaleString("en-IN")}`;

function fmtTime(value) {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function makeOrderId() {
  const time = Date.now().toString(36).slice(-4);
  const rand = Math.random().toString(36).slice(2, 4);
  return `OD-${(time + rand).toUpperCase()}`;
}

function whenText(whenId, customTime) {
  if (whenId === "30") return "In about 30 minutes";
  if (whenId === "60") return "In about 1 hour";
  if (whenId === "custom") return `Today at ${fmtTime(customTime)}`;
  return "As soon as possible";
}

function buildMessage({ orderId, type, name, guests, address, when, note, lines, fee, total }) {
  const typeLabel = ORDER_TYPES.find((t) => t.id === type).label;
  const out = [];

  out.push(`*New order ${orderId}*`);
  out.push("");
  out.push(`*Name:* ${name.trim()}`);
  out.push(`*Order type:* ${typeLabel}`);
  if (type === "dine") out.push(`*Guests:* ${guests}`);
  out.push(`*When:* ${when}`);
  if (type === "delivery") out.push(`*Address:* ${address.trim()}`);
  out.push("");
  out.push("*Items*");
  lines.forEach((l, i) => out.push(`${i + 1}. ${l.name} x ${l.qty} = ${money(l.amount)}`));
  out.push("");
  if (fee > 0) out.push(`Delivery fee: ${money(fee)}`);
  out.push(`*Total: ${money(total)}*`);
  if (note.trim()) {
    out.push("");
    out.push(`*Note:* ${note.trim()}`);
  }
  out.push("");
  out.push("Please confirm my order. Thank you!");

  return out.join("\n");
}

/* ---------- styles ---------- */

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&display=swap");

.od-trigger,
.od-root {
  --od-bg: #e2602d;
  --od-deep: #b3411a;
  --od-ink: #24160f;
  --od-paper: #fff8ea;
  --od-cream: #fbe3c2;
  --od-pen: #2f3f9e;
  --od-green: #25d366;
  --od-red: #b3261e;
  font-family: "Bricolage Grotesque", sans-serif;
}

/* ---------- trigger button ---------- */
.od-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 28px 8px 8px;
  border: 0;
  border-radius: 999px;
  background: var(--od-ink);
  color: var(--od-paper);
  font-weight: 700;
  font-size: 19px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 6px 0 var(--od-deep);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.od-trigger:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--od-deep); }
.od-trigger:focus-visible,
.od-root button:focus-visible,
.od-root a:focus-visible,
.od-root input:focus-visible,
.od-root textarea:focus-visible {
  outline: 3px solid var(--od-pen);
  outline-offset: 3px;
}
@media (hover: hover) {
  .od-trigger:hover { transform: translateY(-2px); box-shadow: 0 8px 0 var(--od-deep); }
  .od-trigger:hover .od-trigger-icon svg { transform: rotate(-12deg) scale(1.1); }
}
.od-trigger-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--od-bg);
}
.od-trigger-icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: var(--od-paper);
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.od-floating {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 900;
  box-shadow: 0 6px 0 var(--od-deep), 0 16px 32px rgba(0, 0, 0, 0.28);
}
.od-badge {
  position: absolute;
  top: -9px;
  right: -5px;
  display: grid;
  place-items: center;
  min-width: 28px;
  height: 28px;
  padding: 0 7px;
  border: 2px solid var(--od-ink);
  border-radius: 999px;
  background: var(--od-paper);
  color: var(--od-ink);
  font-size: 14px;
  font-weight: 800;
  animation: od-bump 0.4s cubic-bezier(0.3, 1.8, 0.5, 1);
}

/* ---------- drawer ---------- */
.od-root {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}
.od-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(36, 22, 15, 0.62);
  animation: od-fade 0.3s ease;
}
.od-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(540px, 100%);
  height: 100%;
  background: var(--od-paper);
  color: var(--od-ink);
  border-left: 3px solid var(--od-ink);
  box-shadow: -14px 0 0 rgba(36, 22, 15, 0.22);
  animation: od-slide 0.45s cubic-bezier(0.2, 0.85, 0.3, 1);
}
@keyframes od-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes od-slide { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes od-rise {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes od-bump {
  from { transform: scale(0.6) rotate(-8deg); opacity: 0.4; }
  to { transform: scale(1) rotate(0); opacity: 1; }
}

/* header */
.od-top {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 24px 24px;
  background: var(--od-bg);
  border-bottom: 3px solid var(--od-ink);
}
.od-top::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.14;
  mix-blend-mode: multiply;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}
.od-top > * { position: relative; }
.od-kicker {
  display: block;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 28px;
  line-height: 1;
  color: var(--od-paper);
  transform: rotate(-2deg);
  transform-origin: left center;
}
.od-heading {
  margin: 4px 0 0;
  font-weight: 800;
  font-size: 34px;
  line-height: 1;
  letter-spacing: -1px;
}
.od-close {
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 2px solid var(--od-ink);
  border-radius: 50%;
  background: var(--od-cream);
  color: var(--od-ink);
  cursor: pointer;
  box-shadow: 0 3px 0 var(--od-ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.od-close:active { transform: translateY(3px); box-shadow: 0 0 0 var(--od-ink); }
.od-close svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }

/* stepper */
.od-steps {
  display: flex;
  margin: 0;
  padding: 18px 24px 8px;
  list-style: none;
}
.od-step {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(36, 22, 15, 0.45);
}
.od-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 15px;
  left: calc(50% + 22px);
  right: calc(-50% + 22px);
  border-top: 2px dashed rgba(36, 22, 15, 0.35);
}
.od-dot {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 2px solid var(--od-ink);
  border-radius: 50%;
  background: var(--od-paper);
  color: var(--od-ink);
  font-size: 14px;
  letter-spacing: 0;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.od-dot svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.od-step.is-on { color: var(--od-ink); }
.od-step.is-on .od-dot { background: var(--od-ink); color: var(--od-paper); transform: scale(1.12) rotate(-6deg); }
.od-step.is-done { color: var(--od-ink); }
.od-step.is-done .od-dot { background: var(--od-cream); }

/* body */
.od-body {
  flex: 1;
  overflow-y: auto;
  padding: 6px 24px 28px;
  overscroll-behavior: contain;
}
.od-view { animation: od-rise 0.4s cubic-bezier(0.2, 0.8, 0.3, 1); }

.od-label {
  display: block;
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(36, 22, 15, 0.55);
}

/* chips */
.od-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.od-chip {
  padding: 10px 16px;
  border: 2px solid var(--od-ink);
  border-radius: 999px;
  background: transparent;
  color: var(--od-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.od-chip.on { background: var(--od-ink); color: var(--od-paper); transform: rotate(-2.5deg) scale(1.04); }
@media (hover: hover) {
  .od-chip:not(.on):hover { background: var(--od-cream); transform: rotate(1.5deg); }
}

/* menu list */
.od-cats {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  gap: 10px;
  margin: 0 -24px;
  padding: 12px 24px;
  overflow-x: auto;
  background: var(--od-paper);
  scrollbar-width: none;
}
.od-cats::-webkit-scrollbar { display: none; }
.od-list { margin: 0; padding: 0; list-style: none; }
.od-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 2px dashed rgba(36, 22, 15, 0.2);
}
.od-text { flex: 1; min-width: 0; }
.od-line { display: flex; align-items: baseline; gap: 8px; }
.od-name { font-weight: 800; font-size: 18px; line-height: 1.2; }
.od-leader {
  flex: 1;
  min-width: 14px;
  border-bottom: 2px dotted rgba(36, 22, 15, 0.35);
  transform: translateY(-4px);
}
.od-price { font-weight: 800; font-size: 17px; color: var(--od-deep); }
.od-dish-note {
  display: block;
  margin-top: 2px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 21px;
  line-height: 1.1;
  color: var(--od-pen);
}
.od-qty { flex: none; display: flex; justify-content: flex-end; width: 116px; }
.od-add {
  padding: 10px 20px;
  border: 2px solid var(--od-ink);
  border-radius: 999px;
  background: var(--od-cream);
  color: var(--od-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 3px 0 var(--od-ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.od-add:active { transform: translateY(3px); box-shadow: 0 0 0 var(--od-ink); }
.od-stepper { display: flex; align-items: center; gap: 8px; }
.od-qbtn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 2px solid var(--od-ink);
  border-radius: 50%;
  background: var(--od-cream);
  color: var(--od-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 3px 0 var(--od-ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s ease;
}
.od-qbtn:active:not(:disabled) { transform: translateY(3px); box-shadow: 0 0 0 var(--od-ink); }
.od-qbtn:disabled { opacity: 0.3; cursor: not-allowed; }
.od-qn {
  display: inline-block;
  min-width: 26px;
  text-align: center;
  font-weight: 800;
  font-size: 22px;
  animation: od-bump 0.35s cubic-bezier(0.3, 1.8, 0.5, 1);
}

/* details form */
.od-field { margin-top: 24px; }
.od-field:first-child { margin-top: 14px; }
.od-input {
  display: block;
  width: 100%;
  padding: 13px 14px;
  border: 2px solid var(--od-ink);
  border-radius: 12px;
  background: #fff;
  color: var(--od-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 1.4;
  resize: vertical;
}
.od-input::placeholder { color: rgba(36, 22, 15, 0.4); }
.od-input.invalid { border-color: var(--od-red); }
.od-err { margin: 8px 0 0; font-size: 14px; font-weight: 700; color: var(--od-red); }
.od-guests { display: flex; align-items: center; gap: 12px; }
.od-guests .od-qn { font-size: 34px; min-width: 40px; }
.od-guests-unit { font-family: "Caveat", cursive; font-weight: 700; font-size: 28px; color: var(--od-bg); }

/* receipt */
.od-receipt {
  position: relative;
  margin: 18px 6px 22px;
  padding: 26px 22px 34px;
  background: #fff;
  transform: rotate(-0.6deg);
  filter:
    drop-shadow(2px 0 0 var(--od-ink))
    drop-shadow(-2px 0 0 var(--od-ink))
    drop-shadow(0 -2px 0 var(--od-ink))
    drop-shadow(0 2px 0 var(--od-ink))
    drop-shadow(6px 7px 0 var(--od-ink));
}
.od-receipt::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -12px;
  height: 12px;
  background:
    linear-gradient(135deg, #fff 50%, transparent 50%) 0 0 / 16px 12px,
    linear-gradient(225deg, #fff 50%, transparent 50%) 0 0 / 16px 12px;
}
.od-r-head { text-align: center; padding-bottom: 14px; border-bottom: 2px dashed var(--od-ink); }
.od-r-shop { margin: 0; font-weight: 800; font-size: 20px; letter-spacing: 0.18em; text-transform: uppercase; }
.od-r-id { margin: 6px 0 0; font-family: "Caveat", cursive; font-weight: 700; font-size: 24px; line-height: 1; color: var(--od-pen); }
.od-r-meta { margin: 14px 0; padding: 0 0 14px; border-bottom: 2px dashed var(--od-ink); }
.od-r-meta div { display: flex; gap: 12px; padding: 4px 0; }
.od-r-meta dt { flex: none; width: 82px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(36, 22, 15, 0.55); line-height: 1.7; }
.od-r-meta dd { margin: 0; font-weight: 700; font-size: 16px; line-height: 1.4; word-break: break-word; }
.od-r-items { margin: 0; padding: 0 0 14px; list-style: none; border-bottom: 2px dashed var(--od-ink); }
.od-r-items li { display: flex; gap: 10px; padding: 5px 0; font-weight: 600; font-size: 16px; }
.od-r-qty { flex: none; min-width: 30px; font-weight: 800; color: var(--od-deep); }
.od-r-item { flex: 1; }
.od-r-amt { flex: none; font-weight: 800; }
.od-r-fee, .od-r-total { display: flex; justify-content: space-between; margin: 12px 0 0; }
.od-r-fee { font-weight: 600; font-size: 15px; }
.od-r-total { font-weight: 800; font-size: 26px; letter-spacing: -0.5px; }
.od-r-note { margin: 14px 0 0; font-family: "Caveat", cursive; font-weight: 700; font-size: 23px; line-height: 1.15; color: var(--od-pen); }

.od-edit { display: flex; flex-wrap: wrap; gap: 10px; }
.od-link {
  padding: 9px 16px;
  border: 2px solid var(--od-ink);
  border-radius: 999px;
  background: transparent;
  color: var(--od-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}
@media (hover: hover) { .od-link:hover { background: var(--od-cream); } }
.od-fine { margin: 16px 0 0; font-size: 14px; font-weight: 500; line-height: 1.5; color: rgba(36, 22, 15, 0.62); }

/* footer */
.od-foot {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 24px max(18px, env(safe-area-inset-bottom));
  border-top: 3px solid var(--od-ink);
  background: var(--od-cream);
}
.od-sum { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.od-sum-label { font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(36, 22, 15, 0.6); }
.od-sum strong { font-weight: 800; font-size: 28px; line-height: 1; letter-spacing: -1px; }
.od-actions { display: flex; align-items: center; gap: 10px; }
.od-ghost {
  padding: 14px 18px;
  border: 2px solid var(--od-ink);
  border-radius: 999px;
  background: transparent;
  color: var(--od-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}
@media (hover: hover) { .od-ghost:hover { background: var(--od-paper); } }
.od-next {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--od-ink);
  color: var(--od-paper);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 17px;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: 0 5px 0 var(--od-deep);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}
.od-next:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 1px 0 var(--od-deep); }
.od-next:disabled { opacity: 0.4; cursor: not-allowed; }
.od-next svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1); }
@media (hover: hover) {
  .od-next:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 7px 0 var(--od-deep); }
  .od-next:hover:not(:disabled) svg { transform: translateX(5px); }
}
.od-next.wa { padding-left: 8px; }
.od-wa-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--od-green);
}
.od-wa-icon::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid var(--od-green);
  border-radius: 50%;
  animation: od-ping 2.4s ease-out infinite;
}
.od-next.wa .od-wa-icon svg { stroke: #fff; width: 22px; height: 22px; }
.od-next.wa:hover .od-wa-icon svg { transform: none; }
.od-wa-dot { fill: #fff; stroke: none; }
@keyframes od-ping {
  0% { transform: scale(1); opacity: 0.8; }
  80%, 100% { transform: scale(1.7); opacity: 0; }
}

/* done screen */
.od-done { padding: 34px 0 10px; text-align: center; }
.od-stamp {
  display: grid;
  place-items: center;
  width: 132px;
  height: 132px;
  margin: 0 auto 26px;
  border: 4px solid var(--od-deep);
  border-radius: 50%;
  outline: 2px solid var(--od-deep);
  outline-offset: -11px;
  color: var(--od-deep);
  font-weight: 800;
  font-size: 18px;
  line-height: 1.05;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  mix-blend-mode: multiply;
  transform: rotate(-12deg);
  animation: od-stamp 0.55s cubic-bezier(0.3, 1.2, 0.5, 1) backwards;
}
@keyframes od-stamp {
  0% { opacity: 0; transform: rotate(-30deg) scale(2.2); }
  65% { opacity: 1; transform: rotate(-10deg) scale(0.92); }
  100% { opacity: 1; transform: rotate(-12deg) scale(1); }
}
.od-done h3 { margin: 0 0 10px; font-weight: 800; font-size: 30px; line-height: 1.05; letter-spacing: -1px; }
.od-done p { max-width: 340px; margin: 0 auto 8px; font-size: 17px; font-weight: 500; line-height: 1.55; color: rgba(36, 22, 15, 0.8); }
.od-done .od-edit { justify-content: center; margin-top: 22px; }
.od-done-id { margin-top: 18px; font-family: "Caveat", cursive; font-weight: 700; font-size: 26px; color: var(--od-pen); }

/* ---------- responsive ---------- */
@media (max-width: 560px) {
  .od-panel { width: 100%; border-left: 0; box-shadow: none; }
  .od-top { padding: 18px 18px 20px; }
  .od-heading { font-size: 28px; }
  .od-steps { padding: 14px 18px 6px; }
  .od-body { padding: 4px 18px 24px; }
  .od-cats { margin: 0 -18px; padding: 10px 18px; }
  .od-foot { gap: 10px; padding: 12px 16px max(16px, env(safe-area-inset-bottom)); }
  .od-sum strong { font-size: 24px; }
  .od-ghost { padding: 13px 14px; font-size: 15px; }
  .od-next { padding: 13px 18px; font-size: 16px; }
  .od-qty { width: 108px; }
  .od-name { font-size: 17px; }
  .od-floating { right: 14px; bottom: 14px; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .od-trigger, .od-trigger *, .od-root, .od-root *, .od-root *::before, .od-root *::after {
    animation: none !important;
    transition: none !important;
  }
}
`;

/* ---------- icons ---------- */

function Icon({ name }) {
  switch (name) {
    case "bag":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 8h14l-1 12H6L5 8z" />
          <path d="M9 8V7a3 3 0 0 1 6 0v1" />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      );
    case "wa":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
          <circle className="od-wa-dot" cx="8.5" cy="12" r="1.1" />
          <circle className="od-wa-dot" cx="12" cy="12" r="1.1" />
          <circle className="od-wa-dot" cx="15.5" cy="12" r="1.1" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- component ---------- */

const OrderContext = createContext(null);

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder() must be used inside <OrderProvider>. Wrap your app with it once.");
  }
  return ctx;
}

export function OrderProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [tried, setTried] = useState(false);

  const [cat, setCat] = useState(CATEGORIES[0]);
  const [cart, setCart] = useState({});

  const [type, setType] = useState("dine");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(2);
  const [address, setAddress] = useState("");
  const [whenId, setWhenId] = useState("asap");
  const [customTime, setCustomTime] = useState("");
  const [note, setNote] = useState("");
  const [orderId, setOrderId] = useState(makeOrderId);

  const lastFocusRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Optional argument: { category: "Snacks" } opens the menu on that category
  const openDrawer = useCallback((opts) => {
    lastFocusRef.current = document.activeElement;
    if (opts && typeof opts.category === "string" && CATEGORIES.includes(opts.category)) {
      setCat(opts.category);
    }
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    const el = lastFocusRef.current;
    if (el && typeof el.focus === "function") el.focus();
  }, []);

  // Lock page scroll and move focus into the drawer while it is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  // Scroll the drawer back to the top whenever the step changes
  useEffect(() => {
    bodyRef.current?.scrollTo?.({ top: 0 });
  }, [step, sent]);

  const onPanelKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeDrawer();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll(
      'button:not(:disabled), a[href], input, textarea, select'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  /* ----- cart ----- */
  const setQty = (id, delta) =>
    setCart((prev) => {
      const next = { ...prev };
      const q = Math.max(0, Math.min(MAX_QTY, (prev[id] || 0) + delta));
      if (q === 0) delete next[id];
      else next[id] = q;
      return next;
    });

  const lines = useMemo(
    () =>
      MENU.filter((i) => cart[i.id]).map((i) => ({
        ...i,
        qty: cart[i.id],
        amount: i.price * cart[i.id],
      })),
    [cart]
  );
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.amount, 0);
  const fee = type === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + fee;

  /* ----- validation ----- */
  const errors = useMemo(() => {
    const e = {};
    if (name.trim().length < 2) e.name = "Please tell us your name.";
    if (type === "delivery" && address.trim().length < 8) e.address = "Please add your full delivery address.";
    if (whenId === "custom" && !customTime) e.time = "Please choose a time.";
    return e;
  }, [name, type, address, whenId, customTime]);
  const showErr = tried && Object.keys(errors).length > 0;

  /* ----- navigation ----- */
  const goNext = () => {
    if (step === 1) {
      if (count > 0) setStep(2);
      return;
    }
    if (step === 2) {
      setTried(true);
      if (Object.keys(errors).length === 0) setStep(3);
    }
  };
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const resetOrder = () => {
    setCart({});
    setNote("");
    setAddress("");
    setWhenId("asap");
    setCustomTime("");
    setTried(false);
    setSent(false);
    setStep(1);
    setOrderId(makeOrderId());
  };

  /* ----- WhatsApp link ----- */
  const when = whenText(whenId, customTime);
  const waLink = useMemo(() => {
    if (step !== 3 && !sent) return "#";
    const message = buildMessage({ orderId, type, name, guests, address, when, note, lines, fee, total });
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [step, sent, orderId, type, name, guests, address, when, note, lines, fee, total]);

  const typeLabel = ORDER_TYPES.find((t) => t.id === type).label;

  /* ---------- step views ---------- */

  const menuView = (
    <div className="od-view" key="menu">
      <div className="od-cats">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`od-chip${c === cat ? " on" : ""}`}
            aria-pressed={c === cat}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="od-list">
        {MENU.filter((i) => i.cat === cat).map((item) => {
          const q = cart[item.id] || 0;
          return (
            <li className="od-row" key={item.id}>
              <div className="od-text">
                <div className="od-line">
                  <span className="od-name">{item.name}</span>
                  <span className="od-leader" aria-hidden="true" />
                  <span className="od-price">{money(item.price)}</span>
                </div>
                {item.note && <span className="od-dish-note">{item.note}</span>}
              </div>

              <div className="od-qty">
                {q === 0 ? (
                  <button
                    type="button"
                    className="od-add"
                    onClick={() => setQty(item.id, 1)}
                    aria-label={`Add ${item.name}`}
                  >
                    Add
                  </button>
                ) : (
                  <div className="od-stepper" role="group" aria-label={item.name}>
                    <button
                      type="button"
                      className="od-qbtn"
                      onClick={() => setQty(item.id, -1)}
                      aria-label={`Remove one ${item.name}`}
                    >
                      &minus;
                    </button>
                    <span className="od-qn" key={q} aria-live="polite">
                      {q}
                    </span>
                    <button
                      type="button"
                      className="od-qbtn"
                      onClick={() => setQty(item.id, 1)}
                      disabled={q >= MAX_QTY}
                      aria-label={`Add one more ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const detailsView = (
    <div className="od-view" key="details">
      <div className="od-field">
        <span className="od-label" id="od-type-label">Order type</span>
        <div className="od-chips" role="group" aria-labelledby="od-type-label">
          {ORDER_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`od-chip${t.id === type ? " on" : ""}`}
              aria-pressed={t.id === type}
              onClick={() => setType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="od-field">
        <label className="od-label" htmlFor="od-name">Your name</label>
        <input
          id="od-name"
          className={`od-input${showErr && errors.name ? " invalid" : ""}`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rahul"
          autoComplete="name"
          aria-invalid={showErr && !!errors.name}
        />
        {showErr && errors.name && <p className="od-err">{errors.name}</p>}
      </div>

      {type === "dine" && (
        <div className="od-field">
          <span className="od-label" id="od-guests-label">How many guests?</span>
          <div className="od-guests" role="group" aria-labelledby="od-guests-label">
            <button
              type="button"
              className="od-qbtn"
              onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
              disabled={guests <= MIN_GUESTS}
              aria-label="One less guest"
            >
              &minus;
            </button>
            <span className="od-qn" key={guests} aria-live="polite">{guests}</span>
            <button
              type="button"
              className="od-qbtn"
              onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
              disabled={guests >= MAX_GUESTS}
              aria-label="One more guest"
            >
              +
            </button>
            <span className="od-guests-unit">{guests === 1 ? "guest" : "guests"}</span>
          </div>
        </div>
      )}

      {type === "delivery" && (
        <div className="od-field">
          <label className="od-label" htmlFor="od-address">Delivery address</label>
          <textarea
            id="od-address"
            className={`od-input${showErr && errors.address ? " invalid" : ""}`}
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House no., street, landmark, area"
            autoComplete="street-address"
            aria-invalid={showErr && !!errors.address}
          />
          {showErr && errors.address && <p className="od-err">{errors.address}</p>}
        </div>
      )}

      <div className="od-field">
        <span className="od-label" id="od-when-label">When?</span>
        <div className="od-chips" role="group" aria-labelledby="od-when-label">
          {WHEN_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`od-chip${o.id === whenId ? " on" : ""}`}
              aria-pressed={o.id === whenId}
              onClick={() => setWhenId(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
        {whenId === "custom" && (
          <div style={{ marginTop: 12 }}>
            <input
              className={`od-input${showErr && errors.time ? " invalid" : ""}`}
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              aria-label="Preferred time"
              aria-invalid={showErr && !!errors.time}
            />
            {showErr && errors.time && <p className="od-err">{errors.time}</p>}
          </div>
        )}
      </div>

      <div className="od-field">
        <label className="od-label" htmlFor="od-note">Anything else? (optional)</label>
        <textarea
          id="od-note"
          className="od-input"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Less sugar, no onions, extra spicy..."
        />
      </div>
    </div>
  );

  const reviewView = (
    <div className="od-view" key="review">
      <div className="od-receipt">
        <div className="od-r-head">
          <p className="od-r-shop">{CAFE_NAME}</p>
          <p className="od-r-id">order {orderId}</p>
        </div>

        <dl className="od-r-meta">
          <div><dt>Name</dt><dd>{name.trim()}</dd></div>
          <div><dt>Type</dt><dd>{typeLabel}{type === "dine" ? ` \u00B7 ${guests} ${guests === 1 ? "guest" : "guests"}` : ""}</dd></div>
          <div><dt>When</dt><dd>{when}</dd></div>
          {type === "delivery" && <div><dt>Address</dt><dd>{address.trim()}</dd></div>}
        </dl>

        <ul className="od-r-items">
          {lines.map((l) => (
            <li key={l.id}>
              <span className="od-r-qty">{l.qty}&times;</span>
              <span className="od-r-item">{l.name}</span>
              <span className="od-r-amt">{money(l.amount)}</span>
            </li>
          ))}
        </ul>

        {fee > 0 && (
          <p className="od-r-fee"><span>Delivery fee</span><span>{money(fee)}</span></p>
        )}
        <p className="od-r-total"><span>Total</span><span>{money(total)}</span></p>
        {note.trim() && <p className="od-r-note">&ldquo;{note.trim()}&rdquo;</p>}
      </div>

      <div className="od-edit">
        <button type="button" className="od-link" onClick={() => setStep(1)}>Edit items</button>
        <button type="button" className="od-link" onClick={() => setStep(2)}>Edit details</button>
      </div>

      <p className="od-fine">
        Tapping the button opens WhatsApp with this order already written. Just hit send there to place it.
      </p>
    </div>
  );

  const doneView = (
    <div className="od-view od-done" key="done">
      <div className="od-stamp" aria-hidden="true">
        Order
        <br />
        ready!
      </div>
      <h3>One last tap in WhatsApp</h3>
      <p>
        WhatsApp should have opened with your order. Press <strong>send</strong> there and we will confirm it with you.
      </p>
      <p>WhatsApp did not open? Use the button below.</p>
      <p className="od-done-id">order {orderId}</p>
      <div className="od-edit">
        <a className="od-link" href={waLink} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
        <button type="button" className="od-link" onClick={resetOrder}>Start a new order</button>
      </div>
    </div>
  );

  /* ---------- render ---------- */

  const drawer = (
    <div className="od-root">
      <div className="od-backdrop" onClick={closeDrawer} aria-hidden="true" />

      <aside
        ref={panelRef}
        className="od-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="od-heading"
        onKeyDown={onPanelKeyDown}
      >
        <header className="od-top">
          <div>
            <span className="od-kicker">kitchen's open!</span>
            <h2 id="od-heading" className="od-heading">Place your order</h2>
          </div>
          <button ref={closeRef} type="button" className="od-close" onClick={closeDrawer} aria-label="Close order panel">
            <Icon name="close" />
          </button>
        </header>

        {!sent && (
          <ol className="od-steps" aria-label="Order progress">
            {STEPS.map((s, i) => {
              const n = i + 1;
              const state = n === step ? "is-on" : n < step ? "is-done" : "";
              return (
                <li key={s} className={`od-step ${state}`} aria-current={n === step ? "step" : undefined}>
                  <span className="od-dot">{n < step ? <Icon name="check" /> : n}</span>
                  {s}
                </li>
              );
            })}
          </ol>
        )}

        <div className="od-body" ref={bodyRef}>
          {sent ? doneView : step === 1 ? menuView : step === 2 ? detailsView : reviewView}
        </div>

        {!sent && (
          <footer className="od-foot">
            <div className="od-sum">
              <span className="od-sum-label">
                {count === 0 ? "Bag is empty" : `${count} ${count === 1 ? "item" : "items"}`}
              </span>
              <strong>{money(total)}</strong>
            </div>

            <div className="od-actions">
              {step > 1 && (
                <button type="button" className="od-ghost" onClick={goBack}>Back</button>
              )}

              {step < 3 ? (
                <button type="button" className="od-next" onClick={goNext} disabled={step === 1 && count === 0}>
                  {step === 1 ? "Continue" : "Review"}
                  <Icon name="arrow" />
                </button>
              ) : (
                <a
                  className="od-next wa"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSent(true)}
                >
                  <span className="od-wa-icon" aria-hidden="true"><Icon name="wa" /></span>
                  Send on WhatsApp
                </a>
              )}
            </div>
          </footer>
        )}
      </aside>
    </div>
  );

  const ctx = useMemo(
    () => ({ openOrder: openDrawer, closeOrder: closeDrawer, isOpen: open, count }),
    [openDrawer, closeDrawer, open, count]
  );

  return (
    <OrderContext.Provider value={ctx}>
      <style>{css}</style>
      {children}
      {mounted && open && createPortal(drawer, document.body)}
    </OrderContext.Provider>
  );
}

/* ---------- ready-made trigger button ---------- */

export default function OrderNow({ variant = "inline", label = "Order Now" }) {
  const { openOrder, count } = useOrder();

  return (
    <button
      type="button"
      className={`od-trigger${variant === "floating" ? " od-floating" : ""}`}
      onClick={() => openOrder()}
      aria-haspopup="dialog"
    >
      <span className="od-trigger-icon" aria-hidden="true"><Icon name="bag" /></span>
      <span>{label}</span>
      {count > 0 && (
        <span className="od-badge" key={count} aria-label={`${count} items in your order`}>
          {count}
        </span>
      )}
    </button>
  );
}