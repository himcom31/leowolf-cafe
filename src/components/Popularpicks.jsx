import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { menu } from "../data/menu.js";
// Same file you import <OrderProvider> from in main.jsx (keep the exact same path + spelling)
import { useOrder } from "../pages/Ordernow.jsx";

/* ---------- All PopularPicks CSS (isi file me) ---------- */
const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&display=swap");

.pk {
  --pk-accent: #e2602d;
  --pk-deep: #b3411a;
  --pk-ink: #24160f;
  --pk-paper: #fff8ea;
  --pk-cream: #fbe3c2;
  --pk-pen: #2f3f9e;
  --pk-plate: 112px;
  --pk-gap: 28px;
  --pk-rgap: 88px;

  position: relative;
  overflow: hidden;
  padding: 100px 0 112px;
  background: var(--pk-ink);
  color: var(--pk-paper);
  font-family: "Bricolage Grotesque", sans-serif;
}

/* warm glow + paper grain + faint rings */
.pk .pk-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  background: radial-gradient(circle at 50% -10%, rgba(226, 96, 45, 0.3), transparent 55%);
}
.pk .pk-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.2;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}
.pk .pk-ring-bg {
  position: absolute;
  border: 10px solid rgba(255, 248, 234, 0.06);
  border-radius: 51% 49% 52% 48% / 49% 53% 47% 51%;
}
.pk .pk-ring-a { width: 300px; height: 300px; left: -100px; bottom: -110px; transform: rotate(14deg); }
.pk .pk-ring-b { width: 190px; height: 190px; right: -40px; top: 50px; border-width: 6px; transform: rotate(-20deg); }

.pk .pk-wrap {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 1132px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------- reveal ---------- */
.pk:not(.is-in) .pk-rise,
.pk:not(.is-in) .pk-card { opacity: 0; }

.pk.is-in .pk-rise {
  animation: pk-rise 0.85s cubic-bezier(0.2, 0.8, 0.3, 1) backwards;
  animation-delay: calc(var(--d, 0) * 120ms);
}
@keyframes pk-rise {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---------- heading ---------- */
.pk .pk-head {
  text-align: center;
  margin-bottom: 96px;
}
.pk .pk-kicker {
  display: inline-block;
  margin: 0 0 10px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
  color: var(--pk-accent);
  transform: rotate(-3deg);
}
.pk .pk-title {
  margin: 0;
  font-weight: 800;
  font-size: clamp(2.3rem, 5vw, 3.9rem);
  line-height: 1;
  letter-spacing: -1.5px;
  color: var(--pk-paper);
}
.pk .pk-mark {
  display: inline-block;
  padding: 0 0.14em 0.04em;
  background: var(--pk-paper);
  color: var(--pk-ink);
  box-shadow: 5px 5px 0 var(--pk-accent);
  transform: rotate(-2.5deg);
}
.pk .pk-sub {
  display: block;
  margin-top: 18px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.1;
  color: var(--pk-cream);
  transform: rotate(-1deg);
}

/* ---------- grid: always 3 per row, last row centered ---------- */
.pk .pk-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--pk-rgap) var(--pk-gap);
}

/* ---------- card ---------- */
.pk .pk-card {
  --tilt: -1.4deg;
  position: relative;
  box-sizing: border-box;
  flex: 0 0 calc((100% - 2 * var(--pk-gap)) / 3);
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--pk-plate) / 2 + 18px) 18px 26px;
  text-align: center;
  background: var(--pk-paper);
  color: var(--pk-ink);
  border: 2px solid var(--pk-ink);
  border-radius: 20px;
  box-shadow: 7px 9px 0 var(--pk-accent);
  transform: rotate(var(--tilt));
  transition: transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1), box-shadow 0.3s ease;
}
.pk .pk-card:nth-child(2) { --tilt: 1.2deg; }
.pk .pk-card:nth-child(3) { --tilt: -0.9deg; }
.pk .pk-card:nth-child(4) { --tilt: 1.6deg; }
.pk .pk-card:nth-child(5) { --tilt: -1.1deg; }

.pk.is-in .pk-card {
  animation: pk-drop 0.9s cubic-bezier(0.25, 0.9, 0.3, 1.15) backwards;
  animation-delay: calc(var(--d, 0) * 130ms + 150ms);
}
@keyframes pk-drop {
  from { opacity: 0; transform: translateY(-60px) rotate(-7deg); }
  to { opacity: 1; transform: translateY(0) rotate(var(--tilt)); }
}

@media (hover: hover) {
  .pk .pk-card:hover {
    transform: rotate(0deg) translateY(-8px);
    box-shadow: 9px 15px 0 var(--pk-accent);
  }
  .pk .pk-card:hover .pk-ring { animation: pk-spin 14s linear infinite; }
  .pk .pk-card:hover .pk-price { transform: rotate(0deg) scale(1.08); }
}

