"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);

    // side menu toggle
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu) {
      sideMenu.classList.toggle("active");
    }
  };

  return (
    <header id="main-header">
      <div className="header-content">

        {/* 🔥 Three Line Menu Button */}
        <div
          id="menu-button"
          className={`menu-icon ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Logo */}
        <a href="/" className="logo">
          <span className="logo-first">NEWS</span>
          <span className="logo-second">Biz24</span>
          <span className="logo-domain">
            <span className="logo-dot">.</span>in
          </span>
        </a>

        {/* Search */}
        <div className="search-container">
          <input type="text" id="search-input" placeholder="Search..." />
        </div>

      </div>
    </header>
  );
}
