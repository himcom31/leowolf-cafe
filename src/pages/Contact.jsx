import { useEffect, useRef, useState } from "react";
import { cafe } from "../data/info.js";

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&display=swap");

.ct {
  --ct-bg: #e2602d;
  --ct-deep: #b3411a;
  --ct-ink: #24160f;
  --ct-paper: #fff8ea;
  --ct-cream: #fbe3c2;
  --ct-pen: #2f3f9e;
  --ct-green: #25d366;

  position: relative;
  padding: 110px 0 120px;
  background: var(--ct-bg);
  color: var(--ct-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  overflow: hidden;
}

/* scalloped edge at the bottom */
.ct::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 24px;
  background: radial-gradient(circle at 24px 0, transparent 23px, var(--ct-paper) 24px) 0 0 / 48px 24px repeat-x;
}

/* paper grain + coffee rings */
.ct .ct-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.ct .ct-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.16;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}
.ct .ct-ring {
  position: absolute;
  border: 10px solid rgba(36, 22, 15, 0.1);
  border-radius: 51% 49% 52% 48% / 49% 53% 47% 51%;
}
.ct .ct-ring-a { width: 300px; height: 300px; right: -100px; bottom: -90px; transform: rotate(14deg); }
.ct .ct-ring-b { width: 180px; height: 180px; left: 4%; top: 40px; border-width: 6px; transform: rotate(-20deg); }

.ct .ct-wrap {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------- reveal ---------- */
.ct:not(.is-in) .ct-rise,
.ct:not(.is-in) .ct-slip,
.ct:not(.is-in) .ct-frame,
.ct:not(.is-in) .ct-stamp { opacity: 0; }

.ct.is-in .ct-rise {
  animation: ct-rise 0.85s cubic-bezier(0.2, 0.8, 0.3, 1) backwards;
  animation-delay: calc(var(--d, 0) * 120ms);
}
@keyframes ct-rise {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---------- header ---------- */
.ct .ct-head {
  max-width: 640px;
  margin: 0 0 70px;
}
.ct .ct-kicker {
  display: inline-block;
  margin-bottom: 8px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 32px;
  color: var(--ct-paper);
  transform: rotate(-3deg);
}
.ct .ct-title {
  margin: 0 0 22px;
  font-weight: 800;
  font-size: clamp(2.7rem, 6vw, 4.9rem);
  line-height: 0.98;
  letter-spacing: -2px;
  color: var(--ct-ink);
}
.ct .ct-mark {
  display: inline-block;
  padding: 0 0.14em 0.04em;
  background: var(--ct-paper);
  box-shadow: 5px 5px 0 var(--ct-ink);
  transform: rotate(-2.5deg);
}
.ct .ct-lead {
  max-width: 440px;
  margin: 0;
  font-weight: 500;
  font-size: 19px;
  line-height: 1.6;
  color: rgba(36, 22, 15, 0.86);
}

/* ---------- layout ---------- */
.ct .ct-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 70px;
  align-items: center;
}

/* ---------- info slip ---------- */
.ct .ct-slip {
  --tilt: -1.8deg;
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 72px;
  width: 100%;
  max-width: 540px;
  background: var(--ct-paper);
  border: 2px solid var(--ct-ink);
  border-radius: 18px;
  box-shadow: 9px 11px 0 var(--ct-ink);
  transform: rotate(var(--tilt));
}
.ct.is-in .ct-slip {
  animation: ct-drop 1s cubic-bezier(0.25, 0.9, 0.3, 1.15) 0.2s backwards;
}
@keyframes ct-drop {
  from { opacity: 0; transform: translateY(-70px) rotate(5deg); }
  to { opacity: 1; transform: translateY(0) rotate(var(--tilt)); }
}

/* washi tape */
.ct .ct-tape {
  position: absolute;
  top: -17px;
  left: 50%;
  width: 124px;
  height: 34px;
  margin-left: -62px;
  background: repeating-linear-gradient(135deg, rgba(255, 212, 92, 0.88) 0 9px, rgba(255, 228, 140, 0.88) 9px 18px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transform: rotate(3deg);
}

.ct .ct-main { padding: 42px 30px 30px 34px; }

.ct .ct-label {
  display: block;
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(36, 22, 15, 0.55);
}

.ct .ct-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 2px dashed rgba(36, 22, 15, 0.22);
}
.ct .ct-item:first-of-type { padding-top: 0; }
.ct .ct-item:last-of-type { border-bottom: 0; }

.ct .ct-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 46px;
  height: 46px;
  border: 2px solid var(--ct-ink);
  border-radius: 50%;
  background: var(--ct-cream);
  box-shadow: 0 3px 0 var(--ct-ink);
}
.ct .ct-icon svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: var(--ct-ink);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ct .ct-value {
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.45;
  color: var(--ct-ink);
}
.ct .ct-value a {
  color: inherit;
  text-decoration: underline wavy var(--ct-bg);
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
  word-break: break-word;
  transition: color 0.2s ease;
}
@media (hover: hover) {
  .ct .ct-value a:hover { color: var(--ct-pen); }
}

