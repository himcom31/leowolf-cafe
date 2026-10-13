import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { cafe } from "../data/info.js";
// Same file you import <OrderProvider> from in main.jsx (keep the exact same path + spelling)
import { useOrder } from "../pages/Ordernow.jsx";

/* ---------- Menu items (dropdown wale items me `children` hai) ---------- */
const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Food Menu", to: "/menu" },
  // {
  //   label: "Pages",
  //   children: [
  //     { label: "Gallery", to: "/gallery" },
  //     { label: "Book a Table", to: "/booking" },
  //   ],
  // },
  { label: "Contact", to: "/contact" },
];

/* ---------- Icons (inline SVG) ---------- */
const Chevron = () => (
  <svg className="hdr-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PinIcon = () => (
  <svg className="hdr-ico" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="hdr-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5" />
    <path d="M4 4.5l3-2.5M20 4.5l-3-2.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="hdr-ico" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="hdr-ico" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.29 4.29 0 0 0-7.32 3.91A12.16 12.16 0 0 1 3.15 4.79a4.29 4.29 0 0 0 1.33 5.72 4.27 4.27 0 0 1-1.94-.54v.05a4.29 4.29 0 0 0 3.44 4.2 4.3 4.3 0 0 1-1.94.07 4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.57 1.93c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.7 8.7 0 0 0 22.46 6z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="hdr-ico" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2zM8.34 18.34H5.67V9.75h2.67v8.59zM7 8.56a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9.78h-2.67v-4.18c0-1-.02-2.28-1.39-2.28s-1.6 1.09-1.6 2.2v4.26h-2.67V9.75h2.56v1.17h.04a2.8 2.8 0 0 1 2.52-1.38c2.7 0 3.2 1.78 3.2 4.09v4.71z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="hdr-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const SearchIcon = () => (
  <svg className="hdr-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ClocheIcon = () => (
  <svg className="hdr-logo-icon" viewBox="0 0 60 56" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="7" r="3.5" />
    <path d="M9 36a21 21 0 0 1 42 0" />
    <path d="M5 36h50" />
    <path d="M5 47c8-5 17-4 24-1h13c5 0 5 7 0 7H25L9 51" />
  </svg>
);

/* ---------- Component ---------- */
export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [dd, setDd] = useState(null); // mobile dropdown
  const { openOrder, count } = useOrder();

  const close = () => {
    setOpen(false);
    setDd(null);
  };

  // Order Now: close the mobile menu, then open the order popup (no page change)
  const handleOrder = () => {
    close();
    openOrder();
  };

  return (
    <>
      <style>{css}</style>

      {/* ===== Top red bar ===== */}
      <div className="hdr-topbar">
        <div className="hdr-wrap">
          <div className="hdr-top-left">
            <span className="hdr-top-item hdr-top-address">
              <PinIcon />
              {cafe.address}
            </span>
            <span className="hdr-top-sep hdr-top-address">/</span>
            <span className="hdr-top-item">
              <ClockIcon />
              {cafe.timings[0].time}
            </span>
          </div>

          <div className="hdr-top-right">
            <span className="hdr-follow">Follow Us:</span>
            <div className="hdr-social">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><TwitterIcon /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main dark navbar ===== */}
      <header className="hdr-nav">
        <div className="hdr-wrap">
          {/* Logo */}
          <Link to="/" className="hdr-logo" onClick={close}>
            <span className="hdr-logo-line hdr-logo-top" />
            <span className="hdr-logo-main">
              <span className="hdr-logo-name">{cafe.name}</span>
              <ClocheIcon />
            </span>
            <span className="hdr-logo-sub">
              Coffee House
              <span className="hdr-logo-line" />
            </span>
          </Link>

          {/* Links */}
          <ul className={`hdr-links ${open ? "open" : ""}`}>
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label} className={`hdr-has-dd ${dd === item.label ? "open" : ""}`}>
                  <button
                    type="button"
                    className="hdr-link"
                    onClick={() => setDd(dd === item.label ? null : item.label)}
                  >
                    {item.label}
                    <Chevron />
                  </button>
                  <ul className="hdr-dd">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <NavLink to={c.to} onClick={close}>
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={close}
                    className={({ isActive }) => `hdr-link${isActive ? " active" : ""}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
            <li className="hdr-order-mobile-wrap">
              <button type="button" className="hdr-order" onClick={handleOrder} aria-haspopup="dialog">
                Order Now
                <span className="hdr-order-arrow"><ArrowIcon /></span>
                {count > 0 && (
                  <span className="hdr-order-count" key={count} aria-label={`${count} items in your order`}>
                    {count}
                  </span>
                )}
              </button>
            </li>
          </ul>

          {/* Right side */}
          <div className="hdr-right">
            <Link to="/menu" className="hdr-search" aria-label="Search menu" onClick={close}>
              <SearchIcon />
            </Link>
            <button
              type="button"
              className="hdr-order hdr-order-desktop"
              onClick={handleOrder}
              aria-haspopup="dialog"
            >
              Order Now
              <span className="hdr-order-arrow"><ArrowIcon /></span>
              {count > 0 && (
                <span className="hdr-order-count" key={count} aria-label={`${count} items in your order`}>
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              className="hdr-burger"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* ---------- All Navbar CSS (isi file me) ---------- */
const css = `
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

.hdr-topbar,
.hdr-nav {
  --hdr-red: #e6002b;
  --hdr-red-dark: #c20024;
  --hdr-orange: #f47a20;
  --hdr-dark: #111111;
  font-family: "Roboto", sans-serif;
}

.hdr-wrap {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ---------- Top red bar ---------- */
.hdr-topbar {
  background: var(--hdr-red);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
}

.hdr-topbar .hdr-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 46px;
}

.hdr-top-left,
.hdr-top-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hdr-top-item {
  display: flex;
  align-items: center;
  gap: 9px;
}

.hdr-top-sep {
  margin: 0 8px;
}

.hdr-ico {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.hdr-follow {
  margin-right: 6px;
}

.hdr-social {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hdr-social a {
  display: flex;
  color: #fff;
  transition: transform 0.2s, opacity 0.2s;
}

.hdr-social a:hover {
  transform: translateY(-2px);
  opacity: 0.8;
}

/* ---------- Main navbar ---------- */
.hdr-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--hdr-dark);
  color: #fff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
}

.hdr-nav .hdr-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 96px;
}

