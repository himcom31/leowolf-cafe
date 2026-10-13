import { useEffect, useRef, useState } from "react";

/* ---------- Yahan apne hisaab se badlo ----------
   Images public/product/ folder se apne aap detect hoti hain.

   `keys`: image ki file ke naam me ye shabd ho to wahi image us card me lagegi
           (jaise burger.webp, cheese-burger.png dono "burger" se match honge).
   `img` : agar kisi card ki image khud set karni ho to yahan likho,
           jaise img: "/product/mera-photo.webp"  (warna null rehne do).
   Kuch match na mile to folder ki images order me lag jaati hain.
------------------------------------------------ */
const products = [
  {
    id: 1,
    name: "Cheese Burger",
    desc: "Juicy patty, melted cheese",
    price: 199,
    keys: ["burger"],
    img: "/product/Cheese-Burger.webp",
  },
  {
    id: 2,
    name: "Chicken Pizza",
    desc: "Loaded with chicken, cheese",
    price: 299,
    keys: ["pizza"],
    img: "/product/Chicken-Pizza.webp",
  },
  {
    id: 3,
    name: "Grilled Chicken",
    desc: "Smoky, tender and juicy",
    price: 349,
    keys: ["grill", "grilled"],
    img: "/product/Grilled-Chicken.webp",
  },
  {
    id: 4,
    name: "Chicken Leg Piece",
    desc: "Crispy, spicy, golden fried",
    price: 149,
    keys: ["leg", "wing", "fried"],
    img: "/product/Chicken-Leg-Piece.webp",
  },
];

/* ---------- Images ka auto-detect (vite.config.js se aata hai) ---------- */
/* global __PRODUCT_IMAGES__ */
const imageFiles = typeof __PRODUCT_IMAGES__ !== "undefined" ? __PRODUCT_IMAGES__ : [];

function getImage(product, index) {
  if (product.img) return product.img;
  const match = imageFiles.find((f) =>
    product.keys.some((k) => f.toLowerCase().includes(k))
  );
  const file = match || imageFiles[index];
  return file ? `/product/${encodeURIComponent(file)}` : null;
}

/* ---------- All PopularFood CSS (isi file me) ---------- */
const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Caveat:wght@600;700&display=swap");

.pf {
  --pf-accent: #e2602d;
  --pf-deep: #b3411a;
  --pf-ink: #24160f;
  --pf-paper: #fff8ea;
  --pf-cream: #fbe3c2;
  --pf-pen: #2f3f9e;

  position: relative;
  overflow: hidden;
  padding: 100px 0 110px;
  background: #ffffff;
  color: var(--pf-ink);
  font-family: "Bricolage Grotesque", sans-serif;
}

/* soft coffee rings on white */
.pf .pf-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.pf .pf-ring-bg {
  position: absolute;
  border: 10px solid rgba(36, 22, 15, 0.05);
  border-radius: 51% 49% 52% 48% / 49% 53% 47% 51%;
}
.pf .pf-ring-a { width: 280px; height: 280px; left: -90px; top: 40px; transform: rotate(14deg); }
.pf .pf-ring-b { width: 190px; height: 190px; right: -40px; bottom: 30px; border-width: 6px; transform: rotate(-20deg); }

.pf .pf-wrap {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 1132px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------- reveal ---------- */
.pf:not(.is-in) .pf-rise,
.pf:not(.is-in) .pf-card { opacity: 0; }

.pf.is-in .pf-rise {
  animation: pf-rise 0.85s cubic-bezier(0.2, 0.8, 0.3, 1) backwards;
  animation-delay: calc(var(--d, 0) * 120ms);
}
@keyframes pf-rise {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ---------- heading ---------- */
.pf .pf-head {
  text-align: center;
  margin-bottom: 150px;
}
.pf .pf-kicker {
  display: inline-block;
  margin: 0 0 10px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
  color: var(--pf-accent);
  transform: rotate(-3deg);
}
.pf .pf-title {
  margin: 0;
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: clamp(2.3rem, 5vw, 3.9rem);
  line-height: 1;
  letter-spacing: -1.5px;
  color: var(--pf-ink);
}
.pf .pf-mark {
  display: inline-block;
  padding: 0 0.14em 0.04em;
  background: var(--pf-paper);
  border: 2px solid var(--pf-ink);
  box-shadow: 5px 5px 0 var(--pf-ink);
  transform: rotate(-2.5deg);
}
.pf .pf-sub {
  display: block;
  margin-top: 18px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.1;
  color: var(--pf-pen);
  transform: rotate(-1deg);
}

/* ---------- grid ---------- */
.pf .pf-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 140px 26px;
}

/* ---------- card (menu slip) ---------- */
.pf .pf-card {
  --tilt: -1.6deg;
  position: relative;
  box-sizing: border-box;
  min-width: 0;
  padding: 98px 16px 26px;
  text-align: center;
  background: var(--pf-paper);
  border: 2px solid var(--pf-ink);
  border-radius: 20px;
  box-shadow: 7px 9px 0 var(--pf-ink);
  transform: rotate(var(--tilt));
  transition: transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1), box-shadow 0.3s ease;
}
.pf .pf-card:nth-child(2) { --tilt: 1.4deg; }
.pf .pf-card:nth-child(3) { --tilt: -1deg; }
.pf .pf-card:nth-child(4) { --tilt: 1.8deg; }

