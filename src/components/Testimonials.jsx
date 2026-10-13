import { useState } from "react";

const css = `
@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500&family=DM+Sans:wght@400;500;600&display=swap");

.tst {
  --tst-bg: #16100c;
  --tst-text: #f4e9da;
  --tst-accent: #f0a15f;
  --tst-line: rgba(244, 233, 218, 0.12);

  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 120px 0;
  background: var(--tst-bg);
  color: var(--tst-text);
  font-family: "DM Sans", sans-serif;
}

/* warm glow + grain */
.tst::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(circle at 88% 8%, rgba(226, 96, 45, 0.22), transparent 42%),
    radial-gradient(circle at 4% 92%, rgba(184, 119, 74, 0.2), transparent 40%);
}
.tst::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.08;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
}

.tst .tst-wrap {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
}

.tst .tst-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.25fr);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "head stage"
    "tabs stage";
  column-gap: 76px;
  row-gap: 44px;
}
.tst .tst-head { grid-area: head; }
.tst .tst-tabs { grid-area: tabs; align-self: start; }
.tst .tst-stage { grid-area: stage; align-self: center; }

/* ---------- left: heading ---------- */
.tst .tst-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 22px;
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--tst-accent);
}
.tst .tst-eyebrow::before {
  content: "";
  width: 38px;
  height: 1.5px;
  background: var(--tst-accent);
}

.tst .tst-title {
  margin: 0 0 18px;
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: clamp(2.4rem, 4.8vw, 3.6rem);
  line-height: 1.05;
  letter-spacing: -1.2px;
  color: var(--tst-text);
}
.tst .tst-title em {
  font-style: italic;
  font-weight: 400;
  color: var(--tst-accent);
}

.tst .tst-sub {
  margin: 0;
  max-width: 340px;
  font-family: "DM Sans", sans-serif;
  font-size: 17px;
  line-height: 1.65;
  color: rgba(244, 233, 218, 0.62);
}

.tst .tst-score {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin-top: 34px;
}
.tst .tst-score-num {
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: 76px;
  line-height: 0.85;
  letter-spacing: -2px;
}
.tst .tst-score-meta {
  padding-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(244, 233, 218, 0.6);
}
.tst .tst-score-meta b {
  display: block;
  font-weight: 600;
  color: var(--tst-text);
}

/* ---------- left: reviewer tabs ---------- */
.tst .tst-tabs {
  border-bottom: 1px solid var(--tst-line);
}
.tst .tst-tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin: 0;
  padding: 18px 6px 20px;
  background: none;
  border: 0;
  border-top: 1px solid var(--tst-line);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease, padding-left 0.35s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.tst .tst-tab.on { opacity: 1; }
.tst .tst-tab:focus-visible,
.tst .tst-arrow:focus-visible {
  outline: 2px solid var(--tst-accent);
  outline-offset: 3px;
}
@media (hover: hover) {
  .tst .tst-tab:hover { opacity: 1; padding-left: 16px; }
}

.tst .tst-avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--a), var(--b));
  color: #1a120d;
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  font-size: 15px;
}
.tst .tst-tab-name {
  display: block;
  font-family: "Fraunces", serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
}
.tst .tst-tab-stars {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--tst-accent);
}

.tst .tst-bar {
  position: absolute;
  left: 0;
  right: 0;
  top: -1px;
  height: 2px;
  overflow: hidden;
}
.tst .tst-fill {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--tst-accent);
  transform-origin: left;
  animation: tst-fill 7s linear forwards;
}
.tst.is-paused .tst-fill { animation-play-state: paused; }

@keyframes tst-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* ---------- right: big quote card ---------- */
.tst .tst-stage {
  position: relative;
  min-height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 58px 56px 46px;
  overflow: hidden;
  border: 1px solid var(--tst-line);
  border-radius: 32px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.015));
}

.tst .tst-mark {
  position: absolute;
  top: 10px;
  left: 30px;
  font-family: "Fraunces", serif;
  font-size: 240px;
  line-height: 1;
  color: var(--tst-accent);
  opacity: 0.14;
  pointer-events: none;
  user-select: none;
}

/* coffee cup ring stain */
.tst .tst-ring {
  position: absolute;
  right: -44px;
  bottom: -50px;
  width: 190px;
  height: 190px;
  border: 8px solid rgba(184, 119, 74, 0.17);
  border-radius: 52% 48% 50% 50% / 50% 53% 47% 50%;
  box-shadow: 0 0 0 2px rgba(184, 119, 74, 0.07), inset 0 0 0 2px rgba(184, 119, 74, 0.08);
  transform: rotate(18deg);
  pointer-events: none;
}

.tst .tst-slide {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 30px;
}

.tst .tst-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: tst-up 0.6s ease backwards;
}
.tst .tst-stars { display: flex; gap: 5px; }
.tst .tst-star {
  width: 22px;
  height: 22px;
  fill: transparent;
  stroke: rgba(244, 233, 218, 0.3);
  stroke-width: 1.6;
  stroke-linejoin: round;
}
.tst .tst-star.on {
  fill: var(--tst-accent);
  stroke: var(--tst-accent);
  animation: tst-star 0.55s calc(var(--s) * 90ms + 200ms) cubic-bezier(0.3, 1.7, 0.5, 1) backwards;
}
.tst .tst-count {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 18px;
  color: rgba(244, 233, 218, 0.5);
}

.tst .tst-quote {
  margin: 0;
  font-family: "Fraunces", serif;
  font-weight: 400;
  font-size: clamp(1.45rem, 2.4vw, 2.05rem);
  line-height: 1.38;
  letter-spacing: -0.4px;
  color: var(--tst-text);
}
.tst .tst-word {
  display: inline-block;
  animation: tst-word 0.65s cubic-bezier(0.2, 0.8, 0.3, 1) backwards;
  animation-delay: calc(var(--w) * 28ms + 120ms);
}

.tst .tst-by {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: auto;
  animation: tst-up 0.6s 0.45s ease backwards;
}
.tst .tst-by-name {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(244, 233, 218, 0.85);
}
.tst .tst-by-name::before {
  content: "";
  display: inline-block;
  width: 26px;
  height: 1.5px;
  margin-right: 12px;
  vertical-align: middle;
  background: var(--tst-accent);
}

.tst .tst-ctrl {
  position: absolute;
  right: 34px;
  bottom: 36px;
  display: flex;
  gap: 10px;
}
.tst .tst-arrow {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  padding: 0;
  border: 1px solid rgba(244, 233, 218, 0.28);
  border-radius: 50%;
  background: transparent;
  color: var(--tst-text);
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.tst .tst-arrow svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
@media (hover: hover) {
  .tst .tst-arrow:hover {
    background: var(--tst-accent);
    border-color: var(--tst-accent);
    color: #1a120d;
    transform: scale(1.1);
  }
}

@keyframes tst-word {
  from { opacity: 0; transform: translateY(0.55em); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes tst-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes tst-star {
  from { opacity: 0; transform: scale(0) rotate(-50deg); }
  to { opacity: 1; transform: scale(1) rotate(0); }
}

/* ---------- responsive ---------- */
@media (max-width: 900px) {
  .tst { padding: 80px 0; }
  .tst .tst-grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "head"
      "stage"
      "tabs";
    row-gap: 36px;
  }
  .tst .tst-stage { min-height: 0; padding: 46px 26px 96px; }
  .tst .tst-mark { font-size: 170px; left: 14px; }
  .tst .tst-ctrl { right: 22px; bottom: 24px; }
  .tst .tst-by { margin-top: 10px; }
  .tst .tst-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    border-bottom: 0;
  }
  .tst .tst-tab {
    flex-direction: column;
    gap: 10px;
    padding: 16px 4px;
    text-align: center;
  }
  .tst .tst-tab:hover { padding-left: 4px; }
  .tst .tst-tab-name { font-size: 15px; }
  .tst .tst-tab-stars { display: none; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .tst *, .tst *::before, .tst *::after {
    animation: none !important;
    transition: none !important;
  }
}
`;