/* washi tape */
.pk .pk-tape {
  position: absolute;
  top: 10px;
  left: -20px;
  width: 78px;
  height: 24px;
  background: repeating-linear-gradient(135deg, rgba(255, 212, 92, 0.92) 0 8px, rgba(255, 228, 140, 0.92) 8px 16px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transform: rotate(-38deg);
  z-index: 2;
}
.pk .pk-card:nth-child(even) .pk-tape {
  left: auto;
  right: -20px;
  transform: rotate(38deg);
  background: repeating-linear-gradient(135deg, rgba(226, 96, 45, 0.6) 0 8px, rgba(240, 161, 95, 0.6) 8px 16px);
}

/* hand-written number */
.pk .pk-no {
  position: absolute;
  top: 12px;
  right: 16px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: rgba(36, 22, 15, 0.4);
}
.pk .pk-card:nth-child(even) .pk-no { right: auto; left: 16px; }

/* round plate (emoji or photo) */
.pk .pk-plate {
  position: absolute;
  top: calc(var(--pk-plate) / -2);
  left: 50%;
  width: var(--pk-plate);
  height: var(--pk-plate);
  transform: translateX(-50%);
}
.pk .pk-ring {
  position: absolute;
  inset: -8px;
  border: 2px dashed var(--pk-accent);
  border-radius: 50%;
}
.pk .pk-disc {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 3px solid var(--pk-paper);
  border-radius: 50%;
  background: var(--pk-cream);
  box-shadow: 4px 5px 0 var(--pk-accent);
}
.pk .pk-disc img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pk .pk-emoji {
  display: block;
  font-size: calc(var(--pk-plate) * 0.5);
  line-height: 1;
  filter: drop-shadow(0 4px 0 rgba(36, 22, 15, 0.18));
  animation: pk-bob 3.2s ease-in-out infinite;
  animation-delay: calc(var(--d, 0) * -0.6s);
}
@keyframes pk-bob {
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-6px) rotate(4deg); }
}
@keyframes pk-spin { to { transform: rotate(360deg); } }

/* text */
.pk .pk-name {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 6px;
  font-weight: 800;
  font-size: 23px;
  line-height: 1.15;
  letter-spacing: -0.5px;
  text-wrap: balance;
}
.pk .pk-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 14px;
  font-family: "Caveat", cursive;
  font-weight: 600;
  font-size: 23px;
  line-height: 1.15;
  color: var(--pk-pen);
  text-wrap: balance;
}

/* veg / non-veg marker + category */
.pk .pk-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(36, 22, 15, 0.55);
}
.pk .pk-veg {
  position: relative;
  flex: none;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border: 2px solid #1a8f3c;
  border-radius: 3px;
}
.pk .pk-veg::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: #1a8f3c;
}
.pk .pk-veg.non { border-color: #c0341d; }
.pk .pk-veg.non::after { background: #c0341d; }

/* price sticker */
.pk .pk-price {
  display: inline-block;
  margin-top: auto;
  padding: 9px 20px 10px;
  border: 2px solid var(--pk-ink);
  border-radius: 999px;
  background: var(--pk-accent);
  color: var(--pk-paper);
  font-weight: 800;
  font-size: 22px;
  line-height: 1;
  letter-spacing: -0.3px;
  box-shadow: 3px 4px 0 var(--pk-ink);
  transform: rotate(-3deg);
  transition: transform 0.35s cubic-bezier(0.3, 1.7, 0.5, 1);
}
.pk .pk-card:nth-child(even) .pk-price { transform: rotate(2.5deg); }

/* ---------- buttons ---------- */
.pk .pk-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 84px;
}
.pk .pk-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 30px;
  border: 2px solid var(--pk-paper);
  border-radius: 999px;
  background: transparent;
  color: var(--pk-paper);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: 18px;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.pk .pk-btn.solid {
  border-color: var(--pk-accent);
  background: var(--pk-accent);
  box-shadow: 0 6px 0 var(--pk-deep);
}
.pk .pk-btn.solid:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--pk-deep); }
.pk .pk-btn svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.pk .pk-btn:focus-visible { outline: 3px solid var(--pk-cream); outline-offset: 4px; }
@media (hover: hover) {
  .pk .pk-btn:not(.solid):hover { background: var(--pk-paper); color: var(--pk-ink); }
  .pk .pk-btn.solid:hover { transform: translateY(-2px); box-shadow: 0 8px 0 var(--pk-deep); }
  .pk .pk-btn:hover svg { transform: translateX(5px); }
}

/* ---------- tablet ---------- */
@media (max-width: 991px) {
  .pk { --pk-plate: 100px; --pk-gap: 22px; --pk-rgap: 80px; }
  .pk .pk-card { padding-left: 12px; padding-right: 12px; }
  .pk .pk-name { font-size: 20px; }
  .pk .pk-desc { font-size: 21px; }
}