/* Logo */
.hdr-logo {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #fff;
  flex-shrink: 0;
}

.hdr-logo-line {
  display: block;
  height: 4px;
  border-radius: 4px;
  background: var(--hdr-orange);
}

.hdr-logo-top {
  width: 72%;
}

.hdr-logo-main {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.hdr-logo-name {
  font-size: 30px;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.hdr-logo-icon {
  width: 42px;
  height: 38px;
  margin-top: -8px;
  flex-shrink: 0;
}

.hdr-logo-sub {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  white-space: nowrap;
}

.hdr-logo-sub .hdr-logo-line {
  flex: 1;
}

/* Links */
.hdr-links {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.hdr-link {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-family: inherit;
  font-size: 18px;
  font-weight: 700;
  transition: color 0.2s;
}

.hdr-link:hover,
.hdr-link.active {
  color: var(--hdr-orange);
}

.hdr-chev {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}

/* Dropdown */
.hdr-has-dd {
  position: relative;
}

.hdr-dd {
  position: absolute;
  top: 100%;
  left: -18px;
  min-width: 210px;
  display: none;
  list-style: none;
  margin: 0;
  padding: 8px 0;
  background: #1a1a1a;
  border-top: 3px solid var(--hdr-red);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
}

.hdr-dd a {
  display: block;
  padding: 11px 24px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.2s;
}

.hdr-dd a:hover,
.hdr-dd a.active {
  background: var(--hdr-red);
}

/* Right side */
.hdr-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.hdr-search {
  display: flex;
  padding: 6px;
  color: #fff;
  transition: color 0.2s;
}

.hdr-search:hover {
  color: var(--hdr-orange);
}

.hdr-search-ico {
  width: 28px;
  height: 28px;
}

/* Order Now (now a <button> that opens the order popup) */
.hdr-order {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 18px;
  height: 56px;
  padding: 0 22px;
  border: 0;
  background: var(--hdr-red);
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.hdr-order:hover {
  background: var(--hdr-red-dark);
}

.hdr-order:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

.hdr-order-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: #fff;
  color: var(--hdr-red);
  border-radius: 3px;
}

/* items-in-cart badge */
.hdr-order-count {
  position: absolute;
  top: -10px;
  right: -10px;
  display: grid;
  place-items: center;
  min-width: 26px;
  height: 26px;
  padding: 0 6px;
  border: 2px solid var(--hdr-dark);
  border-radius: 999px;
  background: #fff;
  color: var(--hdr-red);
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
  animation: hdr-pop 0.35s cubic-bezier(0.3, 1.8, 0.5, 1);
}

@keyframes hdr-pop {
  from { transform: scale(0.5); opacity: 0.4; }
  to { transform: scale(1); opacity: 1; }
}

.hdr-order-mobile-wrap {
  display: none;
}

.hdr-burger {
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
  padding: 6px 4px;
  -webkit-tap-highlight-color: transparent;
}

/* Desktop: dropdown hover pe khulta hai */
@media (min-width: 992px) {
  .hdr-has-dd:hover .hdr-dd,
  .hdr-has-dd:focus-within .hdr-dd {
    display: block;
  }

  .hdr-has-dd:hover .hdr-chev {
    transform: rotate(180deg);
  }
}

/* ---------- Tablet / Mobile ---------- */
@media (max-width: 991px) {
  .hdr-burger {
    display: block;
  }

  .hdr-right {
    gap: 18px;
  }

  .hdr-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 32px 24px;
    background: var(--hdr-dark);
    border-top: 1px solid #2a2a2a;
    max-height: calc(100vh - 140px);
    max-height: calc(100svh - 140px);
    overflow-y: auto;
  }

  .hdr-links.open {
    display: flex;
  }

  .hdr-links > li {
    border-bottom: 1px solid #222;
  }

  .hdr-link {
    width: 100%;
    justify-content: space-between;
    padding: 15px 0;
  }

  .hdr-dd {
    position: static;
    min-width: 0;
    padding: 0 0 8px 14px;
    background: transparent;
    border-top: 0;
    box-shadow: none;
  }

  .hdr-has-dd.open .hdr-dd {
    display: block;
  }

  .hdr-has-dd.open .hdr-chev {
    transform: rotate(180deg);
  }
}

/* Top bar: tablet par wrap ho jaye, chhote tablet par address hat jaye */
@media (max-width: 991px) {
  .hdr-topbar .hdr-wrap {
    flex-wrap: wrap;
    gap: 2px 16px;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .hdr-top-left {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .hdr-top-address {
    display: none;
  }

  .hdr-top-left {
    flex: 1;
  }
}

@media (max-width: 640px) {
  .hdr-wrap {
    padding: 0 16px;
  }

  .hdr-topbar .hdr-wrap {
    min-height: 40px;
  }

  .hdr-top-address {
    display: none;
  }

  .hdr-follow {
    display: none;
  }

  .hdr-top-left {
    flex: 1;
  }

  .hdr-nav .hdr-wrap {
    height: 76px;
  }

  .hdr-logo-name {
    font-size: 23px;
  }

  .hdr-logo-icon {
    width: 32px;
    height: 29px;
  }

  .hdr-logo-sub {
    font-size: 9px;
  }

  .hdr-order-desktop {
    display: none;
  }

  .hdr-order-mobile-wrap {
    display: block;
    border-bottom: 0 !important;
    padding-top: 18px;
  }

  .hdr-order-mobile-wrap .hdr-order {
    width: 100%;
    justify-content: space-between;
  }

  .hdr-order-mobile-wrap .hdr-order-count {
    top: -8px;
    right: auto;
    left: 12px;
  }

  .hdr-links {
    padding: 6px 16px 22px;
    max-height: calc(100vh - 116px);
    max-height: calc(100svh - 116px);
  }
}

/* Bahut chhote phones (360px se kam) */
@media (max-width: 380px) {
  .hdr-logo-name {
    font-size: 19px;
  }

  .hdr-logo-icon {
    width: 27px;
    height: 25px;
  }

  .hdr-logo-sub {
    font-size: 8px;
  }

  .hdr-right {
    gap: 8px;
  }

  .hdr-topbar {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hdr-order-count {
    animation: none;
  }
}
`;