import { useEffect, useRef, useState } from "react";

const css = `
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap");

.wcu {
  --wcu-ink: #1f1a17;
  --wcu-cream: #fbf3e6;
  --wcu-accent: #e2602d;
  --wcu-bean: #b8774a;

  position: relative;
  overflow: hidden;
  padding: 110px 0 0;
  background-color: var(--wcu-cream);
  background-image: radial-gradient(rgba(31, 26, 23, 0.09) 1.2px, transparent 1.3px);
  background-size: 22px 22px;
  color: var(--wcu-ink);
}

.wcu-wrap {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------- floating beans ---------- */
.wcu-bean {
  position: absolute;
  color: var(--wcu-bean);
  opacity: 0.28;
  pointer-events: none;
}
.wcu-bean-a { width: 46px; top: 70px; left: 6%; --r: -25deg; animation: wcu-float 7s ease-in-out infinite; }
.wcu-bean-b { width: 34px; top: 38%; right: 4%; --r: 40deg; animation: wcu-float 9s -2s ease-in-out infinite; }
.wcu-bean-c { width: 56px; bottom: 170px; left: 3%; --r: 15deg; animation: wcu-float 8s -4s ease-in-out infinite; }

@keyframes wcu-float {
  0%, 100% { transform: translateY(0) rotate(var(--r)); }
  50% { transform: translateY(-18px) rotate(calc(var(--r) + 14deg)); }
}

/* ---------- heading ---------- */
.wcu-head {
  text-align: center;
  margin-bottom: 70px;
}
.wcu:not(.is-in) .wcu-head { opacity: 0; }
.wcu.is-in .wcu-head { animation: wcu-rise 0.8s cubic-bezier(0.2, 0.8, 0.3, 1) backwards; }

@keyframes wcu-rise {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: translateY(0); }
}

.wcu-kicker {
  display: inline-block;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 28px;
  color: var(--wcu-accent);
  transform: rotate(-3deg);
  margin-bottom: 6px;
}

.wcu .wcu-heading {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: clamp(2.3rem, 5.2vw, 3.7rem);
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0 0 18px;
  color: var(--wcu-ink);
}

.wcu-mark {
  position: relative;
  display: inline-block;
}
.wcu-mark svg {
  position: absolute;
  left: -2%;
  bottom: -14px;
  width: 104%;
  height: auto;
  overflow: visible;
  pointer-events: none;
}
.wcu-line {
  fill: none;
  stroke: var(--wcu-accent);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.wcu.is-in .wcu-line { animation: wcu-draw 1s 0.7s ease-out forwards; }
@keyframes wcu-draw { to { stroke-dashoffset: 0; } }

.wcu .wcu-sub {
  max-width: 460px;
  margin: 0 auto;
  font-size: 17px;
  line-height: 1.65;
  color: rgba(31, 26, 23, 0.7);
}

/* ---------- cards ---------- */
.wcu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34px;
  align-items: start;
  padding-bottom: 80px;
}

.wcu-card {
  --rot: -1.4deg;
  --lift: 0px;
  position: relative;
  background: #fffdf8;
  border: 2px solid var(--wcu-ink);
  border-radius: 26px 26px 26px 8px;
  padding: 34px 30px 30px;
  box-shadow: 7px 7px 0 var(--wcu-ink);
  transform: translateY(var(--lift)) rotate(var(--rot));
  transition: transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1), box-shadow 0.3s ease;
}
.wcu-card:nth-child(1) { --tint: #ffd9c2; }
.wcu-card:nth-child(2) { --tint: #f6e7a8; --rot: 1.2deg; --lift: 34px; }
.wcu-card:nth-child(3) { --tint: #d8e8c4; --rot: -0.8deg; --lift: 10px; }

.wcu:not(.is-in) .wcu-card { opacity: 0; }
.wcu.is-in .wcu-card {
  animation: wcu-pop 0.95s cubic-bezier(0.2, 0.85, 0.3, 1.1) backwards;
  animation-delay: calc(var(--i) * 160ms + 150ms);
}

@keyframes wcu-pop {
  from {
    opacity: 0;
    transform: translateY(calc(var(--lift) + 70px)) rotate(calc(var(--rot) * -4)) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translateY(var(--lift)) rotate(var(--rot)) scale(1);
  }
}

.wcu-num {
  position: absolute;
  top: 14px;
  right: 22px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 64px;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(31, 26, 23, 0.22);
  user-select: none;
  transition: -webkit-text-stroke-color 0.3s ease;
}

.wcu-icon {
  width: 84px;
  height: 84px;
  display: grid;
  place-items: center;
  margin-bottom: 22px;
  background: var(--tint);
  border: 2px solid var(--wcu-ink);
  border-radius: 58% 42% 55% 45% / 46% 56% 44% 54%;
  transition: border-radius 0.6s ease, transform 0.45s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.wcu-icon svg {
  width: 46px;
  height: 46px;
  overflow: visible;
  fill: none;
  stroke: var(--wcu-ink);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.wcu-icon .solid { fill: var(--wcu-ink); }

.wcu .wcu-title {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.3px;
  margin: 0 0 10px;
  color: var(--wcu-ink);
}
.wcu .wcu-text {
  font-size: 16px;
  line-height: 1.65;
  margin: 0 0 20px;
  color: rgba(31, 26, 23, 0.74);
}
.wcu-note {
  display: inline-block;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 24px;
  color: var(--wcu-accent);
  transform: rotate(-3deg);
}
.wcu-note::before { content: "\\2726  "; font-size: 15px; }

/* ---------- idle icon animations ---------- */
.wcu-ico-leaf { transform-origin: 15% 90%; animation: wcu-sway 4.5s ease-in-out infinite; }
.wcu-ico-note { animation: wcu-bob 2.4s ease-in-out infinite; }
.wcu-arc { animation: wcu-wave 2.4s ease-in-out infinite; }
.wcu-arc-3 { animation-delay: 0s; }
.wcu-arc-2 { animation-delay: 0.3s; }
.wcu-arc-1 { animation-delay: 0.6s; }

@keyframes wcu-sway { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(6deg); } }
@keyframes wcu-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes wcu-wave { 0%, 100% { opacity: 0.2; } 35% { opacity: 1; } }

/* ---------- hover (sirf mouse wale devices pe) ---------- */
@media (hover: hover) {
  .wcu-card:hover {
    transform: translateY(calc(var(--lift) - 8px)) rotate(0deg);
    box-shadow: 12px 14px 0 var(--wcu-accent);
  }
  .wcu-card:hover .wcu-icon {
    border-radius: 42% 58% 38% 62% / 58% 40% 60% 42%;
    transform: rotate(-7deg) scale(1.08);
  }
  .wcu-card:hover .wcu-num { -webkit-text-stroke-color: var(--wcu-accent); }
  .wcu-card:hover .wcu-ico-leaf { animation-duration: 1.4s; }
  .wcu-card:hover .wcu-ico-note { animation-duration: 0.8s; }
  .wcu-card:hover .wcu-arc { animation-duration: 1.1s; }
}

/* ---------- scrolling tape ---------- */
.wcu-tape {
  position: relative;
  margin: 0 -3% 52px;
  padding: 15px 0;
  background: var(--wcu-ink);
  color: var(--wcu-cream);
  transform: rotate(-1.4deg);
  overflow: hidden;
}
.wcu-tape-track {
  display: flex;
  width: max-content;
  animation: wcu-slide 28s linear infinite;
}
.wcu-tape:hover .wcu-tape-track { animation-play-state: paused; }
.wcu-tape-group { display: flex; flex-shrink: 0; }
.wcu-tape-group span {
  display: inline-flex;
  align-items: center;
  gap: 36px;
  padding-right: 36px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
}
.wcu-tape-group span::after { content: "\\2726"; color: var(--wcu-accent); }

@keyframes wcu-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ---------- responsive ---------- */
@media (max-width: 900px) {
  .wcu { padding-top: 80px; }
  .wcu-head { margin-bottom: 50px; }
  .wcu-grid {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin: 0 auto;
    gap: 30px;
    padding-bottom: 60px;
  }
  .wcu-card:nth-child(n) { --lift: 0px; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .wcu *, .wcu *::before, .wcu *::after {
    animation: none !important;
    transition: none !important;
  }
  .wcu .wcu-card, .wcu .wcu-head { opacity: 1 !important; }
  .wcu .wcu-line { stroke-dashoffset: 0; }
}
`;

