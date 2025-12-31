"use client";

export default function SideMenu() {

  // 🔥 Side Menu Close Function
  const closeMenu = () => {
    const sideMenu = document.getElementById("side-menu");
    const menuBtn = document.getElementById("menu-button");

    if (sideMenu) sideMenu.classList.remove("active");
    if (menuBtn) menuBtn.classList.remove("open");
  };

  return (
    <div id="side-menu" className="side-menu">
      <ul>
        <li className="active" onClick={closeMenu}>Religious</li>
        <li onClick={closeMenu}>Weather</li>
        <li onClick={closeMenu}>Trending</li>
        <li onClick={closeMenu}>Astro</li>
        <li onClick={closeMenu}>Business</li>
        <li onClick={closeMenu}>Health</li>
        <li onClick={closeMenu}>Lifestyles</li>
        <li onClick={closeMenu}>News</li>
      </ul>
    </div>
  );
}