const reviews = [
  { name: "Aarav S.", text: "Best cappuccino in town and the ambience is so cozy. Perfect place to work or catch up with friends!", rating: 5 },
  { name: "Neha K.", text: "The brownie is out of this world. Staff is super friendly and service is quick.", rating: 5 },
  { name: "Rohit M.", text: "Masala chai and sandwich combo is my daily go-to. Great value for money.", rating: 4 },
];

const tones = [
  ["#f0a15f", "#e2602d"],
  ["#f2d27a", "#d79a2b"],
  ["#a9d19a", "#5f9558"],
];

const initials = (name) =>
  name
    .replace(".", "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

const pad = (n) => String(n).padStart(2, "0");

function Star({ on, i }) {
  return (
    <svg className={`tst-star${on ? " on" : ""}`} style={{ "--s": i }} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
    </svg>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = reviews.length;
  const next = () => setActive((a) => (a + 1) % total);
  const prev = () => setActive((a) => (a - 1 + total) % total);

  const r = reviews[active];
  const avg = (reviews.reduce((sum, x) => sum + x.rating, 0) / total).toFixed(1);

  return (
    <section
      className={`tst${paused ? " is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style>{css}</style>

      <div className="tst-wrap">
        <div className="tst-grid">
          <header className="tst-head">
            <p className="tst-eyebrow">Guest book</p>
            <h2 className="tst-title">
              What Our <em>Guests</em> Say
            </h2>
            <p className="tst-sub">Words from people who love our cafe</p>

            <div className="tst-score">
              <span className="tst-score-num">{avg}</span>
              <span className="tst-score-meta">
                <b>out of 5</b>
                from {total} guest reviews
              </span>
            </div>
          </header>

          <div className="tst-tabs" role="tablist" aria-label="Guest reviews">
            {reviews.map((x, i) => (
              <button
                key={x.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="tst-panel"
                className={`tst-tab${i === active ? " on" : ""}`}
                onClick={() => setActive(i)}
              >
                {i === active && (
                  <span className="tst-bar" aria-hidden="true">
                    <span className="tst-fill" onAnimationEnd={next} />
                  </span>
                )}
                <span className="tst-avatar" style={{ "--a": tones[i % tones.length][0], "--b": tones[i % tones.length][1] }}>
                  {initials(x.name)}
                </span>
                <span>
                  <span className="tst-tab-name">{x.name}</span>
                  <span className="tst-tab-stars" aria-hidden="true">
                    {"★".repeat(x.rating)}
                    {"☆".repeat(5 - x.rating)}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="tst-stage" id="tst-panel" role="tabpanel">
            <span className="tst-mark" aria-hidden="true">“</span>
            <span className="tst-ring" aria-hidden="true" />

            <div className="tst-slide" key={active}>
              <div className="tst-top">
                <div className="tst-stars" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} i={i} on={i < r.rating} />
                  ))}
                </div>
                <span className="tst-count">
                  {pad(active + 1)} / {pad(total)}
                </span>
              </div>

              <p className="tst-quote">
                {r.text.split(" ").map((w, i) => (
                  <span key={i}>
                    <span className="tst-word" style={{ "--w": i }}>
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </p>

              <div className="tst-by">
                <span className="tst-by-name">{r.name}</span>
              </div>
            </div>

            <div className="tst-ctrl">
              <button type="button" className="tst-arrow" onClick={prev} aria-label="Previous review">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <button type="button" className="tst-arrow" onClick={next} aria-label="Next review">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}