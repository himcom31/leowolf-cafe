import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cafe } from "../data/info.js";

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&display=swap");

.ft {
  --ft-bg: #1a110c;
  --ft-text: #f4e9da;
  --ft-accent: #e2602d;
  --ft-soft: #f0a15f;
  --ft-line: rgba(244, 233, 218, 0.13);
  --ft-board: #26352e;
  --ft-chalk: #eef0e6;

  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 100px 0 0;
  background: var(--ft-bg);
  color: var(--ft-text);
  font-family: "Bricolage Grotesque", sans-serif;
}

/* warm glow + paper grain */
.ft::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(circle at 92% 6%, rgba(226, 96, 45, 0.2), transparent 40%),
    radial-gradient(circle at 2% 70%, rgba(184, 119, 74, 0.16), transparent 42%);
}
.ft::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.09;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
}

.ft a { color: inherit; text-decoration: none; }
.ft ul { list-style: none; margin: 0; padding: 0; }

.ft .ft-wrap {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
}

.ft .ft-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.8fr 1.2fr 0.8fr;
  gap: 52px;
  align-items: start;
}

/* ---------- reveal on scroll ---------- */
.ft:not(.is-in) .ft-rise { opacity: 0; }
.ft.is-in .ft-rise {
  animation: ft-rise 0.85s cubic-bezier(0.2, 0.8, 0.3, 1) backwards;
  animation-delay: calc(var(--d, 0) * 130ms);
}
@keyframes ft-rise {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---------- column headings ---------- */
.ft .ft-h {
  margin: 0 0 22px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
  color: var(--ft-soft);
  transform: rotate(-2deg);
  transform-origin: left center;
}

/* ---------- brand ---------- */
.ft .ft-brand-row {
  display: flex;
  align-items: flex-end;
  gap: 14px;
  margin-bottom: 18px;
}
.ft .ft-cup { width: 66px; flex: none; overflow: visible; }
.ft .ft-cup-body { fill: var(--ft-accent); stroke: var(--ft-text); stroke-width: 3.5; stroke-linejoin: round; stroke-linecap: round; }
.ft .ft-cup-coffee { fill: #3a2012; stroke: var(--ft-text); stroke-width: 3.5; }
.ft .ft-steam {
  fill: none;
  stroke: var(--ft-text);
  stroke-width: 4.5;
  stroke-linecap: round;
  opacity: 0;
  animation: ft-steam 3.2s ease-in-out infinite;
}
.ft .ft-steam-2 { animation-delay: 0.9s; }
.ft .ft-steam-3 { animation-delay: 1.8s; }
@keyframes ft-steam {
  0% { opacity: 0; transform: translateY(8px); }
  35% { opacity: 0.85; }
  100% { opacity: 0; transform: translateY(-16px); }
}

.ft .ft-name {
  margin: 0;
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: 30px;
  line-height: 1;
  letter-spacing: -0.8px;
  color: var(--ft-text);
}
.ft .ft-tag {
  max-width: 290px;
  margin: 0 0 22px;
  font-size: 16px;
  line-height: 1.65;
  color: rgba(244, 233, 218, 0.62);
}
.ft .ft-scribble {
  display: inline-block;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.1;
  color: var(--ft-accent);
  transform: rotate(-4deg);
}

/* ---------- quick links ---------- */
.ft .ft-link {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 7px 0;
  font-weight: 500;
  font-size: 18px;
}
.ft .ft-no {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--ft-accent);
}
.ft .ft-txt {
  background: linear-gradient(var(--ft-soft), var(--ft-soft)) 0 100% / 0 2px no-repeat;
  padding-bottom: 2px;
  transition: background-size 0.35s ease, transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1), color 0.25s ease;
}
.ft .ft-arrow {
  width: 16px;
  height: 16px;
  align-self: center;
  fill: none;
  stroke: var(--ft-soft);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1);
}
@media (hover: hover) {
  .ft .ft-link:hover .ft-txt { background-size: 100% 2px; transform: translateX(6px); color: #fff; }
  .ft .ft-link:hover .ft-arrow { opacity: 1; transform: translateX(6px); }
}

/* ---------- chalkboard hours ---------- */
.ft .ft-board {
  position: relative;
  padding: 24px 22px 20px;
  border: 7px solid #8b5e34;
  border-radius: 12px;
  background:
    radial-gradient(ellipse at 22% 18%, rgba(255, 255, 255, 0.09), transparent 55%),
    radial-gradient(ellipse at 80% 90%, rgba(255, 255, 255, 0.05), transparent 50%),
    var(--ft-board);
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.28), 7px 9px 0 rgba(0, 0, 0, 0.4);
  transform: rotate(1.6deg);
  transition: transform 0.45s cubic-bezier(0.3, 1.5, 0.5, 1);
}
.ft .ft-board::before {
  content: "";
  position: absolute;
  inset: 7px;
  border: 1.5px dashed rgba(238, 240, 230, 0.28);
  border-radius: 6px;
  pointer-events: none;
}
.ft .ft-board-title {
  margin: 0 0 14px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 30px;
  line-height: 1;
  color: var(--ft-chalk);
}
.ft .ft-board-title::after {
  content: "";
  display: block;
  width: 76px;
  height: 3px;
  margin-top: 8px;
  border-radius: 3px;
  background: var(--ft-soft);
  transform: rotate(-1.5deg);
}
.ft .ft-hours li {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 5px 0;
  font-family: "Caveat", cursive;
  font-weight: 600;
  font-size: 23px;
  line-height: 1.25;
  color: var(--ft-chalk);
}
.ft .ft-dots {
  flex: 1;
  min-width: 14px;
  border-bottom: 2px dotted rgba(238, 240, 230, 0.35);
  transform: translateY(-5px);
}
.ft .ft-time { color: var(--ft-soft); text-align: right; }
@media (hover: hover) {
  .ft .ft-board:hover { transform: rotate(0deg) scale(1.02); }
}