const items = [
  {
    no: "01",
    title: "Fresh Ingredients",
    text: "Roz taaza beans aur ingredients se bana khana.",
    note: "roz subah ki taazgi",
    icon: "leaf",
  },
  {
    no: "02",
    title: "Free WiFi",
    text: "Kaam karo ya padho, fast WiFi aur plugs ke saath.",
    note: "plug points pakke",
    icon: "wifi",
  },
  {
    no: "03",
    title: "Cozy Ambience",
    text: "Soft music aur comfortable seating.",
    note: "chill mode on",
    icon: "note",
  },
];

const tapeWords = [
  "Fresh Beans",
  "Free WiFi",
  "Cozy Corners",
  "Soft Music",
  "Slow Mornings",
  "Good Company",
];

function Bean({ className }) {
  return (
    <svg className={`wcu-bean ${className}`} viewBox="0 0 40 56" aria-hidden="true">
      <ellipse cx="20" cy="28" rx="16" ry="25" fill="currentColor" />
      <path
        d="M20 5 C10 20 30 36 20 51"
        stroke="#fbf3e6"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Icon({ type }) {
  if (type === "leaf") {
    return (
      <svg className="wcu-ico-leaf" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M10 54 C8 28 28 10 56 8 C58 36 40 56 10 54 Z" />
        <path d="M10 54 L40 24" />
        <path d="M26 40 L26 30" />
      </svg>
    );
  }
  if (type === "wifi") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path className="wcu-arc wcu-arc-1" d="M6 24 Q32 -2 58 24" />
        <path className="wcu-arc wcu-arc-2" d="M15 33 Q32 16 49 33" />
        <path className="wcu-arc wcu-arc-3" d="M24 42 Q32 34 40 42" />
        <circle className="solid" cx="32" cy="52" r="3.5" />
      </svg>
    );
  }
  return (
    <svg className="wcu-ico-note" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 48 V14 L52 8 V42" />
      <path d="M22 26 L52 20" />
      <circle className="solid" cx="15" cy="48" r="7" />
      <circle className="solid" cx="45" cy="42" r="7" />
    </svg>
  );
}

