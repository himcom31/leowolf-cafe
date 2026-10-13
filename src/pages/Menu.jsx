import { useState } from "react";
import { menu, categories } from "../data/menu.js";

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&display=swap");

.mn {
  --mn-bg: #e2602d;
  --mn-deep: #b3411a;
  --mn-ink: #24160f;
  --mn-paper: #fff8ea;
  --mn-cream: #fbe3c2;
  --mn-page: #fff1d9;
  --mn-pen: #2f3f9e;
  --mn-soft: #f0a15f;
  --mn-veg: #1f8a3b;
  --mn-nonveg: #b3261e;

  font-family: "Bricolage Grotesque", sans-serif;
  color: var(--mn-ink);
}

.mn .mn-wrap {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------- header ---------- */
.mn .mn-head {
  position: relative;
  z-index: 1;
  padding: 110px 0 96px;
  background: var(--mn-bg);
  overflow: visible;
}
/* scalloped awning edge on the bottom */
.mn .mn-head::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -23px;
  height: 24px;
  background: radial-gradient(circle at 24px 0, var(--mn-bg) 23px, transparent 24px) 0 0 / 48px 24px repeat-x;
}
.mn .mn-head-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.mn .mn-head-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.16;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}
.mn .mn-ring {
  position: absolute;
  border: 10px solid rgba(36, 22, 15, 0.1);
  border-radius: 51% 49% 52% 48% / 49% 53% 47% 51%;
}
.mn .mn-ring-a { width: 280px; height: 280px; left: -90px; bottom: -120px; transform: rotate(14deg); }
.mn .mn-ring-b { width: 170px; height: 170px; right: 22%; top: 40px; border-width: 6px; transform: rotate(-20deg); }

.mn .mn-head-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
}
.mn .mn-kicker {
  display: inline-block;
  margin-bottom: 6px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 32px;
  color: var(--mn-paper);
  transform: rotate(-3deg);
}
.mn .mn-title {
  margin: 0 0 20px;
  font-weight: 800;
  font-size: clamp(2.8rem, 7vw, 5.4rem);
  line-height: 0.98;
  letter-spacing: -2px;
  color: var(--mn-ink);
}
.mn .mn-mark {
  display: inline-block;
  padding: 0 0.14em 0.04em;
  background: var(--mn-paper);
  box-shadow: 5px 5px 0 var(--mn-ink);
  transform: rotate(-2.5deg);
}
.mn .mn-sub {
  max-width: 440px;
  margin: 0;
  font-weight: 500;
  font-size: 19px;
  line-height: 1.6;
  color: rgba(36, 22, 15, 0.86);
}

