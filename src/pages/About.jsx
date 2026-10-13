import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cafe } from "../data/info.js";

/* ---------- Team ----------
   `img`: to use a photo, write its path here, e.g. "/team/rahul.webp"
          (keep the file in public/team/). If null, an initials monogram is shown.
------------------------------------------------ */
const team = [
  { name: "Rahul Verma", role: "Head Barista", note: "the coffee wizard", img: null },
  { name: "Priya Singh", role: "Pastry Chef", note: "sweet things are her thing", img: null },
  { name: "Amit Kumar", role: "Cafe Manager", note: "keeps it all running", img: null },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&display=swap");

.ab {
  --ab-bg: #e2602d;
  --ab-deep: #b3411a;
  --ab-ink: #24160f;
  --ab-paper: #fff8ea;
  --ab-cream: #fbe3c2;
  --ab-pen: #2f3f9e;
  --ab-soft: #f0a15f;

  font-family: "Bricolage Grotesque", sans-serif;
  color: var(--ab-ink);
  background: #ffffff;
  overflow-x: hidden;
}
.ab * { box-sizing: border-box; }
.ab .ab-wrap { position: relative; max-width: 1120px; margin: 0 auto; padding: 0 20px; }

/* grain + rings (orange sections) */
.ab .ab-grain {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.ab .ab-grain::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.16;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}
.ab .ab-ring {
  position: absolute;
  border: 10px solid rgba(36, 22, 15, 0.1);
  border-radius: 51% 49% 52% 48% / 49% 53% 47% 51%;
}
.ab .ab-ring-a { width: 300px; height: 300px; left: -100px; bottom: -120px; transform: rotate(14deg); }
.ab .ab-ring-b { width: 180px; height: 180px; right: 7%; top: 50px; border-width: 6px; transform: rotate(-20deg); }

/* reveal */
.ab .ab-sec:not(.is-in) .ab-rise { opacity: 0; }
.ab .ab-sec.is-in .ab-rise {
  animation: ab-rise 0.85s cubic-bezier(0.2, 0.8, 0.3, 1) backwards;
  animation-delay: calc(var(--d, 0) * 130ms);
}
@keyframes ab-rise {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ================= HERO ================= */
.ab .ab-hero {
  position: relative;
  padding: 120px 0 100px;
  background: var(--ab-bg);
  z-index: 1;
}
/* scalloped awning edge at the bottom */
.ab .ab-hero::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -23px;
  height: 24px;
  background: radial-gradient(circle at 24px 0, var(--ab-bg) 23px, transparent 24px) 0 0 / 48px 24px repeat-x;
}
.ab .ab-hero .ab-wrap { animation: ab-rise 0.9s cubic-bezier(0.2, 0.8, 0.3, 1) backwards; }

.ab .ab-kicker {
  display: inline-block;
  margin-bottom: 6px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 32px;
  color: var(--ab-paper);
  transform: rotate(-3deg);
}
.ab .ab-h1 {
  margin: 0 0 18px;
  font-weight: 800;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.96;
  letter-spacing: -2.5px;
  color: var(--ab-ink);
}
.ab .ab-mark {
  display: inline-block;
  padding: 0 0.14em 0.04em;
  background: var(--ab-paper);
  box-shadow: 6px 6px 0 var(--ab-ink);
  transform: rotate(-2.5deg);
}
.ab .ab-lead {
  margin: 0;
  max-width: 440px;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.55;
  color: rgba(36, 22, 15, 0.86);
}

/* ================= STORY ================= */
.ab .ab-story { padding: 130px 0 90px; }
.ab .ab-two {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 80px;
  align-items: center;
}

/* framed cup picture */
.ab .ab-frame {
  position: relative;
  max-width: 400px;
  padding: 26px 26px 22px;
  background: var(--ab-paper);
  border: 2px solid var(--ab-ink);
  border-radius: 18px;
  box-shadow: 9px 11px 0 var(--ab-ink);
  transform: rotate(-2.4deg);
}
.ab .ab-tape {
  position: absolute;
  top: -17px;
  left: 50%;
  width: 124px;
  height: 34px;
  margin-left: -62px;
  background: repeating-linear-gradient(135deg, rgba(255, 212, 92, 0.9) 0 9px, rgba(255, 228, 140, 0.9) 9px 18px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transform: rotate(3deg);
}
.ab .ab-frame-art {
  display: grid;
  place-items: center;
  padding: 18px 0 8px;
  border-radius: 10px;
  background: var(--ab-cream);
  border: 2px solid var(--ab-ink);
}
.ab .ab-cup { width: 78%; overflow: visible; }
.ab .ab-cup-body { fill: var(--ab-paper); stroke: var(--ab-ink); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
.ab .ab-cup-coffee { fill: #5a331c; stroke: var(--ab-ink); stroke-width: 3; }
.ab .ab-steam {
  fill: none;
  stroke: var(--ab-ink);
  stroke-width: 4;
  stroke-linecap: round;
  opacity: 0;
  animation: ab-steam 3.2s ease-in-out infinite;
}
.ab .ab-steam-2 { animation-delay: 0.9s; }
.ab .ab-steam-3 { animation-delay: 1.8s; }
@keyframes ab-steam {
  0% { opacity: 0; transform: translateY(8px); }
  35% { opacity: 0.8; }
  100% { opacity: 0; transform: translateY(-16px); }
}
.ab .ab-caption {
  margin: 14px 0 0;
  text-align: center;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 27px;
  line-height: 1;
  color: var(--ab-pen);
}
.ab .ab-stamp {
  position: absolute;
  right: -34px;
  bottom: 52px;
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
  border: 3px solid var(--ab-deep);
  border-radius: 50%;
  outline: 2px solid var(--ab-deep);
  outline-offset: -9px;
  color: var(--ab-deep);
  font-weight: 800;
  font-size: 14px;
  line-height: 1.05;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  mix-blend-mode: multiply;
  transform: rotate(14deg);
}

/* story text */
.ab .ab-h2 {
  margin: 0 0 24px;
  font-weight: 800;
  font-size: clamp(2.1rem, 4.4vw, 3.4rem);
  line-height: 1;
  letter-spacing: -1.3px;
}
.ab .ab-h2 .ab-mark { box-shadow: 4px 4px 0 var(--ab-ink); border: 2px solid var(--ab-ink); }
.ab .ab-p {
  margin: 0 0 18px;
  max-width: 500px;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.7;
  color: rgba(36, 22, 15, 0.8);
}
.ab .ab-scribble {
  display: inline-block;
  margin-top: 6px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.1;
  color: var(--ab-bg);
  transform: rotate(-3deg);
}

/* ================= TEAM ================= */
.ab .ab-team {
  position: relative;
  padding: 100px 0 120px;
  background: var(--ab-paper);
  border-top: 2px solid var(--ab-ink);
  border-bottom: 2px solid var(--ab-ink);
}
.ab .ab-team-head { margin-bottom: 80px; }
.ab .ab-team-head .ab-kicker { color: var(--ab-bg); }
.ab .ab-team-head .ab-h2 { margin: 0; }
.ab .ab-team-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 50px 40px;
  align-items: start;
}

.ab .ab-polaroid {
  --tilt: -2.4deg;
  position: relative;
  padding: 16px 16px 22px;
  background: #fff;
  border: 2px solid var(--ab-ink);
  border-radius: 6px;
  box-shadow: 7px 9px 0 var(--ab-ink);
  transform: rotate(var(--tilt));
  transition: transform 0.4s cubic-bezier(0.3, 1.6, 0.5, 1), box-shadow 0.3s ease;
}
.ab .ab-polaroid:nth-child(2) { --tilt: 1.8deg; margin-top: 44px; }
.ab .ab-polaroid:nth-child(3) { --tilt: -1deg; margin-top: 12px; }
.ab .ab-polaroid::before {
  content: "";
  position: absolute;
  top: -15px;
  left: 50%;
  width: 92px;
  height: 28px;
  margin-left: -46px;
  background: repeating-linear-gradient(135deg, rgba(226, 96, 45, 0.6) 0 8px, rgba(240, 161, 95, 0.6) 8px 16px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transform: rotate(-4deg);
}
.ab .ab-polaroid:nth-child(2)::before {
  background: repeating-linear-gradient(135deg, rgba(255, 212, 92, 0.9) 0 8px, rgba(255, 228, 140, 0.9) 8px 16px);
  transform: rotate(5deg);
}
@media (hover: hover) {
  .ab .ab-polaroid:hover { transform: rotate(0deg) translateY(-8px); box-shadow: 9px 14px 0 var(--ab-ink); }
}

.ab .ab-photo {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: 2px solid var(--ab-ink);
  background: var(--ab-soft);
}
.ab .ab-polaroid:nth-child(2) .ab-photo { background: #f2d27a; }
.ab .ab-polaroid:nth-child(3) .ab-photo { background: #a9d19a; }
.ab .ab-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ab .ab-mono {
  font-weight: 800;
  font-size: clamp(4rem, 9vw, 6.4rem);
  line-height: 1;
  letter-spacing: -4px;
  color: var(--ab-ink);
  transform: rotate(-5deg);
}
.ab .ab-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.18;
  mix-blend-mode: multiply;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}

.ab .ab-name {
  margin: 18px 0 2px;
  font-weight: 800;
  font-size: 24px;
  line-height: 1.1;
  letter-spacing: -0.6px;
}
.ab .ab-role {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(36, 22, 15, 0.55);
}
.ab .ab-note {
  margin: 10px 0 0;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 25px;
  line-height: 1;
  color: var(--ab-pen);
  transform: rotate(-2deg);
  transform-origin: left center;
}

/* ================= CTA ================= */
.ab .ab-cta {
  position: relative;
  padding: 110px 0 100px;
  background: var(--ab-bg);
}
.ab .ab-cta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}
.ab .ab-cta-title {
  margin: 0;
  font-weight: 800;
  font-size: clamp(2.3rem, 5.4vw, 4.2rem);
  line-height: 0.98;
  letter-spacing: -1.6px;
  color: var(--ab-ink);
}
.ab .ab-cta-aside {
  display: block;
  margin-top: 14px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 30px;
  color: var(--ab-paper);
  transform: rotate(-3deg);
  transform-origin: left center;
}
.ab .ab-go {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  flex: none;
  padding: 9px 12px 9px 28px;
  border-radius: 999px;
  background: var(--ab-ink);
  color: var(--ab-paper);
  font-weight: 700;
  font-size: 19px;
  text-decoration: none;
  box-shadow: 0 6px 0 var(--ab-deep);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.ab .ab-go:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--ab-deep); }
.ab .ab-go-circle {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--ab-paper);
  color: var(--ab-ink);
}
.ab .ab-go-circle svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1);
}
@media (hover: hover) {
  .ab .ab-go:hover { transform: translateY(-2px); box-shadow: 0 8px 0 var(--ab-deep); }
  .ab .ab-go:hover .ab-go-circle svg { transform: translateX(5px); }
}
.ab .ab-go:focus-visible { outline: 3px solid var(--ab-pen); outline-offset: 3px; }

