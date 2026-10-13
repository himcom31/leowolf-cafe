import { useEffect, useRef, useState } from "react";

// Replace with your real WhatsApp number: country code + number, no "+", no spaces.
const WHATSAPP_NUMBER = "919876543210";

const MIN_GUESTS = 1;
const MAX_GUESTS = 12;

const WHEN_OPTIONS = [
  { id: "today", label: "Today", phrase: "today" },
  { id: "tomorrow", label: "Tomorrow", phrase: "tomorrow" },
  { id: "weekend", label: "This weekend", phrase: "this weekend" },
];

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&display=swap");

.bk {
  --bk-bg: #e2602d;
  --bk-deep: #b3411a;
  --bk-ink: #24160f;
  --bk-paper: #fff8ea;
  --bk-cream: #fbe3c2;
  --bk-pen: #2f3f9e;
  --bk-green: #25d366;

  position: relative;
  padding: 120px 0 110px;
  background: var(--bk-bg);
  color: var(--bk-ink);
  font-family: "Bricolage Grotesque", sans-serif;
}

/* scalloped awning edge on top */
.bk::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -23px;
  height: 24px;
  background: radial-gradient(circle at 24px 24px, var(--bk-bg) 23px, transparent 24px) 0 0 / 48px 24px repeat-x;
}

/* paper grain + coffee rings */
.bk .bk-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.bk .bk-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.16;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
}
.bk .bk-ring {
  position: absolute;
  border: 10px solid rgba(36, 22, 15, 0.1);
  border-radius: 51% 49% 52% 48% / 49% 53% 47% 51%;
}
.bk .bk-ring-a { width: 300px; height: 300px; left: -90px; bottom: -110px; transform: rotate(14deg); }
.bk .bk-ring-b { width: 180px; height: 180px; right: 6%; top: 60px; border-width: 6px; transform: rotate(-20deg); }

.bk .bk-wrap {
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
}
.bk .bk-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 70px;
  align-items: center;
}

/* ---------- reveal ---------- */
.bk:not(.is-in) .bk-rise,
.bk:not(.is-in) .bk-slip,
.bk:not(.is-in) .bk-stamp { opacity: 0; }

