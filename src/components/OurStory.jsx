import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const aboutImage = "/about.webp";

const points = [
  {
    label: "Roasting",
    text: "We roast in small batches, so the coffee you order is never sitting on a shelf.",
  },
  {
    label: "Kitchen",
    text: "The food is simple, the way we would make it at home for our own family.",
  },
  {
    label: "Seating",
    text: "Stay as long as you like. Laptops, books and long talks are all welcome.",
  },
];

const storyCss = `
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Roboto:wght@400;500&display=swap");

.our-story {
  font-family: "Roboto", sans-serif;
  color: #3b4350;
  overflow: hidden;
}

/* Reset the brown .about-art wrapper */
.our-story .about-art {
  background: none;
  background-color: transparent;
  padding: 0;
  box-shadow: none;
  border: none;
  border-radius: 0;
}

.our-story .about-art::before,
.our-story .about-art::after {
  content: none;
  display: none;
}

/* ---------- Image: clip reveal from the bottom ---------- */
.our-story .our-story-frame {
  position: relative;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 1.3s cubic-bezier(0.65, 0, 0.35, 1);
}

.our-story.is-in .our-story-frame {
  clip-path: inset(0 0 0 0);
}

.our-story .our-story-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 10px;
}

/* Small caption tag over the photo */
.our-story .our-story-tag {
  position: absolute;
  left: 14px;
  top: 14px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.92);
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #0b1320;
  border-radius: 4px;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s;
}

.our-story.is-in .our-story-tag {
  opacity: 1;
  transform: none;
}

/* ---------- Text blocks: slide up, one time ---------- */
.our-story .our-story-kicker,
.our-story .our-story-text,
.our-story .our-story-points,
.our-story .our-story-actions {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.our-story.is-in .our-story-kicker,
.our-story.is-in .our-story-text,
.our-story.is-in .our-story-points,
.our-story.is-in .our-story-actions {
  opacity: 1;
  transform: none;
}

.our-story.is-in .our-story-kicker { transition-delay: 0.3s; }
.our-story.is-in .our-story-text:nth-of-type(1) { transition-delay: 0.45s; }
.our-story.is-in .our-story-text:nth-of-type(2) { transition-delay: 0.6s; }
.our-story.is-in .our-story-points { transition-delay: 0.75s; }
.our-story.is-in .our-story-actions { transition-delay: 1s; }

.our-story .our-story-kicker {
  display: block;
  margin: 0 0 10px;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #8a6a4f;
}

/* ---------- Title with hand-drawn underline ---------- */
.our-story .our-story-title {
  position: relative;
  display: inline-block;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: clamp(28px, 3.6vw, 38px);
  line-height: 1.2;
  letter-spacing: -0.3px;
  margin: 0 0 18px;
  color: #0b1320;
}

.our-story .our-story-underline {
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 10px;
  overflow: visible;
}

.our-story .our-story-underline path {
  fill: none;
  stroke: #e6002b;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.1s ease 0.5s;
}

.our-story.is-in .our-story-underline path {
  stroke-dashoffset: 0;
}

.our-story .our-story-text {
  font-size: 16px;
  line-height: 1.75;
  margin: 0 0 14px;
}

/* ---------- Coffee cup illustration ---------- */
.our-story .our-story-cup {
  display: block;
  width: 120px;
  height: auto;
  margin: 22px 0 6px;
  overflow: visible;
}

.our-story .our-story-cup .cup-line {
  fill: none;
  stroke: #0b1320;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.4s ease;
}

.our-story.is-in .our-story-cup .cup-line {
  stroke-dashoffset: 0;
}

.our-story.is-in .our-story-cup .cup-line:nth-child(2) { transition-delay: 0.2s; }
.our-story.is-in .our-story-cup .cup-line:nth-child(3) { transition-delay: 0.4s; }
.our-story.is-in .our-story-cup .cup-line:nth-child(4) { transition-delay: 0.6s; }

.our-story .our-story-cup .cup-fill {
  fill: #e6002b;
  opacity: 0;
  transition: opacity 0.8s ease 0.9s;
}

.our-story.is-in .our-story-cup .cup-fill {
  opacity: 0.9;
}

/* Steam: loops gently after the cup is drawn */
.our-story .our-story-cup .steam {
  fill: none;
  stroke: #c9a27e;
  stroke-width: 1.6;
  stroke-linecap: round;
  opacity: 0;
}

.our-story.is-in .our-story-cup .steam {
  animation: steam-rise 3.6s ease-in-out 1.6s infinite;
}

.our-story.is-in .our-story-cup .steam.s2 {
  animation-delay: 2.2s;
}

.our-story.is-in .our-story-cup .steam.s3 {
  animation-delay: 2.8s;
}

@keyframes steam-rise {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  30% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

/* ---------- Points list with growing rule ---------- */
.our-story .our-story-points {
  margin: 22px 0;
  padding: 0;
  list-style: none;
}

.our-story .our-story-point {
  position: relative;
  padding: 14px 0 14px 0;
  border-top: 1px solid #e3ddd2;
}

.our-story .our-story-point::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  height: 1px;
  width: 100%;
  background: #e6002b;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.9s ease;
}

.our-story.is-in .our-story-point::before {
  transform: scaleX(1);
}

.our-story.is-in .our-story-point:nth-child(1)::before { transition-delay: 0.9s; }
.our-story.is-in .our-story-point:nth-child(2)::before { transition-delay: 1.1s; }
.our-story.is-in .our-story-point:nth-child(3)::before { transition-delay: 1.3s; }

.our-story .our-story-point-label {
  display: block;
  margin-bottom: 4px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0b1320;
}

.our-story .our-story-point-text {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #5f6670;
}

.our-story .our-story-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

/* ---------- Mobile ---------- */
@media (max-width: 640px) {
  .our-story .our-story-cup {
    width: 96px;
  }
}

/* ---------- Reduced motion: show everything at once ---------- */
@media (prefers-reduced-motion: reduce) {
  .our-story .our-story-frame,
  .our-story .our-story-tag,
  .our-story .our-story-kicker,
  .our-story .our-story-text,
  .our-story .our-story-points,
  .our-story .our-story-actions,
  .our-story .our-story-underline path,
  .our-story .our-story-cup .cup-line,
  .our-story .our-story-cup .cup-fill,
  .our-story .our-story-point::before {
    transition: none;
  }

  .our-story .our-story-frame {
    clip-path: none;
  }

  .our-story .our-story-underline path,
  .our-story .our-story-cup .cup-line {
    stroke-dashoffset: 0;
  }

  .our-story .our-story-cup .cup-fill {
    opacity: 0.9;
  }

  .our-story .our-story-point::before {
    transform: scaleX(1);
  }

  .our-story .our-story-cup .steam {
    animation: none;
    display: none;
  }
}
`;