/* ================= RESPONSIVE ================= */
@media (max-width: 900px) {
  .ab .ab-hero { padding: 96px 0 84px; }
  .ab .ab-story { padding: 100px 0 70px; }
  .ab .ab-two { grid-template-columns: minmax(0, 1fr); gap: 64px; }
  .ab .ab-frame { margin: 0 auto; }
  .ab .ab-team-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px 28px; }
  .ab .ab-polaroid:nth-child(3) { margin-top: 0; }
}
@media (max-width: 600px) {
  .ab .ab-hero { padding: 84px 0 76px; }
  .ab .ab-kicker { font-size: 27px; }
  .ab .ab-lead { font-size: 18px; }
  .ab .ab-mark { box-shadow: 4px 4px 0 var(--ab-ink); }
  .ab .ab-frame { box-shadow: 6px 8px 0 var(--ab-ink); padding: 22px 20px 18px; }
  .ab .ab-stamp { right: -10px; bottom: 56px; width: 84px; height: 84px; font-size: 12px; }
  .ab .ab-p { font-size: 17px; }
  .ab .ab-team { padding: 80px 0 90px; }
  .ab .ab-team-head { margin-bottom: 64px; }
  .ab .ab-team-grid { grid-template-columns: minmax(0, 1fr); gap: 60px; max-width: 340px; margin: 0 auto; }
  .ab .ab-polaroid:nth-child(2) { margin-top: 0; }
  .ab .ab-cta { padding: 80px 0 76px; }
  .ab .ab-cta-row { flex-direction: column; align-items: flex-start; gap: 36px; }
}