.ct .ct-time {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
  margin: 0 0 2px;
  font-weight: 700;
  font-size: 17px;
  line-height: 1.4;
}
.ct .ct-time-note {
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 25px;
  line-height: 1;
  color: var(--ct-pen);
}

/* action buttons */
.ct .ct-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 22px;
}
.ct .ct-go {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 22px 8px 8px;
  border-radius: 999px;
  background: var(--ct-ink);
  color: var(--ct-paper);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 17px;
  text-decoration: none;
  box-shadow: 0 5px 0 var(--ct-deep);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.ct .ct-go:active { transform: translateY(4px); box-shadow: 0 1px 0 var(--ct-deep); }
.ct .ct-go-icon {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--ct-green);
}
.ct .ct-go-icon.alt { background: var(--ct-cream); }
.ct .ct-go-icon::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid var(--ct-green);
  border-radius: 50%;
  animation: ct-ping 2.4s ease-out infinite;
}
.ct .ct-go-icon.alt::after { border-color: var(--ct-cream); }
@keyframes ct-ping {
  0% { transform: scale(1); opacity: 0.8; }
  80%, 100% { transform: scale(1.7); opacity: 0; }
}
.ct .ct-go-icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #fff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ct .ct-go-icon.alt svg { stroke: var(--ct-ink); }
@media (hover: hover) {
  .ct .ct-go:hover { transform: translateY(-2px); box-shadow: 0 7px 0 var(--ct-deep); }
}

.ct a:focus-visible {
  outline: 3px solid var(--ct-pen);
  outline-offset: 3px;
}

/* torn-off stub */
.ct .ct-stub {
  position: relative;
  display: grid;
  place-items: center;
  border-left: 2px dashed var(--ct-ink);
  background: var(--ct-cream);
  border-radius: 0 16px 16px 0;
}
.ct .ct-stub::before {
  content: "\\2702\\FE0E";
  position: absolute;
  top: 14px;
  left: -13px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--ct-paper);
  font-size: 17px;
  line-height: 1;
  color: var(--ct-ink);
}
.ct .ct-stub span {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(36, 22, 15, 0.7);
  white-space: nowrap;
}

/* ---------- map frame ---------- */
.ct .ct-frame {
  --tilt: 2deg;
  position: relative;
  justify-self: end;
  width: 100%;
  max-width: 520px;
  padding: 16px 16px 20px;
  background: var(--ct-paper);
  border: 2px solid var(--ct-ink);
  border-radius: 18px;
  box-shadow: 9px 11px 0 var(--ct-ink);
  transform: rotate(var(--tilt));
}
.ct.is-in .ct-frame {
  animation: ct-drop-b 1s cubic-bezier(0.25, 0.9, 0.3, 1.15) 0.4s backwards;
}
@keyframes ct-drop-b {
  from { opacity: 0; transform: translateY(-70px) rotate(-6deg); }
  to { opacity: 1; transform: translateY(0) rotate(var(--tilt)); }
}
.ct .ct-frame .ct-tape { transform: rotate(-4deg); }

.ct .ct-map {
  display: block;
  width: 100%;
  height: 400px;
  border: 2px solid var(--ct-ink);
  border-radius: 12px;
  background: var(--ct-cream);
}
.ct .ct-caption {
  margin: 12px 0 0;
  text-align: center;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 26px;
  line-height: 1;
  color: var(--ct-pen);
}

/* rubber stamp */
.ct .ct-stamp {
  position: absolute;
  right: -26px;
  top: -44px;
  display: grid;
  place-items: center;
  width: 104px;
  height: 104px;
  border: 3px solid var(--ct-deep);
  border-radius: 50%;
  outline: 2px solid var(--ct-deep);
  outline-offset: -9px;
  color: var(--ct-deep);
  font-weight: 800;
  font-size: 15px;
  line-height: 1.05;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  mix-blend-mode: multiply;
  transform: rotate(14deg);
  pointer-events: none;
}
.ct.is-in .ct-stamp { animation: ct-stamp 0.5s cubic-bezier(0.3, 1.2, 0.5, 1) 1.2s backwards; }
@keyframes ct-stamp {
  0% { opacity: 0; transform: rotate(30deg) scale(2.1); }
  65% { opacity: 1; transform: rotate(12deg) scale(0.92); }
  100% { opacity: 1; transform: rotate(14deg) scale(1); }
}

