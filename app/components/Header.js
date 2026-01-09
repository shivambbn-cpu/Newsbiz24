"use client";

import { useState } from "react";

export default function Header({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu) sideMenu.classList.toggle("active");
  };

  // 🔍 Search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value); // 🔥 parent ko value bhej raha hai
  };

  return (
    <header id="main-header">
      <div className="header-content">

        {/* ☰ Menu */}
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

        {/* 🔍 SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search news by title..."
            value={searchText}
            onChange={handleSearch}
          />
        </div>

      </div>
    </header>
  );
}
