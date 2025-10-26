import React, { useState } from 'react';
import { FaMagnifyingGlass, FaChevronDown } from 'react-icons/fa6';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { label: "Home", url: "/" },
  { label: "services", url: "#services" },
  { label: "about_us", url: "/UnderConstruction" },
  { label: "contact", url: "/Contact" }
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, changeLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
    setIsMenuOpen(false);
  };

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #347185 0%, #3A8D9C 60%, #347185 120%)",
        color: "white",
        boxShadow: "0 6px 24px rgba(33,150,243,0.13)",
        position: "relative",
        zIndex: 50,
        transition: "all 0.4s ease-in-out"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 70,
        }}
      >
        {/* ✅ Left Side: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            style={{
              fontWeight: 800,
              fontSize: 29,
              letterSpacing: "1.5px",
              color: "#fff",
              textShadow: "0 1px 5px #1976D222",
              textDecoration: "none",
            }}
            href="/"
            className="logo-text"
          >
            {t("logo")}
          </a>

          {/* ✅ Search Button beside Logo (for phone view) */}
          <button
            className="search-btn-mobile"
            style={{
              background: "#fff",
              color: "#347185",
              border: "none",
              borderRadius: 18,
              padding: "6px 9px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px #34718533",
              display: "none", // hidden by default (visible in mobile)
            }}
            aria-label={t("search_button")}
          >
            <FaMagnifyingGlass />
          </button>

          {/* ✅ Login Button beside Logo (for phone view) */}
          <a
            href="/UnderConstruction"
            className="login-btn-mobile"
            style={{
              background: "#FBC02D",
              color: "#1976D2",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: 14,
              padding: "6px 14px",
              fontSize: 14,
              boxShadow: "0 2px 10px #FFD60022",
              display: "none", // hidden by default (visible in mobile)
            }}
          >
            {t("login")}
          </a>
        </div>

        {/* ✅ Hamburger Button */}
        <button
          className={`menu-btn ${isMenuOpen ? "open" : ""}`}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 28,
            cursor: "pointer",
            display: "none",
            transition: "transform 0.3s ease",
          }}
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* ✅ Navigation Links */}
        <nav
          className={`nav-menu${isMenuOpen ? " active" : ""}`}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              style={{
                color: "white",
                fontWeight: 500,
                fontSize: 17,
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.07)",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(25,118,210,0.15)";
                e.target.style.color = "#FBC02D";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255,255,255,0.07)";
                e.target.style.color = "white";
              }}
            >
              {t(link.label)}
            </a>
          ))}

          {/* ✅ Search (Desktop Only) */}
          <button
            className="search-btn-desktop"
            style={{
              background: "#fff",
              color: "#347185",
              border: "none",
              borderRadius: 18,
              padding: "8px 11px",
              fontWeight: 600,
              cursor: "pointer",
              marginLeft: 10,
              boxShadow: "0 2px 8px #34718533",
            }}
            aria-label={t("search_button")}
          >
            <FaMagnifyingGlass />
          </button>

          {/* ✅ Language Selector */}
          <div style={{ position: "relative", marginLeft: 10 }}>
            <select
              value={language || "en"}
              onChange={handleLanguageChange}
              style={{
                background: "#fff",
                color: "#347185",
                padding: "6px 38px 6px 9px",
                borderRadius: 9,
                fontWeight: 600,
                fontSize: 15,
                border: "1px solid #eee",
                boxShadow: "0 1px 4px #3A8D9C33",
                appearance: "none",
                cursor: "pointer",
              }}
            >
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
              <option value="hi">हिन्दी</option>
            </select>
            <FaChevronDown
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#1976D2",
                fontSize: 16,
              }}
            />
          </div>

          {/* ✅ Login (Desktop Only) */}
          <a
            className="login-btn-desktop"
            href="/UnderConstruction"
            style={{
              background: "#FBC02D",
              color: "#1976D2",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: 16,
              padding: "8px 24px",
              marginLeft: 14,
              boxShadow: "0 2px 10px #FFD60022",
            }}
          >
            {t("login")}
          </a>
        </nav>
      </div>

      {/* ✅ Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 780px) {
          .logo-text {
            font-size: 22px !important;
          }

          .search-btn-desktop,
          .login-btn-desktop {
            display: none !important;
          }

          .search-btn-mobile,
          .login-btn-mobile {
            display: inline-block !important;
          }

          .nav-menu {
            display: none !important;
            position: absolute;
            left: 0;
            right: 0;
            top: 70px;
            background: linear-gradient(180deg, #3A8D9C, #347185);
            flex-direction: column;
            box-shadow: 0 4px 16px #34718533;
            padding: 18px 10px;
            z-index: 99;
            animation: fadeDown 0.3s ease forwards;
          }
          .nav-menu.active {
            display: flex !important;
          }
          .menu-btn {
            display: block !important;
          }
          .hamburger {
            width: 28px;
            height: 20px;
            position: relative;
            transition: all 0.3s ease;
          }
          .hamburger span {
            background: white;
            position: absolute;
            height: 3px;
            width: 100%;
            border-radius: 4px;
            left: 0;
            transition: all 0.3s ease;
          }
          .hamburger span:nth-child(1) { top: 0; }
          .hamburger span:nth-child(2) { top: 8px; }
          .hamburger span:nth-child(3) { top: 16px; }

          .menu-btn.open .hamburger span:nth-child(1) {
            transform: rotate(45deg);
            top: 8px;
          }
          .menu-btn.open .hamburger span:nth-child(2) {
            opacity: 0;
          }
          .menu-btn.open .hamburger span:nth-child(3) {
            transform: rotate(-45deg);
            top: 8px;
          }

          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
