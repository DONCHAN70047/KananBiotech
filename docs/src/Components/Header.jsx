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
    <header style={{
      background: "linear-gradient(90deg, #347185 0%, #3A8D9C 60%, #347185 120% )",
      color: "white",
      boxShadow: "0 6px 24px rgba(33,150,243,0.13)",
      position: "relative",
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 70
      }}>
        <a style={{
          fontWeight: 800,
          fontSize: 29,
          letterSpacing: "1.5px",
          color: "#fff",
          textShadow: "0 1px 5px #1976D222",
          textDecoration: "none"
        }} href="/">{t("logo")}</a>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 33,
            cursor: "pointer",
            display: "none"
          }}
          className="menu-btn"
          aria-label="Open navigation menu"
          onClick={() => setIsMenuOpen(open => !open)}
        >
          &#9776;
        </button>
        <nav
          className={`nav-menu${isMenuOpen ? " active" : ""}`}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center"
          }}>
          {navLinks.map(link => (
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
              onMouseOver={e => {
                e.target.style.background = "rgba(25,118,210,0.15)";
                e.target.style.color = "#FBC02D";
              }}
              onMouseOut={e => {
                e.target.style.background = "rgba(255,255,255,0.07)";
                e.target.style.color = "white";
              }}
            >
              {t(link.label)}
            </a>
          ))}
          {/* Search Button */}
          <button style={{
            background: "#fff",
            color: "#347185",
            border: "none",
            borderRadius: 18,
            padding: "8px 11px",
            fontWeight: 600,
            cursor: "pointer",
            marginLeft: 10,
            boxShadow: "0 2px 8px #34718533"
          }} aria-label={t('search_button')}>
            <FaMagnifyingGlass />
          </button>
          {/* Language Selector */}
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
                cursor: "pointer"
              }}>
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
              <option value="hi">हिन्दी</option>
            </select>
            <FaChevronDown style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#1976D2", fontSize: 16
            }} />
          </div>
          <a
            href="/Login"
            style={{
              background: "#FBC02D",
              color: "#1976D2",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: 16,
              padding: "8px 24px",
              marginLeft: 14,
              boxShadow: "0 2px 10px #FFD60022"
            }}
          >
            {t("login")}
          </a>
        </nav>
      </div>
      <style>
        {`
        @media (max-width: 780px) {
          .nav-menu {
            display: none !important;
            position: absolute;
            left: 0; right: 0;
            top: 70px;
            background: #3A8D9C;
            flex-direction: column;
            box-shadow: 0 4px 16px #34718533;
            padding: 14px 10px;
            z-index: 99;
          }
          .nav-menu.active {
            display: flex !important;
          }
          .menu-btn {
            display: block !important;
          }
        }
        `}
      </style>
    </header>
  );
}

export default Header;
