"use client";

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">

        <div id="menu-button" className="menu-icon">
          <span></span><span></span><span></span>
        </div>

        <a href="/" className="logo">
          <span className="logo-first">NEWS</span>
          <span className="logo-second">Biz24</span>
          <span className="logo-domain"><span className="logo-dot">.</span>in</span>
        </a>

        <div className="search-container">
          <input type="text" id="search-input" placeholder="Search..." />
        </div>

      </div>
    </header>
  );
    }
