import { useState } from "react";

// Real photos lagane ke liye: public/images me photos rakho aur
// { src: "/images/g1.jpg", label: "..." } use karo, phir niche <img> wala comment hata do.
const items = [
  { emoji: "☕", label: "Fresh Brew", bg: "linear-gradient(135deg,#6f4e37,#a67c52)" },
  { emoji: "🍰", label: "Desserts", bg: "linear-gradient(135deg,#c8832b,#e8b86d)" },
  { emoji: "🥐", label: "Bakery", bg: "linear-gradient(135deg,#8d5a3b,#d4a373)" },
  { emoji: "🍔", label: "Burgers", bg: "linear-gradient(135deg,#4b2e1e,#8d5a3b)" },
  { emoji: "🧋", label: "Cold Coffee", bg: "linear-gradient(135deg,#7b5e4b,#c9a98b)" },
  { emoji: "🪴", label: "Ambience", bg: "linear-gradient(135deg,#556b2f,#9caf88)" },
  { emoji: "🎶", label: "Live Music", bg: "linear-gradient(135deg,#5b3a29,#b07d62)" },
  { emoji: "🥪", label: "Sandwiches", bg: "linear-gradient(135deg,#a0522d,#deb887)" },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="page-header">
        <h1>Gallery</h1>
        <p>Humare cafe ki kuch jhalkiyan</p>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {items.map((it, i) => (
              <button
                key={i}
                className="gallery-item"
                style={{ background: it.bg }}
                onClick={() => setSelected(it)}
              >
                {/* <img src={it.src} alt={it.label} /> */}
                <span className="gallery-emoji">{it.emoji}</span>
                <span className="gallery-label">{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <div className="lightbox-box" style={{ background: selected.bg }}>
            <span className="lightbox-emoji">{selected.emoji}</span>
            <p>{selected.label}</p>
          </div>
        </div>
      )}
    </>
  );
}
