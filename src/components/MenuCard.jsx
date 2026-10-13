import { useState } from "react";

const css = `
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Roboto:wght@400;500;700&display=swap");

.mc-card {
  --mc-red: #e6002b;
  --mc-dark: #0b1320;
  --mc-muted: #5f6670;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: 36px 24px 28px;
  text-align: center;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(11, 19, 32, 0.04);
  font-family: "Roboto", sans-serif;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    background-color 0.45s ease,
    color 0.45s ease;
}

/* Dark state: hover (mouse wale devices par) ya featured prop */
.mc-card.is-featured,
.mc-card.is-featured:hover {
  background: #0b1320;
}

.mc-card.is-featured {
  --mc-dark: #ffffff;
  --mc-muted: #d3d7de;
}

@media (hover: hover) {
  .mc-card:hover {
    transform: translateY(-4px);
    background: #0b1320;
    box-shadow: 0 18px 36px rgba(11, 19, 32, 0.28);
    --mc-dark: #ffffff;
    --mc-muted: #d3d7de;
  }

  .mc-card:hover .mc-price {
    color: #ffffff;
  }
}

/* Heart + basket buttons */
.mc-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2;
}

.mc-btn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    opacity 0.3s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.mc-btn:active {
  transform: scale(0.92);
}

.mc-btn svg {
  width: 18px;
  height: 18px;
}

.mc-btn.is-heart {
  background: var(--mc-red);
  color: #fff;
}

.mc-btn.is-heart.is-active {
  background: #ffffff;
  color: var(--mc-red);
}

.mc-btn.is-cart {
  background: #ffffff;
  color: var(--mc-red);
}

/* Basket: default hidden, hover par slide + fade in */
.mc-btn.is-cart {
  opacity: 0;
  transform: translateY(-10px) scale(0.6);
  pointer-events: none;
}

.mc-card.is-featured .mc-btn.is-cart {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

@media (hover: hover) {
  .mc-card:hover .mc-btn.is-cart,
  .mc-card:focus-within .mc-btn.is-cart {
    opacity: 1;
    transform: none;
    pointer-events: auto;
    transition-delay: 0.08s;
  }

  .mc-card:hover .mc-btn.is-cart:hover {
    background: var(--mc-red);
    color: #ffffff;
  }
}

/* Gol image */
.mc-media {
  display: grid;
  place-items: center;
  width: 72%;
  max-width: 220px;
  aspect-ratio: 1 / 1;
  margin-bottom: 18px;
}

.mc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  transition: transform 0.6s ease;
}

.mc-emoji {
  font-size: clamp(64px, 12vw, 96px);
  line-height: 1;
  transition: transform 0.6s ease;
}

@media (hover: hover) {
  .mc-card:hover .mc-img,
  .mc-card:hover .mc-emoji {
    transform: scale(1.08) rotate(-4deg);
  }
}

/* Veg / Non-veg (chhota, top-left) */
.mc-veg {
  position: absolute;
  top: 18px;
  left: 18px;
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 2px solid;
  border-radius: 3px;
  background: #fff;
  z-index: 2;
}

.mc-veg i {
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.mc-veg.is-veg { border-color: #1a8f3a; }
.mc-veg.is-veg i { background: #1a8f3a; }
.mc-veg.is-nonveg { border-color: #c20024; }
.mc-veg.is-nonveg i { background: #c20024; }

/* Text */
.mc-name {
  margin: 0 0 8px;
  font-family: "Poppins", "Roboto", sans-serif;
  font-size: clamp(17px, 2vw, 22px);
  font-weight: 700;
  line-height: 1.25;
  color: var(--mc-dark);
  overflow-wrap: anywhere;
  transition: color 0.45s ease;
}

.mc-desc {
  margin: 0 0 12px;
  font-size: 15px;
  line-height: 1.4;
  color: var(--mc-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-wrap: balance;
  transition: color 0.45s ease;
}

.mc-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--mc-red);
  white-space: nowrap;
  transition: color 0.45s ease;
}

.mc-card.is-featured .mc-price {
  color: #ffffff;
}

/* ===== Mobile (<= 640px): 2 cards per row ===== */
@media (max-width: 640px) {
  .mc-card {
    padding: 28px 12px 16px;
    border-radius: 12px;
  }

  .mc-actions {
    top: 10px;
    right: 10px;
    gap: 8px;
  }

  .mc-btn {
    width: 30px;
    height: 30px;
  }

  .mc-btn svg {
    width: 15px;
    height: 15px;
  }

  .mc-veg {
    top: 12px;
    left: 12px;
    width: 14px;
    height: 14px;
  }

  .mc-veg i {
    width: 6px;
    height: 6px;
  }

  .mc-media {
    width: 78%;
    margin-bottom: 12px;
  }

  .mc-name {
    font-size: 15px;
    margin-bottom: 4px;
  }

  .mc-desc {
    font-size: 12px;
    margin-bottom: 8px;
  }

  .mc-price {
    font-size: 16px;
  }
}

/* ===== Chhote phones (<= 360px) ===== */
@media (max-width: 360px) {
  .mc-card {
    padding: 26px 8px 14px;
  }

  .mc-name {
    font-size: 14px;
  }

  .mc-desc {
    font-size: 11.5px;
  }

  .mc-price {
    font-size: 15px;
  }

  .mc-btn {
    width: 26px;
    height: 26px;
  }

  .mc-btn svg {
    width: 13px;
    height: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mc-card,
  .mc-img,
  .mc-emoji,
  .mc-btn,
  .mc-name,
  .mc-desc,
  .mc-price {
    transition: none;
  }

  .mc-card:hover,
  .mc-card:hover .mc-img,
  .mc-card:hover .mc-emoji {
    transform: none;
  }
}
`;

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.1C.9 8.8 2.6 5 6.3 5c2 0 3.4 1.1 4.2 2.4C11.3 6.1 12.7 5 14.7 5c3.7 0 5.4 3.8 3.9 6.9C19.5 16.4 12 21 12 21z" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9h18l-2 10H5L3 9z" />
    <path d="M8 9l4-5 4 5" />
    <path d="M9 13v3M15 13v3" />
  </svg>
);

export default function MenuCard({ item, featured = false }) {
  const [liked, setLiked] = useState(false);
  const isVeg = Boolean(item.veg);
  const vegLabel = isVeg ? "Veg" : "Non-Veg";

  return (
    <>
      <style>{css}</style>

      <article className={`mc-card ${featured ? "is-featured" : ""}`}>
        <span
          className={`mc-veg ${isVeg ? "is-veg" : "is-nonveg"}`}
          title={vegLabel}
          role="img"
          aria-label={vegLabel}
        >
          <i />
        </span>

        <div className="mc-actions">
          <button
            type="button"
            className={`mc-btn is-heart ${liked ? "is-active" : ""}`}
            onClick={() => setLiked((v) => !v)}
            aria-label={liked ? "Favorite se hatao" : "Favorite me daalo"}
            aria-pressed={liked}
          >
            <HeartIcon />
          </button>

          <button type="button" className="mc-btn is-cart" aria-label="Cart me daalo">
            <CartIcon />
          </button>
        </div>

        <div className="mc-media">
          {item.image ? (
            <img src={item.image} alt={item.name} loading="lazy" className="mc-img" />
          ) : (
            <div className="mc-emoji" aria-hidden="true">
              {item.emoji}
            </div>
          )}
        </div>

        <h3 className="mc-name">{item.name}</h3>
        {item.desc && <p className="mc-desc">{item.desc}</p>}
        <span className="mc-price">₹{item.price}</span>
      </article>
    </>
  );
}