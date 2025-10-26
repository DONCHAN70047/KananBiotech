import React, { useState } from "react";

const navLinks = [
  { name: "Disease Diagnostic", url: "http://localhost:5173/UnderConstruction" },
  { name: "Aquaculture Data", url: "http://localhost:5173/UnderConstruction" },
  { name: "Stock Sells & Buyer", url: "http://localhost:5173/UnderConstruction" },
  { name: "Aqua Consult", url: "http://localhost:5173/UnderConstruction" },
  { name: "Food Protein Prep", url: "http://localhost:5173/UnderConstruction" },
  { name: "WeatherDetails", url: "http://localhost:5173/WeatherApp" }
];

function WebHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #347185 0%, #3A8D9C 60%, #1976D2 100%)",
        color: "white",
        boxShadow: "0 6px 24px rgba(33,150,243,0.09)",
        position: "relative",
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 70
        }}
      >
        {/* Brand/Logo */}
        <div style={{
          fontWeight: 800,
          fontSize: 29,
          letterSpacing: "1.5px",
          color: "#fff",
          textShadow: "0 1px 5px #1976D222"
        }}>
          Kanan Biotech
        </div>
        {/* Nav Menu - Desktop */}
        <nav className="nav-menu" style={{
          display: "flex",
          gap: 20,
          alignItems: "center"
        }}>
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              style={{
                color: "white",
                fontWeight: 500,
                fontSize: 17,
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: 16,
                transition: "background 0.2s, color 0.18s, box-shadow 0.2s",
                background: "rgba(255,255,255,0.07)"
              }}
              onMouseOver={e => {
                e.target.style.background = "rgba(25, 118, 210, 0.18)";
                e.target.style.color = "#FBC02D";
                e.target.style.boxShadow = "0 2px 8px rgba(25,118,210,0.13)";
              }}
              onMouseOut={e => {
                e.target.style.background = "rgba(255,255,255,0.07)";
                e.target.style.color = "white";
                e.target.style.boxShadow = "none";
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>
        {/* Hamburger icon - Phone/Tablet */}
        <button
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: 35,
            cursor: "pointer",
            marginLeft: 10
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
          aria-label="Open menu"
        >
          &#9776;
        </button>
      </div>
      {/* Slide-down mobile menu */}
      {menuOpen && (
        <nav style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background: "#3A8D9C",
          position: "absolute",
          width: "100%",
          left: 0,
          top: 70,
          paddingBottom: 10,
          boxShadow: "0 4px 20px rgba(33,150,243,0.09)"
        }}>
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              style={{
                color: "white",
                fontWeight: 500,
                fontSize: 17,
                textDecoration: "none",
                padding: "12px 26px",
                borderRadius: 0,
                background: "rgba(255,255,255,0.04)",
                transition: "background 0.20s, color 0.18s",
                borderBottom: "1px solid #ffffff16"
              }}
              onMouseOver={e => {
                e.target.style.background = "#347185";
                e.target.style.color = "#FFC107";
              }}
              onMouseOut={e => {
                e.target.style.background = "rgba(255,255,255,0.04)";
                e.target.style.color = "white";
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
      {/* Responsive CSS for phone/tablet */}
      <style>
        {`
          @media (max-width: 800px) {
            .nav-menu { display: none !important; }
            .hamburger-btn { display: block !important; }
          }
          @media (min-width: 801px) {
            .hamburger-btn { display: none !important; }
          }
        `}
      </style>
    </header>
  );
}

export default WebHeader;