.pf.is-in .pf-card {
  animation: pf-drop 0.9s cubic-bezier(0.25, 0.9, 0.3, 1.15) backwards;
  animation-delay: calc(var(--d, 0) * 130ms + 150ms);
}
@keyframes pf-drop {
  from { opacity: 0; transform: translateY(-60px) rotate(-7deg); }
  to { opacity: 1; transform: translateY(0) rotate(var(--tilt)); }
}

@media (hover: hover) {
  .pf .pf-card:hover {
    transform: rotate(0deg) translateY(-8px);
    box-shadow: 9px 14px 0 var(--pf-ink);
  }
  .pf .pf-card:hover .pf-ring { animation: pf-spin 14s linear infinite; }
}

/* washi tape in the corner */
.pf .pf-card::before {
  content: "";
  position: absolute;
  top: 10px;
  left: -20px;
  width: 78px;
  height: 24px;
  background: repeating-linear-gradient(135deg, rgba(255, 212, 92, 0.9) 0 8px, rgba(255, 228, 140, 0.9) 8px 16px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transform: rotate(-38deg);
  z-index: 2;
}
.pf .pf-card:nth-child(even)::before {
  left: auto;
  right: -20px;
  transform: rotate(38deg);
  background: repeating-linear-gradient(135deg, rgba(226, 96, 45, 0.55) 0 8px, rgba(240, 161, 95, 0.55) 8px 16px);
}

/* hand-written number */
.pf .pf-no {
  position: absolute;
  top: 12px;
  right: 16px;
  font-family: "Caveat", cursive;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: rgba(36, 22, 15, 0.4);
}
.pf .pf-card:nth-child(even) .pf-no { right: auto; left: 16px; }

/* round image */
.pf .pf-img-wrap {
  position: absolute;
  top: -102px;
  left: 50%;
  width: 178px;
  height: 178px;
  transform: translateX(-50%);
}
.pf .pf-ring {
  position: absolute;
  inset: -8px;
  border: 2px dashed var(--pf-accent);
  border-radius: 50%;
}
.pf .pf-img-wrap img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid var(--pf-ink);
  border-radius: 50%;
  background: var(--pf-cream);
  box-shadow: 4px 5px 0 var(--pf-ink);
}
.pf .pf-img-empty {
  position: absolute;
  inset: 0;
  border: 3px solid var(--pf-ink);
  border-radius: 50%;
  background: var(--pf-cream);
  box-shadow: 4px 5px 0 var(--pf-ink);
}

/* text */
.pf .pf-name {
  margin: 0 0 6px;
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: 23px;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: var(--pf-ink);
}
.pf .pf-desc {
  margin: 0 0 18px;
  font-family: "Caveat", cursive;
  font-weight: 600;
  font-size: 23px;
  line-height: 1.15;
  color: var(--pf-pen);
  text-wrap: balance;
}

/* price sticker */
.pf .pf-price {
  display: inline-block;
  padding: 9px 20px 10px;
  border: 2px solid var(--pf-ink);
  border-radius: 999px;
  background: var(--pf-accent);
  color: var(--pf-paper);
  font-weight: 800;
  font-size: 22px;
  line-height: 1;
  letter-spacing: -0.3px;
  box-shadow: 3px 4px 0 var(--pf-ink);
  transform: rotate(-3deg);
  transition: transform 0.35s cubic-bezier(0.3, 1.7, 0.5, 1);
}
.pf .pf-card:nth-child(even) .pf-price { transform: rotate(2.5deg); }
@media (hover: hover) {
  .pf .pf-card:hover .pf-price { transform: rotate(0deg) scale(1.08); }
}