.mn .mn-cup { width: 150px; flex: none; overflow: visible; }
.mn .mn-cup-body { fill: var(--mn-paper); stroke: var(--mn-ink); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
.mn .mn-cup-coffee { fill: #5a331c; stroke: var(--mn-ink); stroke-width: 3; }
.mn .mn-steam {
  fill: none;
  stroke: var(--mn-paper);
  stroke-width: 4;
  stroke-linecap: round;
  opacity: 0;
  animation: mn-steam 3.2s ease-in-out infinite;
}
.mn .mn-steam-2 { animation-delay: 0.9s; }
.mn .mn-steam-3 { animation-delay: 1.8s; }
@keyframes mn-steam {
  0% { opacity: 0; transform: translateY(8px); }
  35% { opacity: 0.95; }
  100% { opacity: 0; transform: translateY(-16px); }
}

/* header entrance: one orchestrated moment on load */
.mn .mn-in { animation: mn-rise 0.85s cubic-bezier(0.2, 0.8, 0.3, 1) backwards; animation-delay: calc(var(--d, 0) * 120ms); }
@keyframes mn-rise {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---------- body ---------- */
.mn .mn-body {
  position: relative;
  padding: 90px 0 120px;
  background: var(--mn-page);
}
.mn .mn-body::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.35;
  mix-blend-mode: multiply;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E");
}

/* ---------- filters ---------- */
.mn .mn-filters {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 44px;
}
.mn .mn-tabs {
  display: flex;
  gap: 10px;
  padding: 6px 4px 10px;
  overflow-x: auto;
  scrollbar-width: none;
}
.mn .mn-tabs::-webkit-scrollbar { display: none; }
.mn .mn-tab {
  flex: none;
  padding: 11px 18px;
  border: 2px solid var(--mn-ink);
  border-radius: 999px;
  background: transparent;
  color: var(--mn-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1), box-shadow 0.2s ease;
}
.mn .mn-tab.on {
  background: var(--mn-ink);
  color: var(--mn-paper);
  transform: rotate(-2.5deg) scale(1.05);
  box-shadow: 3px 4px 0 var(--mn-bg);
}
@media (hover: hover) {
  .mn .mn-tab:not(.on):hover { background: var(--mn-cream); transform: rotate(1.5deg); }
}

.mn .mn-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px 34px;
}
.mn .mn-search {
  position: relative;
  flex: 1 1 280px;
  max-width: 480px;
}
.mn .mn-search svg {
  position: absolute;
  left: 4px;
  top: 50%;
  width: 22px;
  height: 22px;
  margin-top: -11px;
  fill: none;
  stroke: var(--mn-ink);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.7;
  pointer-events: none;
}
.mn .mn-input {
  width: 100%;
  padding: 6px 8px 6px 36px;
  border: 0;
  border-bottom: 2px solid var(--mn-ink);
  border-radius: 0;
  background: repeating-linear-gradient(transparent 0 31px, rgba(47, 63, 158, 0.18) 31px 32px);
  color: var(--mn-pen);
  font-family: "Caveat", cursive;
  font-weight: 600;
  font-size: 26px;
  line-height: 32px;
  outline: none;
}
.mn .mn-input::placeholder { color: rgba(36, 22, 15, 0.45); }
.mn .mn-input:focus-visible { border-bottom-color: var(--mn-bg); box-shadow: 0 3px 0 var(--mn-bg); }

/* veg switch */
.mn .mn-veg {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  user-select: none;
}
.mn .mn-veg input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.mn .mn-track {
  position: relative;
  width: 56px;
  height: 30px;
  border: 2px solid var(--mn-ink);
  border-radius: 999px;
  background: var(--mn-paper);
  box-shadow: 0 3px 0 var(--mn-ink);
  transition: background 0.25s ease;
}
.mn .mn-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border: 2px solid var(--mn-ink);
  border-radius: 50%;
  background: var(--mn-cream);
  transition: transform 0.35s cubic-bezier(0.3, 1.7, 0.5, 1), background 0.25s ease;
}
.mn .mn-veg input:checked + .mn-track { background: #b9dca4; }
.mn .mn-veg input:checked + .mn-track .mn-knob { transform: translateX(26px); background: var(--mn-veg); }
.mn .mn-veg input:focus-visible + .mn-track { outline: 3px solid var(--mn-pen); outline-offset: 3px; }

.mn .mn-count {
  margin-left: auto;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 28px;
  color: var(--mn-deep);
  transform: rotate(-2deg);
}

.mn .mn-tab:focus-visible,
.mn .mn-reset:focus-visible {
  outline: 3px solid var(--mn-pen);
  outline-offset: 3px;
}

/* ---------- grid ---------- */
.mn .mn-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 42px 34px;
}

/* ---------- menu card ---------- */
.mn .mc {
  --tilt: 0deg;
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--mn-paper);
  border: 2px solid var(--mn-ink);
  border-radius: 18px;
  box-shadow: 6px 8px 0 var(--mn-ink);
  transform: rotate(var(--tilt));
  transition: transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1), box-shadow 0.25s ease;
  animation: mn-pop 0.6s cubic-bezier(0.25, 0.9, 0.3, 1.15) backwards;
  animation-delay: calc(var(--i, 0) * 60ms);
}
.mn .mn-grid > :nth-child(3n + 1) { --tilt: -1deg; }
.mn .mn-grid > :nth-child(3n + 2) { --tilt: 0.8deg; }
.mn .mn-grid > :nth-child(3n + 3) { --tilt: -0.4deg; }
@keyframes mn-pop {
  from { opacity: 0; transform: translateY(24px) rotate(calc(var(--tilt) - 3deg)); }
  to { opacity: 1; transform: translateY(0) rotate(var(--tilt)); }
}
@media (hover: hover) {
  .mn .mc:hover { transform: rotate(0deg) translateY(-6px); box-shadow: 8px 12px 0 var(--mn-ink); }
}