/* ---------- mobile: compact 3 per row ---------- */
@media (max-width: 560px) {
  .pk { --pk-plate: 62px; --pk-gap: 10px; --pk-rgap: 52px; padding: 64px 0 76px; }
  .pk .pk-wrap { padding: 0 12px; }
  .pk .pk-head { margin-bottom: 62px; }
  .pk .pk-kicker { font-size: 26px; }
  .pk .pk-title { letter-spacing: -1px; }
  .pk .pk-mark { box-shadow: 4px 4px 0 var(--pk-accent); }
  .pk .pk-sub { font-size: 22px; margin-top: 14px; }

  .pk .pk-card {
    padding: calc(var(--pk-plate) / 2 + 10px) 6px 14px;
    border-radius: 14px;
    box-shadow: 4px 5px 0 var(--pk-accent);
  }
  .pk .pk-tape,
  .pk .pk-desc,
  .pk .pk-cat { display: none; }
  .pk .pk-no { top: 6px; right: 8px; font-size: 15px; }
  .pk .pk-card:nth-child(even) .pk-no { left: 8px; }

  .pk .pk-ring { inset: -5px; }
  .pk .pk-disc { border-width: 2px; box-shadow: 3px 3px 0 var(--pk-accent); }

  .pk .pk-name {
    min-height: 2.3em;
    margin: 0 0 6px;
    font-size: 13px;
    letter-spacing: -0.2px;
  }
  .pk .pk-meta { margin: 0 0 10px; }
  .pk .pk-veg { width: 13px; height: 13px; }
  .pk .pk-price {
    padding: 6px 11px 7px;
    font-size: 14px;
    box-shadow: 2px 3px 0 var(--pk-ink);
  }

  .pk .pk-cta { margin-top: 56px; gap: 12px; }
  .pk .pk-btn { padding: 14px 22px; font-size: 16px; }
}

/* ---------- chhote phones ---------- */
@media (max-width: 360px) {
  .pk { --pk-plate: 54px; --pk-gap: 8px; --pk-rgap: 48px; }
  .pk .pk-wrap { padding: 0 8px; }
  .pk .pk-card { padding-left: 4px; padding-right: 4px; }
  .pk .pk-name { font-size: 11.5px; }
  .pk .pk-price { font-size: 13px; padding: 6px 9px 7px; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .pk *, .pk *::before, .pk *::after {
    animation: none !important;
    transition: none !important;
  }
  .pk .pk-rise, .pk .pk-card { opacity: 1 !important; }
}
`;

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

// Photo if it loads, otherwise the emoji (so a missing file never shows a broken image)
function PlateArt({ item }) {
  const [failed, setFailed] = useState(false);

  if (item.image && !failed) {
    return (
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="pk-emoji" role="img" aria-label={item.name}>
      {item.emoji}
    </span>
  );
}

export default function PopularPicks() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const { openOrder } = useOrder();

  // Items marked `popular: true` in data/menu.js
  const items = menu.filter((m) => m.popular);

  // Section scroll me aate hi animations chalu
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <section ref={ref} className={`pk${seen ? " is-in" : ""}`} aria-labelledby="pk-title">
      <style>{css}</style>

      <div className="pk-bg" aria-hidden="true">
        <span className="pk-ring-bg pk-ring-a" />
        <span className="pk-ring-bg pk-ring-b" />
      </div>

      <div className="pk-wrap">
        <div className="pk-head">
          <span className="pk-kicker pk-rise" style={{ "--d": 0 }}>
            tried, loved, ordered again
          </span>
          <h2 id="pk-title" className="pk-title pk-rise" style={{ "--d": 1 }}>
            Our Popular <span className="pk-mark">Picks</span>
          </h2>
          <span className="pk-sub pk-rise" style={{ "--d": 2 }}>
            Customers ke favourite, bar bar order hone wale items
          </span>
        </div>

        <div className="pk-grid">
          {items.map((item, i) => (
            <article className="pk-card" key={item.id} style={{ "--d": i }}>
              <span className="pk-tape" aria-hidden="true" />
              <span className="pk-no" aria-hidden="true">
                #{String(i + 1).padStart(2, "0")}
              </span>

              <div className="pk-plate">
                <span className="pk-ring" aria-hidden="true" />
                <span className="pk-disc">
                  <PlateArt item={item} />
                </span>
              </div>

              <h3 className="pk-name">{item.name}</h3>
              <p className="pk-desc">{item.desc}</p>

              <div className="pk-meta">
                <span
                  className={`pk-veg${item.veg ? "" : " non"}`}
                  role="img"
                  aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
                />
                <span className="pk-cat">{item.category}</span>
              </div>

              <span className="pk-price">₹{item.price}</span>
            </article>
          ))}
        </div>

        <div className="pk-cta pk-rise" style={{ "--d": 4 }}>
          <Link to="/menu" className="pk-btn">
            Full Menu Dekho
            <ArrowIcon />
          </Link>
          <button type="button" className="pk-btn solid" onClick={() => openOrder()} aria-haspopup="dialog">
            Order Now
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}