export default function WhyChooseUs() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`wcu${seen ? " is-in" : ""}`}>
      <style>{css}</style>

      <Bean className="wcu-bean-a" />
      <Bean className="wcu-bean-b" />
      <Bean className="wcu-bean-c" />

      <div className="wcu-wrap">
        <header className="wcu-head">
          <span className="wcu-kicker">kyun aana chahiye?</span>
          <h2 className="wcu-heading">
            Why{" "}
            <span className="wcu-mark">
              Choose
              <svg viewBox="0 0 240 20" aria-hidden="true">
                <path
                  className="wcu-line"
                  pathLength="1"
                  d="M4 14 C 40 4, 90 18, 140 8 S 210 6, 236 12"
                />
              </svg>
            </span>{" "}
            Us
          </h2>
          <p className="wcu-sub">
            Sirf coffee nahi, poora vibe milta hai yahan. Teen cheezein jo hume alag banati hain.
          </p>
        </header>

        <div className="wcu-grid">
          {items.map((item, i) => (
            <article className="wcu-card" key={item.no} style={{ "--i": i }}>
              <span className="wcu-num">{item.no}</span>
              <div className="wcu-icon">
                <Icon type={item.icon} />
              </div>
              <h3 className="wcu-title">{item.title}</h3>
              <p className="wcu-text">{item.text}</p>
              <span className="wcu-note">{item.note}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="wcu-tape" aria-hidden="true">
        <div className="wcu-tape-track">
          {[0, 1].map((k) => (
            <div className="wcu-tape-group" key={k}>
              {[...tapeWords, ...tapeWords].map((w, idx) => (
                <span key={idx}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}