.mn .mc-art {
  position: relative;
  display: grid;
  place-items: center;
  height: 170px;
  border-bottom: 2px dashed var(--mn-ink);
  border-radius: 16px 16px 0 0;
  background: var(--mn-cream);
  overflow: hidden;
}
.mn .mc-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mn .mc-art svg { width: 84px; overflow: visible; }

.mn .mc-price {
  position: absolute;
  top: -16px;
  right: -12px;
  padding: 9px 14px;
  border: 2px solid var(--mn-ink);
  border-radius: 999px;
  background: #f2d27a;
  box-shadow: 3px 3px 0 var(--mn-ink);
  font-weight: 800;
  font-size: 17px;
  line-height: 1;
  transform: rotate(5deg);
}

.mn .mc-body { display: flex; flex-direction: column; gap: 8px; padding: 18px 20px 22px; }
.mn .mc-top { display: flex; align-items: flex-start; gap: 10px; }
.mn .mc-veg {
  flex: none;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-top: 4px;
  border: 2px solid var(--mn-veg);
  border-radius: 3px;
}
.mn .mc-veg::after { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--mn-veg); }
.mn .mc-veg.non { border-color: var(--mn-nonveg); }
.mn .mc-veg.non::after { background: var(--mn-nonveg); }
.mn .mc-name {
  margin: 0;
  font-weight: 800;
  font-size: 22px;
  line-height: 1.15;
  letter-spacing: -0.4px;
}
.mn .mc-desc {
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.55;
  color: rgba(36, 22, 15, 0.72);
}
.mn .mc-cat {
  margin-top: 2px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 22px;
  line-height: 1;
  color: var(--mn-bg);
  transform: rotate(-2deg);
  transform-origin: left center;
}

