import { useState, useEffect } from "react";
import "../styles/navbar.css";

export function Navbar() {
  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Strengths", href: "#strengths" },
    { label: "Contact", href: "#contact" },
  ];

  // 🌙 Theme toggle state
  const [dark, setDark] = useState(() => 
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);


  return (
    <nav className="nav-flat">
      <div className="nav-title">Matteo Bacon</div>

      {/* DESKTOP NAV LINKS */}
      <ul className="nav-right-inline">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} className="nav-inline-link">
              {l.label}
              <span className="nav-inline-underline"></span>
            </a>
          </li>
        ))}
      </ul>

      {/* MOBILE DROPDOWN */}
      <select
        className="mobile-nav-select"
        onChange={e => {
          const target = document.querySelector(e.target.value);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {links.map(l => (
          <option key={l.href} value={l.href}>{l.label}</option>
        ))}
      </select>

      {/* 🌗 THEME TOGGLE BUTTON — RIGHT SIDE ALWAYS */}
      <button
        className="theme-toggle-btn"
        onClick={() => setDark(prev => !prev)}
      >
        {dark ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}