export default function OurStory() {
  const sectionRef = useRef(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsIn(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section alt our-story ${isIn ? "is-in" : ""}`}
    >
      <style>{storyCss}</style>

      <div className="container two-col">
        <div className="about-art">
          <div className="our-story-frame">
            <img
              src={aboutImage}
              alt="Inside Brew & Bean cafe"
              loading="lazy"
              className="our-story-image"
            />
            <span className="our-story-tag">Our counter, early mornings</span>
          </div>
        </div>

        <div>
          <span className="our-story-kicker">Brew &amp; Bean, Coffee House</span>

          <h2 className="section-title left our-story-title">
            Our Story
            <svg
              className="our-story-underline"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                pathLength="1"
                d="M2 6 C 40 2, 90 9, 140 4 S 190 6, 198 3"
              />
            </svg>
          </h2>

          <p className="our-story-text">
            We did not start with a plan for a big cafe. We started with a small
            counter, a grinder we borrowed from a friend, and a lot of questions
            about how coffee should taste.
          </p>

          <svg
            className="our-story-cup"
            viewBox="0 0 120 90"
            aria-hidden="true"
          >
            <path className="steam" d="M42 24 C 36 16, 48 10, 42 2" pathLength="1" />
            <path className="steam s2" d="M60 22 C 54 12, 66 8, 60 0" pathLength="1" />
            <path className="steam s3" d="M78 24 C 72 16, 84 10, 78 2" pathLength="1" />

            <path
              className="cup-fill"
              d="M24 40 L 84 40 L 80 70 Q 78 78 70 78 L 38 78 Q 30 78 28 70 Z"
            />
            <path
              className="cup-line"
              pathLength="1"
              d="M22 38 L 86 38 L 82 72 Q 80 82 70 82 L 38 82 Q 28 82 26 72 Z"
            />
            <path
              className="cup-line"
              pathLength="1"
              d="M86 46 Q 104 46 102 60 Q 100 70 84 68"
            />
            <path
              className="cup-line"
              pathLength="1"
              d="M12 86 L 96 86"
            />
          </svg>

          <p className="our-story-text">
            Over time the questions became habits. We still taste every batch
            before it leaves the roaster, and we still cook the way we would
            want to be fed.
          </p>

          <ul className="our-story-points">
            {points.map((point) => (
              <li key={point.label} className="our-story-point">
                <span className="our-story-point-label">{point.label}</span>
                <p className="our-story-point-text">{point.text}</p>
              </li>
            ))}
          </ul>

          <div className="our-story-actions">
            <Link to="/about" className="btn btn-outline-dark">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}