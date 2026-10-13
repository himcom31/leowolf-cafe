import { Link } from "react-router-dom";
import { cafe } from "../data/info.js";

/* ---------- Yahan apne hisaab se badlo ---------- */
// public folder me jo brick-wall image hai uska exact naam yahan likho
// (public/hero-bg.jpg  ->  "/hero-bg.jpg")
const HERO_BG = "/hero-bg.webp";

// Heading ki lines (har item nayi line me aayega)
const TITLE_LINES = ["Spicy Fried", "Chicken"];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Hero() {
  return (
    <>
      <style>{css}</style>

      <section className="fh-hero" style={{ "--fh-hero-bg": `url(${HERO_BG})` }}>
        <div className="fh-hero-inner">
          <p className="fh-hero-kicker">Welcome {cafe.name}</p>

          <h1 className="fh-hero-title">
            {TITLE_LINES.map((line, i) => (
              <span key={line}>
                {line}
                {i < TITLE_LINES.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <Link to="/menu" className="fh-hero-btn">
            Order Now
            <span className="fh-hero-btn-arrow">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

/* ---------- All Hero CSS (isi file me) ---------- */
const css = `
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

/* ===== Base (desktop first) ===== */
.fh-hero {
  --fh-red: #e6002b;
  --fh-red-dark: #c20024;
  --fh-orange: #f47a20;
  --fh-header-h: 142px;

  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: max(560px, calc(100vh - var(--fh-header-h)));
  min-height: max(560px, calc(100svh - var(--fh-header-h)));
  font-family: "Roboto", sans-serif;
  color: #fff;
  background-color: #2a1409;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    var(--fh-hero-bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.fh-hero-inner {
  width: 100%;
  box-sizing: border-box;
  padding: 60px clamp(20px, 6.1vw, 160px);
}

.fh-hero-kicker {
  margin: 0 0 14px;
  font-size: clamp(1.15rem, 2.2vw, 1.9rem);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--fh-orange);
  animation: fh-fade-up 0.7s ease both;
}

.fh-hero-title {
  margin: 0 0 58px;
  font-family: "Roboto", sans-serif;
  font-size: clamp(3.2rem, 8.1vw, 9.7rem);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -1px;
  text-transform: uppercase;
  color: #fff;
  overflow-wrap: break-word;
  animation: fh-fade-up 0.8s ease 0.1s both;
}

.fh-hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  height: 60px;
  padding: 0 22px;
  max-width: 100%;
  box-sizing: border-box;
  background: var(--fh-red);
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  transition: background 0.25s, transform 0.25s;
  animation: fh-fade-up 0.9s ease 0.2s both;
}

.fh-hero-btn:hover {
  background: var(--fh-red-dark);
  transform: translateY(-3px);
}

.fh-hero-btn:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

.fh-hero-btn-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  background: #fff;
  color: var(--fh-red);
  border-radius: 3px;
}

@keyframes fh-fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== Tablet (641px - 1024px) ===== */
@media (max-width: 1024px) {
  .fh-hero-title {
    font-size: clamp(3.4rem, 9vw, 7.5rem);
    margin-bottom: 44px;
  }
}

/* ===== Mobile (<= 640px) ===== */
@media (max-width: 640px) {
  .fh-hero {
    --fh-header-h: 116px;
    min-height: max(460px, calc(100vh - var(--fh-header-h)));
    min-height: max(460px, calc(100svh - var(--fh-header-h)));
    background-position: 62% center;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.45)),
      var(--fh-hero-bg);
  }

  .fh-hero-inner {
    padding: 36px 20px;
  }

  .fh-hero-kicker {
    font-size: 1rem;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }

  /* Viewport ke hisaab se scale: "SPICY FRIED" ek line me fit ho */
  .fh-hero-title {
    font-size: clamp(2.3rem, 12.5vw, 4.5rem);
    line-height: 1.05;
    letter-spacing: -0.5px;
    margin-bottom: 28px;
  }

  .fh-hero-btn {
    height: 50px;
    padding: 0 16px;
    gap: 14px;
    font-size: 15px;
  }

  .fh-hero-btn-arrow {
    width: 30px;
    height: 30px;
  }
}

/* ===== Chhote phones (<= 360px) ===== */
@media (max-width: 360px) {
  .fh-hero-inner {
    padding: 28px 16px;
  }

  .fh-hero-title {
    font-size: clamp(2rem, 11.5vw, 3rem);
    margin-bottom: 22px;
  }

  .fh-hero-btn {
    height: 46px;
    padding: 0 14px;
    font-size: 14px;
    gap: 10px;
  }
}

/* ===== Landscape phones (chhoti height) ===== */
@media (max-height: 500px) and (orientation: landscape) {
  .fh-hero {
    min-height: 100svh;
  }

  .fh-hero-inner {
    padding: 24px clamp(20px, 5vw, 60px);
  }

  .fh-hero-title {
    font-size: clamp(2.2rem, 7vw, 4rem);
    margin-bottom: 20px;
  }

  .fh-hero-kicker {
    margin-bottom: 8px;
  }
}

/* ===== Motion kam karne wale users ke liye ===== */
@media (prefers-reduced-motion: reduce) {
  .fh-hero-kicker,
  .fh-hero-title,
  .fh-hero-btn {
    animation: none;
  }

  .fh-hero-btn:hover {
    transform: none;
  }
}
`;