/* ---------- empty ---------- */
.mn .mn-empty {
  position: relative;
  max-width: 460px;
  margin: 30px auto 0;
  padding: 40px 30px 34px;
  text-align: center;
  background: var(--mn-paper);
  border: 2px solid var(--mn-ink);
  border-radius: 18px;
  box-shadow: 8px 10px 0 var(--mn-ink);
  transform: rotate(-1.4deg);
  animation: mn-pop 0.6s cubic-bezier(0.25, 0.9, 0.3, 1.15) backwards;
  --tilt: -1.4deg;
}
.mn .mn-tape {
  position: absolute;
  top: -17px;
  left: 50%;
  width: 124px;
  height: 34px;
  margin-left: -62px;
  background: repeating-linear-gradient(135deg, rgba(255, 212, 92, 0.88) 0 9px, rgba(255, 228, 140, 0.88) 9px 18px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transform: rotate(-4deg);
}
.mn .mn-empty h2 {
  margin: 0 0 8px;
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -0.6px;
}
.mn .mn-empty p {
  margin: 0 0 22px;
  font-size: 16px;
  line-height: 1.55;
  color: rgba(36, 22, 15, 0.72);
}
.mn .mn-reset {
  padding: 12px 22px;
  border: 0;
  border-radius: 999px;
  background: var(--mn-ink);
  color: var(--mn-paper);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 5px 0 var(--mn-deep);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.mn .mn-reset:active { transform: translateY(4px); box-shadow: 0 1px 0 var(--mn-deep); }

/* ---------- responsive ---------- */
@media (max-width: 760px) {
  .mn .mn-head { padding: 90px 0 80px; }
  .mn .mn-cup { display: none; }
  .mn .mn-body { padding: 76px 0 90px; }
  .mn .mn-count { margin-left: 0; }
}
@media (max-width: 520px) {
  .mn .mn-grid { grid-template-columns: minmax(0, 1fr); }
  .mn .mc-price { right: -6px; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .mn *, .mn *::before, .mn *::after {
    animation: none !important;
    transition: none !important;
  }
  .mn .mn-steam { opacity: 0.8; }
}
`;

/* ---------- menu card ---------- */
// Reads these optional fields from `item`: name, category, veg, price,
// desc / description, image / img. Anything missing is simply skipped.

function CupArt() {
  return (
    <svg viewBox="0 0 140 124" aria-hidden="true">
      <ellipse cx="65" cy="113" rx="50" ry="7" fill="#fff8ea" stroke="#24160f" strokeWidth="3" />
      <path d="M100 62 H110 C124 62 124 90 108 90 H98" fill="#fff8ea" stroke="#24160f" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M28 56 H102 V76 C102 97 86 108 65 108 C44 108 28 97 28 76 Z" fill="#fff8ea" stroke="#24160f" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="65" cy="56" rx="37" ry="6" fill="#5a331c" stroke="#24160f" strokeWidth="3" />
    </svg>
  );
}

function MenuCard({ item, index = 0 }) {
  const desc = item.desc || item.description;
  const img = item.image || item.img;
  const price = typeof item.price === "number" ? `\u20B9${item.price}` : item.price;

  return (
    <article className="mc" style={{ "--i": index }}>
      <div className="mc-art">
        {img ? <img src={img} alt={item.name} loading="lazy" /> : <CupArt />}
        {price && <span className="mc-price">{price}</span>}
      </div>

      <div className="mc-body">
        <div className="mc-top">
          <span
            className={`mc-veg${item.veg ? "" : " non"}`}
            role="img"
            aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
          />
          <h3 className="mc-name">{item.name}</h3>
        </div>
        {desc && <p className="mc-desc">{desc}</p>}
        {item.category && <span className="mc-cat">{item.category}</span>}
      </div>
    </article>
  );
}

/* ---------- page ---------- */
export default function Menu() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = menu.filter((item) => {
    const matchCat = active === "All" || item.category === active;
    const matchSearch = item.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchVeg = !vegOnly || item.veg;
    return matchCat && matchSearch && matchVeg;
  });

  const clearFilters = () => {
    setActive("All");
    setQuery("");
    setVegOnly(false);
  };

  return (
    <main className="mn">
      <style>{css}</style>

      {/* ---------- header ---------- */}
      <header className="mn-head">
        <div className="mn-head-bg" aria-hidden="true">
          <span className="mn-ring mn-ring-a" />
          <span className="mn-ring mn-ring-b" />
        </div>

        <div className="mn-wrap">
          <div className="mn-head-row">
            <div>
              <span className="mn-kicker mn-in" style={{ "--d": 0 }}>
                aaj kya piyoge?
              </span>
              <h1 className="mn-title mn-in" style={{ "--d": 1 }}>
                Our <span className="mn-mark">Menu</span>
              </h1>
              <p className="mn-sub mn-in" style={{ "--d": 2 }}>
                Fresh coffee, chai, snacks aur desserts
              </p>
            </div>

            <svg className="mn-cup mn-in" style={{ "--d": 3 }} viewBox="0 0 140 124" aria-hidden="true">
              <path className="mn-steam mn-steam-1" d="M50 44 C44 34 56 28 50 18 C47 12 52 8 52 8" />
              <path className="mn-steam mn-steam-2" d="M70 42 C64 32 76 26 70 16 C67 10 72 6 72 6" />
              <path className="mn-steam mn-steam-3" d="M90 44 C84 34 96 28 90 18 C87 12 92 8 92 8" />
              <ellipse className="mn-cup-body" cx="65" cy="113" rx="50" ry="7" />
              <path className="mn-cup-body" d="M100 62 H110 C124 62 124 90 108 90 H98" />
              <path className="mn-cup-body" d="M28 56 H102 V76 C102 97 86 108 65 108 C44 108 28 97 28 76 Z" />
              <ellipse className="mn-cup-coffee" cx="65" cy="56" rx="37" ry="6" />
            </svg>
          </div>
        </div>
      </header>

      {/* ---------- filters + grid ---------- */}
      <section className="mn-body" aria-label="Menu items">
        <div className="mn-wrap">
          <div className="mn-filters">
            <div className="mn-tabs" role="group" aria-label="Category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`mn-tab${active === c ? " on" : ""}`}
                  aria-pressed={active === c}
                  onClick={() => setActive(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mn-tools">
              <div className="mn-search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l5 5" />
                </svg>
                <input
                  className="mn-input"
                  type="text"
                  placeholder="Item search karo..."
                  aria-label="Search menu items"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <label className="mn-veg">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                />
                <span className="mn-track" aria-hidden="true">
                  <span className="mn-knob" />
                </span>
                Veg only
              </label>

              <span className="mn-count" aria-live="polite">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mn-empty" role="status">
              <span className="mn-tape" aria-hidden="true" />
              <h2>Koi item nahi mila</h2>
              <p>Is search ya filter se kuch match nahi hua. Filters hatao aur poora menu dekho.</p>
              <button type="button" className="mn-reset" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mn-grid">
              {filtered.map((item, i) => (
                <MenuCard key={item.id} item={item} index={Math.min(i, 8)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}