/* ================= REDUCED MOTION ================= */
@media (prefers-reduced-motion: reduce) {
  .ab *, .ab *::before, .ab *::after {
    animation: none !important;
    transition: none !important;
  }
  .ab .ab-rise { opacity: 1 !important; }
  .ab .ab-steam { opacity: 0.7; }
}
`;

/* start the reveal animation when a section scrolls into view */
function useSeen(threshold = 0.15) {
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
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen];
}

export default function About() {
  const [storyRef, storySeen] = useSeen(0.2);
  const [teamRef, teamSeen] = useSeen(0.12);
  const [ctaRef, ctaSeen] = useSeen(0.3);

  return (
    <div className="ab">
      <style>{css}</style>

      {/* ---------- hero ---------- */}
      <header className="ab-hero">
        <div className="ab-grain" aria-hidden="true">
          <span className="ab-ring ab-ring-a" />
          <span className="ab-ring ab-ring-b" />
        </div>
        <div className="ab-wrap">
          <span className="ab-kicker">first, a little introduction</span>
          <h1 className="ab-h1">
            About <span className="ab-mark">Us</span>
          </h1>
          <p className="ab-lead">Our story and our team.</p>
        </div>
      </header>

      {/* ---------- story ---------- */}
      <section ref={storyRef} className={`ab-sec ab-story${storySeen ? " is-in" : ""}`}>
        <div className="ab-wrap">
          <div className="ab-two">
            <div className="ab-frame ab-rise" style={{ "--d": 0 }}>
              <span className="ab-tape" aria-hidden="true" />
              <span className="ab-stamp" aria-hidden="true">
                Fresh
                <br />
                every day
              </span>
              <div className="ab-frame-art" aria-hidden="true">
                <svg className="ab-cup" viewBox="0 0 140 124">
                  <path className="ab-steam ab-steam-1" d="M50 44 C44 34 56 28 50 18 C47 12 52 8 52 8" />
                  <path className="ab-steam ab-steam-2" d="M70 42 C64 32 76 26 70 16 C67 10 72 6 72 6" />
                  <path className="ab-steam ab-steam-3" d="M90 44 C84 34 96 28 90 18 C87 12 92 8 92 8" />
                  <ellipse className="ab-cup-body" cx="65" cy="113" rx="50" ry="7" />
                  <path className="ab-cup-body" d="M100 62 H110 C124 62 124 90 108 90 H98" />
                  <path className="ab-cup-body" d="M28 56 H102 V76 C102 97 86 108 65 108 C44 108 28 97 28 76 Z" />
                  <ellipse className="ab-cup-coffee" cx="65" cy="56" rx="37" ry="6" />
                </svg>
              </div>
              <p className="ab-caption">one cup, one story</p>
            </div>

            <div>
              <h2 className="ab-h2 ab-rise" style={{ "--d": 1 }}>
                Welcome to <span className="ab-mark">{cafe.name}</span>
              </h2>
              <p className="ab-p ab-rise" style={{ "--d": 2 }}>
                {cafe.name} is a place where every cup starts a new story.
                We opened this cafe with one idea: people should be able to sit back and enjoy good coffee
                and spend time with the people they love.
              </p>
              <p className="ab-p ab-rise" style={{ "--d": 3 }}>
                We use premium beans, make everything fresh, and try to make every guest feel at
                home.
              </p>
              <span className="ab-scribble ab-rise" style={{ "--d": 4 }}>
                just show up, we'll handle the rest.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- team ---------- */}
      <section ref={teamRef} className={`ab-sec ab-team${teamSeen ? " is-in" : ""}`}>
        <div className="ab-wrap">
          <div className="ab-team-head">
            <span className="ab-kicker ab-rise" style={{ "--d": 0 }}>
              counter ke peeche kaun hai?
            </span>
            <h2 className="ab-h2 ab-rise" style={{ "--d": 1 }}>
              Meet Our <span className="ab-mark">Team</span>
            </h2>
          </div>

          <div className="ab-team-grid">
            {team.map((t, i) => (
              <article className="ab-polaroid ab-rise" key={t.name} style={{ "--d": i + 2 }}>
                <div className="ab-photo">
                  {t.img ? (
                    <img src={t.img} alt={t.name} loading="lazy" />
                  ) : (
                    <span className="ab-mono" aria-hidden="true">
                      {initials(t.name)}
                    </span>
                  )}
                </div>
                <h3 className="ab-name">{t.name}</h3>
                <p className="ab-role">{t.role}</p>
                <p className="ab-note">{t.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section ref={ctaRef} className={`ab-sec ab-cta${ctaSeen ? " is-in" : ""}`}>
        <div className="ab-grain" aria-hidden="true">
          <span className="ab-ring ab-ring-a" />
        </div>
        <div className="ab-wrap">
          <div className="ab-cta-row">
            <div className="ab-rise" style={{ "--d": 0 }}>
              <h2 className="ab-cta-title">Humse milne aaiye</h2>
              <span className="ab-cta-aside">chai-coffee hamari taraf se baat ki.</span>
            </div>
            <Link to="/contact" className="ab-go ab-rise" style={{ "--d": 1 }}>
              Contact Us
              <span className="ab-go-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}