/* ---------- social stickers ---------- */
.ft .ft-socials { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
.ft .ft-sticker {
  --c: #f0a15f;
  --t: -2.5deg;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border: 2px solid #0d0805;
  border-radius: 999px;
  background: var(--c);
  color: #1a110c;
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.55);
  transform: rotate(var(--t));
  transition: transform 0.35s cubic-bezier(0.3, 1.7, 0.5, 1), box-shadow 0.25s ease;
}
.ft .ft-socials li:nth-child(3n + 2) .ft-sticker { --c: #f2d27a; --t: 2deg; }
.ft .ft-socials li:nth-child(3n + 3) .ft-sticker { --c: #a9d19a; --t: -1deg; }
.ft .ft-sticker svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s ease;
}
@media (hover: hover) {
  .ft .ft-sticker:hover { transform: rotate(0deg) translateY(-4px) scale(1.06); box-shadow: 6px 8px 0 rgba(0, 0, 0, 0.55); }
  .ft .ft-sticker:hover svg { transform: translate(2px, -2px); }
}

/* focus */
.ft a:focus-visible,
.ft .ft-top:focus-visible {
  outline: 2px solid var(--ft-soft);
  outline-offset: 4px;
  border-radius: 6px;
}

/* ---------- bottom bar ---------- */
.ft .ft-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 80px;
  padding: 24px 0;
  border-top: 1px solid var(--ft-line);
}
.ft .ft-copy {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(244, 233, 218, 0.55);
}
.ft .ft-copy em {
  font-family: "Caveat", cursive;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: var(--ft-soft);
  margin-left: 6px;
}

.ft .ft-top {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ft-text);
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 24px;
  cursor: pointer;
}
.ft .ft-top-circle {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1.5px solid rgba(244, 233, 218, 0.35);
  border-radius: 50%;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.35s cubic-bezier(0.3, 1.7, 0.5, 1);
}
.ft .ft-top-circle svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}
@media (hover: hover) {
  .ft .ft-top:hover .ft-top-circle {
    background: var(--ft-accent);
    border-color: var(--ft-accent);
    transform: translateY(-6px);
  }
}

/* ---------- giant wordmark ---------- */
.ft .ft-word-clip {
  overflow: hidden;
  padding-top: 0.06em;
  font-size: min(calc(165vw / var(--len, 10)), 14rem);
  line-height: 0.82;
}
.ft .ft-word {
  display: flex;
  justify-content: center;
  margin: 0 0 -0.14em;
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
  white-space: pre;
  user-select: none;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(244, 233, 218, 0.2);
}
.ft .ft-letter {
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.3, 1.8, 0.5, 1), color 0.3s ease, -webkit-text-stroke-color 0.3s ease;
}
.ft.is-in .ft-letter {
  animation: ft-letter 1s cubic-bezier(0.2, 0.85, 0.3, 1) backwards;
  animation-delay: calc(var(--i) * 55ms + 250ms);
}
.ft:not(.is-in) .ft-letter { opacity: 0; }
@keyframes ft-letter {
  from { opacity: 0; transform: translateY(85%) rotate(6deg); }
  to { opacity: 1; transform: translateY(0) rotate(0); }
}
@media (hover: hover) {
  .ft .ft-letter:hover {
    color: var(--ft-accent);
    -webkit-text-stroke-color: var(--ft-accent);
    transform: translateY(-0.07em) rotate(-4deg);
  }
}