.bk.is-in .bk-rise {
  animation: bk-rise 0.85s cubic-bezier(0.2, 0.8, 0.3, 1) backwards;
  animation-delay: calc(var(--d, 0) * 120ms);
}
@keyframes bk-rise {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---------- left side ---------- */
.bk .bk-kicker {
  display: inline-block;
  margin-bottom: 8px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 32px;
  color: var(--bk-paper);
  transform: rotate(-3deg);
}

.bk .bk-title {
  margin: 0 0 24px;
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: clamp(2.7rem, 6vw, 4.9rem);
  line-height: 0.98;
  letter-spacing: -2px;
  color: var(--bk-ink);
}
.bk .bk-mark {
  display: inline-block;
  padding: 0 0.14em 0.04em;
  background: var(--bk-paper);
  box-shadow: 5px 5px 0 var(--bk-ink);
  transform: rotate(-2.5deg);
}

.bk .bk-text {
  max-width: 440px;
  margin: 0 0 34px;
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 500;
  font-size: 19px;
  line-height: 1.6;
  color: rgba(36, 22, 15, 0.86);
}

.bk .bk-cup-row {
  display: flex;
  align-items: flex-end;
  gap: 18px;
}
.bk .bk-cup { width: 128px; flex: none; overflow: visible; }
.bk .bk-cup-body { fill: var(--bk-paper); stroke: var(--bk-ink); stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
.bk .bk-cup-coffee { fill: #5a331c; stroke: var(--bk-ink); stroke-width: 3; }
.bk .bk-steam {
  fill: none;
  stroke: var(--bk-paper);
  stroke-width: 4;
  stroke-linecap: round;
  opacity: 0;
  animation: bk-steam 3.2s ease-in-out infinite;
}
.bk .bk-steam-2 { animation-delay: 0.9s; }
.bk .bk-steam-3 { animation-delay: 1.8s; }
@keyframes bk-steam {
  0% { opacity: 0; transform: translateY(8px); }
  35% { opacity: 0.95; }
  100% { opacity: 0; transform: translateY(-16px); }
}
.bk .bk-aside {
  padding-bottom: 14px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 27px;
  line-height: 1.1;
  color: var(--bk-paper);
  transform: rotate(-4deg);
}

/* ---------- reservation slip ---------- */
.bk .bk-slip {
  --tilt: 2.2deg;
  position: relative;
  justify-self: end;
  width: 100%;
  max-width: 520px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 72px;
  background: var(--bk-paper);
  border: 2px solid var(--bk-ink);
  border-radius: 18px;
  box-shadow: 9px 11px 0 var(--bk-ink);
  transform: rotate(var(--tilt));
}
.bk.is-in .bk-slip {
  animation: bk-drop 1s cubic-bezier(0.25, 0.9, 0.3, 1.15) 0.2s backwards;
}
@keyframes bk-drop {
  from { opacity: 0; transform: translateY(-70px) rotate(-7deg); }
  to { opacity: 1; transform: translateY(0) rotate(var(--tilt)); }
}

/* washi tape */
.bk .bk-tape {
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

.bk .bk-main { padding: 40px 32px 30px 34px; }

.bk .bk-label {
  display: block;
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(36, 22, 15, 0.55);
}

.bk .bk-field { margin-bottom: 24px; }

.bk .bk-step { display: flex; align-items: center; gap: 12px; }
.bk .bk-btn {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 2px solid var(--bk-ink);
  border-radius: 50%;
  background: var(--bk-cream);
  color: var(--bk-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 3px 0 var(--bk-ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s ease;
}
.bk .bk-btn:active:not(:disabled) { transform: translateY(3px); box-shadow: 0 0 0 var(--bk-ink); }
.bk .bk-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.bk .bk-count {
  display: inline-block;
  min-width: 62px;
  text-align: center;
  font-weight: 800;
  font-size: 56px;
  line-height: 1;
  letter-spacing: -2px;
  animation: bk-bump 0.4s cubic-bezier(0.3, 1.8, 0.5, 1);
}
@keyframes bk-bump {
  from { transform: scale(0.6) rotate(-8deg); opacity: 0.4; }
  to { transform: scale(1) rotate(0); opacity: 1; }
}
.bk .bk-unit {
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 30px;
  color: var(--bk-bg);
}

.bk .bk-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.bk .bk-chip {
  padding: 10px 16px;
  border: 2px solid var(--bk-ink);
  border-radius: 999px;
  background: transparent;
  color: var(--bk-ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.bk .bk-chip.on { background: var(--bk-ink); color: var(--bk-paper); transform: rotate(-2.5deg) scale(1.04); }
@media (hover: hover) {
  .bk .bk-chip:not(.on):hover { background: var(--bk-cream); transform: rotate(1.5deg); }
}

.bk .bk-btn:focus-visible,
.bk .bk-chip:focus-visible,
.bk .bk-go:focus-visible {
  outline: 3px solid var(--bk-pen);
  outline-offset: 3px;
}

/* handwritten message preview */
.bk .bk-note {
  min-height: 96px;
  margin: 0 0 24px;
  padding: 2px 6px 0;
  font-family: "Caveat", cursive;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: var(--bk-pen);
  background: repeating-linear-gradient(transparent 0 31px, rgba(47, 63, 158, 0.2) 31px 32px);
}

/* main button */
.bk .bk-go {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 9px 24px 9px 9px;
  border-radius: 999px;
  background: var(--bk-ink);
  color: var(--bk-paper);
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 19px;
  text-decoration: none;
  box-shadow: 0 6px 0 var(--bk-deep);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.bk .bk-go:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--bk-deep); }
.bk .bk-go-label { flex: 1; }
.bk .bk-go-icon {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bk-green);
}
.bk .bk-go-icon::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid var(--bk-green);
  border-radius: 50%;
  animation: bk-ping 2.4s ease-out infinite;
}
@keyframes bk-ping {
  0% { transform: scale(1); opacity: 0.8; }
  80%, 100% { transform: scale(1.7); opacity: 0; }
}
.bk .bk-go-icon svg {
  width: 26px;
  height: 26px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.bk .bk-go-icon .dot { fill: #fff; stroke: none; }
.bk .bk-go-arrow {
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
  .bk .bk-go:hover { transform: translateY(-2px); box-shadow: 0 8px 0 var(--bk-deep); }
  .bk .bk-go:hover .bk-go-arrow { transform: translateX(6px); }
}

.bk .bk-fine {
  margin: 16px 0 0;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: rgba(36, 22, 15, 0.55);
}

/* torn-off stub */
.bk .bk-stub {
  position: relative;
  display: grid;
  place-items: center;
  border-left: 2px dashed var(--bk-ink);
  background: var(--bk-cream);
  border-radius: 0 16px 16px 0;
}
.bk .bk-stub::before {
  content: "\\2702\\FE0E";
  position: absolute;
  top: 14px;
  left: -13px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--bk-paper);
  font-size: 17px;
  line-height: 1;
  color: var(--bk-ink);
}
.bk .bk-stub span {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(36, 22, 15, 0.7);
  white-space: nowrap;
}

/* rubber stamp */
.bk .bk-stamp {
  position: absolute;
  left: -38px;
  bottom: 74px;
  display: grid;
  place-items: center;
  width: 104px;
  height: 104px;
  border: 3px solid var(--bk-deep);
  border-radius: 50%;
  outline: 2px solid var(--bk-deep);
  outline-offset: -9px;
  color: var(--bk-deep);
  font-weight: 800;
  font-size: 15px;
  line-height: 1.05;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  mix-blend-mode: multiply;
  transform: rotate(-14deg);
  pointer-events: none;
}
.bk.is-in .bk-stamp { animation: bk-stamp 0.5s cubic-bezier(0.3, 1.2, 0.5, 1) 1.1s backwards; }
@keyframes bk-stamp {
  0% { opacity: 0; transform: rotate(-30deg) scale(2.1); }
  65% { opacity: 1; transform: rotate(-12deg) scale(0.92); }
  100% { opacity: 1; transform: rotate(-14deg) scale(1); }
}

/* ---------- responsive ---------- */
@media (max-width: 900px) {
  .bk { padding: 90px 0 80px; }
  .bk .bk-grid { grid-template-columns: minmax(0, 1fr); gap: 64px; }
  .bk .bk-slip { justify-self: center; --tilt: 1.2deg; }
  .bk .bk-text { margin-bottom: 26px; }
}
@media (max-width: 520px) {
  .bk .bk-slip { grid-template-columns: minmax(0, 1fr); box-shadow: 6px 8px 0 var(--bk-ink); }
  .bk .bk-stub { display: none; }
  .bk .bk-main { padding: 38px 22px 26px; }
  .bk .bk-count { font-size: 46px; }
  .bk .bk-stamp { left: auto; right: -8px; bottom: auto; top: -46px; width: 88px; height: 88px; font-size: 13px; }
  .bk .bk-go { font-size: 17px; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .bk *, .bk *::before, .bk *::after {
    animation: none !important;
    transition: none !important;
  }
  .bk .bk-steam { opacity: 0.8; }
}
`;

export default function BookingCta() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [whenId, setWhenId] = useState("today");

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
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const when = WHEN_OPTIONS.find((o) => o.id === whenId);
  const people = guests === 1 ? "1 person" : `${guests} people`;
  const message = `Hi! I'd like to book a table for ${people} ${when.phrase}. Is a table available? Thank you!`;
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <section ref={ref} className={`bk${seen ? " is-in" : ""}`} aria-labelledby="bk-title">
      <style>{css}</style>

      <div className="bk-bg" aria-hidden="true">
        <span className="bk-ring bk-ring-a" />
        <span className="bk-ring bk-ring-b" />
      </div>

      <div className="bk-wrap">
        <div className="bk-grid">
          {/* ---------- left ---------- */}
          <div>
            <span className="bk-kicker bk-rise" style={{ "--d": 0 }}>
              table for two? or ten?
            </span>

            <h2 id="bk-title" className="bk-title bk-rise" style={{ "--d": 1 }}>
              Save a <span className="bk-mark">seat.</span>
              <br />
              We'll handle the coffee.
            </h2>

            <p className="bk-text bk-rise" style={{ "--d": 2 }}>
              Tell us how many of you are coming and when. One tap opens WhatsApp with the message already written. Just hit send.
            </p>

            <div className="bk-cup-row bk-rise" style={{ "--d": 3 }} aria-hidden="true">
              <svg className="bk-cup" viewBox="0 0 140 124">
                <path className="bk-steam bk-steam-1" d="M50 44 C44 34 56 28 50 18 C47 12 52 8 52 8" />
                <path className="bk-steam bk-steam-2" d="M70 42 C64 32 76 26 70 16 C67 10 72 6 72 6" />
                <path className="bk-steam bk-steam-3" d="M90 44 C84 34 96 28 90 18 C87 12 92 8 92 8" />
                <ellipse className="bk-cup-body" cx="65" cy="113" rx="50" ry="7" />
                <path className="bk-cup-body" d="M100 62 H110 C124 62 124 90 108 90 H98" />
                <path className="bk-cup-body" d="M28 56 H102 V76 C102 97 86 108 65 108 C44 108 28 97 28 76 Z" />
                <ellipse className="bk-cup-coffee" cx="65" cy="56" rx="37" ry="6" />
              </svg>
              <span className="bk-aside">no calls,
                <br />
                no forms.</span>
            </div>
          </div>

          {/* ---------- right: reservation slip ---------- */}
          <div className="bk-slip">
            <span className="bk-tape" aria-hidden="true" />
            <span className="bk-stamp" aria-hidden="true">
              Seat
              <br />
              saved!
            </span>

            <div className="bk-main">
              <div className="bk-field">
                <span className="bk-label" id="bk-guests-label">Who's coming?</span>
                <div className="bk-step" role="group" aria-labelledby="bk-guests-label">
                  <button
                    type="button"
                    className="bk-btn"
                    onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
                    disabled={guests <= MIN_GUESTS}
                    aria-label="One less guest"
                  >
                    &minus;
                  </button>
                  <span className="bk-count" key={guests} aria-live="polite">
                    {guests}
                  </span>
                  <button
                    type="button"
                    className="bk-btn"
                    onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                    disabled={guests >= MAX_GUESTS}
                    aria-label="One more guest"
                  >
                    +
                  </button>
                  <span className="bk-unit">{guests === 1 ? "guest" : "guests"}</span>
                </div>
              </div>

              <div className="bk-field">
                <span className="bk-label" id="bk-when-label">When?</span>
                <div className="bk-chips" role="group" aria-labelledby="bk-when-label">
                  {WHEN_OPTIONS.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`bk-chip${o.id === whenId ? " on" : ""}`}
                      aria-pressed={o.id === whenId}
                      onClick={() => setWhenId(o.id)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <span className="bk-label">We'll send this</span>
              <p className="bk-note">{message}</p>

              <a className="bk-go" href={link} target="_blank" rel="noopener noreferrer">
                <span className="bk-go-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
                    <circle className="dot" cx="8.5" cy="12" r="1.1" />
                    <circle className="dot" cx="12" cy="12" r="1.1" />
                    <circle className="dot" cx="15.5" cy="12" r="1.1" />
                  </svg>
                </span>
                <span className="bk-go-label">Book a Table</span>
                <svg className="bk-go-arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </a>

              <p className="bk-fine">Opens WhatsApp with your message ready to send.</p>
            </div>

            <div className="bk-stub" aria-hidden="true">
              <span>Table &middot; No. 7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}