@keyframes pf-spin {
  to { transform: rotate(360deg); }
}

/* ---------- tablet: 2 columns ---------- */
@media (max-width: 991px) {
  .pf .pf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 140px 26px; }
}

/* ---------- mobile: 2 cards per row ---------- */
@media (max-width: 560px) {
  .pf { padding: 64px 0 70px; }
  .pf .pf-wrap { padding: 0 14px; }
  .pf .pf-head { margin-bottom: 92px; }
  .pf .pf-kicker { font-size: 26px; }
  .pf .pf-title { letter-spacing: -1px; }
  .pf .pf-mark { box-shadow: 4px 4px 0 var(--pf-ink); }
  .pf .pf-sub { font-size: 22px; margin-top: 14px; }

  .pf .pf-grid { gap: 86px 14px; }

  .pf .pf-card {
    padding: 62px 8px 18px;
    border-radius: 16px;
    box-shadow: 5px 6px 0 var(--pf-ink);
  }
  .pf .pf-card::before { width: 54px; height: 18px; top: 8px; left: -14px; }
  .pf .pf-card:nth-child(even)::before { right: -14px; }
  .pf .pf-no { font-size: 18px; top: 8px; right: 10px; }
  .pf .pf-card:nth-child(even) .pf-no { left: 10px; }

  .pf .pf-img-wrap { top: -68px; width: 120px; height: 120px; }
  .pf .pf-ring { inset: -6px; }
  .pf .pf-img-wrap img,
  .pf .pf-img-empty { border-width: 2px; box-shadow: 3px 4px 0 var(--pf-ink); }

  .pf .pf-name { font-size: 16px; margin-bottom: 4px; }
  .pf .pf-desc { font-size: 18px; margin-bottom: 12px; line-height: 1.1; }
  .pf .pf-price { font-size: 17px; padding: 7px 14px 8px; box-shadow: 2px 3px 0 var(--pf-ink); }
}

/* ---------- chhote phones ---------- */
@media (max-width: 360px) {
  .pf .pf-wrap { padding: 0 10px; }
  .pf .pf-grid { gap: 78px 10px; }
  .pf .pf-card { padding: 54px 6px 14px; }
  .pf .pf-img-wrap { top: -60px; width: 104px; height: 104px; }
  .pf .pf-name { font-size: 14.5px; }
  .pf .pf-desc { font-size: 16px; }
  .pf .pf-price { font-size: 15px; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .pf *, .pf *::before, .pf *::after {
    animation: none !important;
    transition: none !important;
  }
  .pf .pf-rise, .pf .pf-card { opacity: 1 !important; }
}
`;

export default function PopularFood() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

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
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`pf${seen ? " is-in" : ""}`} aria-labelledby="pf-title">
      <style>{css}</style>

      <div className="pf-bg" aria-hidden="true">
        <span className="pf-ring-bg pf-ring-a" />
        <span className="pf-ring-bg pf-ring-b" />
      </div>

      <div className="pf-wrap">
        <div className="pf-head">
          <span className="pf-kicker pf-rise" style={{ "--d": 0 }}>
            fresh from the kitchen
          </span>
          <h2 id="pf-title" className="pf-title pf-rise" style={{ "--d": 1 }}>
            Popular <span className="pf-mark">Food</span> Items
          </h2>
          <span className="pf-sub pf-rise" style={{ "--d": 2 }}>
            sabse zyada order hone wale favourites
          </span>
        </div>

        <div className="pf-grid">
          {products.map((p, i) => {
            const src = getImage(p, i);
            return (
              <div className="pf-card" key={p.id} style={{ "--d": i }}>
                <span className="pf-no" aria-hidden="true">
                  #{String(i + 1).padStart(2, "0")}
                </span>

                <div className="pf-img-wrap">
                  <span className="pf-ring" aria-hidden="true" />
                  {src ? (
                    <img
                      src={src}
                      alt={p.name}
                      loading="lazy"
                      onError={(e) => {
                        console.warn("Product image load nahi hui:", src);
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  ) : (
                    <span className="pf-img-empty" aria-hidden="true" />
                  )}
                </div>

                <h3 className="pf-name">{p.name}</h3>
                <p className="pf-desc">{p.desc}</p>
                <span className="pf-price">₹{p.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}