/* ---------- responsive ---------- */
@media (max-width: 960px) {
  .ft { padding-top: 80px; }
  .ft .ft-grid { grid-template-columns: 1fr 1fr; gap: 46px 36px; }
  .ft .ft-col-brand { grid-column: 1 / -1; }
  .ft .ft-tag { max-width: 420px; }
}
@media (max-width: 560px) {
  .ft .ft-grid { grid-template-columns: 1fr; gap: 42px; }
  .ft .ft-bar { flex-direction: column-reverse; align-items: flex-start; margin-top: 60px; }
  .ft .ft-board { transform: rotate(0.8deg); }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .ft *, .ft *::before, .ft *::after {
    animation: none !important;
    transition: none !important;
  }
  .ft .ft-rise, .ft .ft-letter { opacity: 1 !important; }
  .ft .ft-steam { opacity: 0.7; }
}
`;

const navLinks = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Book a Table" },
  { to: "/contact", label: "Contact" },
];

function Arrow() {
  return (
    <svg className="ft-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  // Start the reveal animations when the footer scrolls into view
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

  const backToTop = () => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
  };

  const letters = cafe.name.split("");

  return (
    <footer ref={ref} className={`ft${seen ? " is-in" : ""}`}>
      <style>{css}</style>

      <div className="ft-wrap">
        <div className="ft-grid">
          {/* ---------- brand ---------- */}
          <div className="ft-col-brand ft-rise" style={{ "--d": 0 }}>
            <div className="ft-brand-row">
              <svg className="ft-cup" viewBox="0 0 140 124" aria-hidden="true">
                <path className="ft-steam ft-steam-1" d="M50 44 C44 34 56 28 50 18 C47 12 52 8 52 8" />
                <path className="ft-steam ft-steam-2" d="M70 42 C64 32 76 26 70 16 C67 10 72 6 72 6" />
                <path className="ft-steam ft-steam-3" d="M90 44 C84 34 96 28 90 18 C87 12 92 8 92 8" />
                <ellipse className="ft-cup-body" cx="65" cy="113" rx="50" ry="7" />
                <path className="ft-cup-body" d="M100 62 H110 C124 62 124 90 108 90 H98" />
                <path className="ft-cup-body" d="M28 56 H102 V76 C102 97 86 108 65 108 C44 108 28 97 28 76 Z" />
                <ellipse className="ft-cup-coffee" cx="65" cy="56" rx="37" ry="6" />
              </svg>
              <h4 className="ft-name">{cafe.name}</h4>
            </div>
            <p className="ft-tag">{cafe.tagline}</p>
            <span className="ft-scribble">see you at the counter!</span>
          </div>

          {/* ---------- quick links ---------- */}
          <div className="ft-rise" style={{ "--d": 1 }}>
            <h4 className="ft-h">Quick Links</h4>
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.to}>
                  <Link className="ft-link" to={l.to}>
                    <span className="ft-no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ft-txt">{l.label}</span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- opening hours ---------- */}
          <div className="ft-rise" style={{ "--d": 2 }}>
            <div className="ft-board">
              <h4 className="ft-board-title">Opening Hours</h4>
              <ul className="ft-hours">
                {cafe.timings.map((t) => (
                  <li key={t.days}>
                    <span>{t.days}</span>
                    <span className="ft-dots" aria-hidden="true" />
                    <span className="ft-time">{t.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------- socials ---------- */}
          <div className="ft-rise" style={{ "--d": 3 }}>
            <h4 className="ft-h">Follow Us</h4>
            <ul className="ft-socials">
              {cafe.socials.map((s) => (
                <li key={s.label}>
                  <a className="ft-sticker" href={s.url} target="_blank" rel="noreferrer">
                    {s.label}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="ft-bar ft-rise" style={{ "--d": 4 }}>
          <p className="ft-copy">
            © {new Date().getFullYear()} {cafe.name}. All rights reserved.
            <em>brewed with care</em>
          </p>

          <button type="button" className="ft-top" onClick={backToTop}>
            back to top
            <span className="ft-top-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 20V5M6 11l6-6 6 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* ---------- giant wordmark ---------- */}
      <div className="ft-word-clip" style={{ "--len": Math.max(letters.length, 4) }} aria-hidden="true">
        <div className="ft-word">
          {letters.map((ch, i) => (
            <span className="ft-letter" key={i} style={{ "--i": i }}>
              {ch}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}