/* ---------- responsive ---------- */
@media (max-width: 900px) {
  .ct { padding: 90px 0 100px; }
  .ct .ct-head { margin-bottom: 56px; }
  .ct .ct-grid { grid-template-columns: minmax(0, 1fr); gap: 72px; }
  .ct .ct-slip { justify-self: center; --tilt: -1deg; }
  .ct .ct-frame { justify-self: center; --tilt: 1.2deg; }
  .ct .ct-map { height: 340px; }
}
@media (max-width: 520px) {
  .ct .ct-slip { grid-template-columns: minmax(0, 1fr); box-shadow: 6px 8px 0 var(--ct-ink); }
  .ct .ct-stub { display: none; }
  .ct .ct-main { padding: 38px 22px 26px; }
  .ct .ct-frame { box-shadow: 6px 8px 0 var(--ct-ink); padding: 12px 12px 16px; }
  .ct .ct-map { height: 280px; }
  .ct .ct-stamp { right: -8px; top: -46px; width: 88px; height: 88px; font-size: 13px; }
  .ct .ct-value { font-size: 17px; }
  .ct .ct-go { font-size: 16px; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .ct *, .ct *::before, .ct *::after {
    animation: none !important;
    transition: none !important;
  }
}
`;

function Icon({ name }) {
  switch (name) {
    case "pin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Contact() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  // Reveal animations once the section scrolls into view
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
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(cafe.mapQuery)}&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.mapQuery)}`;
  const phoneHref = `tel:${String(cafe.phone).replace(/\s/g, "")}`;
  const timings = Array.isArray(cafe.timings) ? cafe.timings : [];

  return (
    <section ref={ref} className={`ct${seen ? " is-in" : ""}`} aria-labelledby="ct-title">
      <style>{css}</style>

      <div className="ct-bg" aria-hidden="true">
        <span className="ct-ring ct-ring-a" />
        <span className="ct-ring ct-ring-b" />
      </div>

      <div className="ct-wrap">
        {/* ---------- header ---------- */}
        <header className="ct-head">
          <span className="ct-kicker ct-rise" style={{ "--d": 0 }}>
            a question? or an order?
          </span>

          <h1 id="ct-title" className="ct-title ct-rise" style={{ "--d": 1 }}>
            Say <span className="ct-mark">hello.</span>
            <br />
            We're all ears.
          </h1>

          <p className="ct-lead ct-rise" style={{ "--d": 2 }}>
            Call us, drop us an email, or just walk in. Everything you need to find us is right here.
          </p>
        </header>

        <div className="ct-grid">
          {/* ---------- left: contact slip ---------- */}
          <div className="ct-slip">
            <span className="ct-tape" aria-hidden="true" />

            <div className="ct-main">
              <div className="ct-item">
                <span className="ct-icon"><Icon name="pin" /></span>
                <div>
                  <span className="ct-label">Address</span>
                  <p className="ct-value">{cafe.address}</p>
                </div>
              </div>

              <div className="ct-item">
                <span className="ct-icon"><Icon name="phone" /></span>
                <div>
                  <span className="ct-label">Phone</span>
                  <p className="ct-value">
                    <a href={phoneHref}>{cafe.phone}</a>
                  </p>
                </div>
              </div>

              <div className="ct-item">
                <span className="ct-icon"><Icon name="mail" /></span>
                <div>
                  <span className="ct-label">Email</span>
                  <p className="ct-value">
                    <a href={`mailto:${cafe.email}`}>{cafe.email}</a>
                  </p>
                </div>
              </div>

              <div className="ct-item">
                <span className="ct-icon"><Icon name="clock" /></span>
                <div>
                  <span className="ct-label">Timings</span>
                  {timings.map((t) => (
                    <p className="ct-time" key={t.days}>
                      <span>{t.days}</span>
                      <span className="ct-time-note">{t.time}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="ct-actions">
                <a className="ct-go" href={phoneHref}>
                  <span className="ct-go-icon" aria-hidden="true">
                    <Icon name="phone" />
                  </span>
                  <span>Call us</span>
                </a>
                <a
                  className="ct-go"
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ct-go-icon alt" aria-hidden="true">
                    <Icon name="pin" />
                  </span>
                  <span>Get directions</span>
                </a>
              </div>
            </div>

            <div className="ct-stub" aria-hidden="true">
              <span>Contact &middot; No. 7</span>
            </div>
          </div>

          {/* ---------- right: map ---------- */}
          <div className="ct-frame">
            <span className="ct-tape" aria-hidden="true" />
            <span className="ct-stamp" aria-hidden="true">
              Come
              <br />
              by!
            </span>

            <iframe
              className="ct-map"
              title="Cafe location"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="ct-caption" aria-hidden="true">
              the coffee's always hot
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}