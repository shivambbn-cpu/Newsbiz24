"use client";

export default function SideMenu({ onCategorySelect }) {

  // 🔥 Side Menu Close Function
  const closeMenu = () => {
    const sideMenu = document.getElementById("side-menu");
    const menuBtn = document.getElementById("menu-button");

    if (sideMenu) sideMenu.classList.remove("active");
    if (menuBtn) menuBtn.classList.remove("open");
  };

  // ✅ category select + menu close
  const handleCategoryClick = (category) => {
    onCategorySelect(category); // HomePage ko batata hai
    closeMenu();               // menu band
  };

  return (
    <div id="side-menu" className="side-menu">
      <ul>
        <li onClick={() => handleCategoryClick("religious")}>Religious</li>
        <li onClick={() => handleCategoryClick("weather")}>Weather</li>
        <li onClick={() => handleCategoryClick("trending")}>Trending</li>
        <li onClick={() => handleCategoryClick("astro")}>Astro</li>
        <li onClick={() => handleCategoryClick("business")}>Business</li>
        <li onClick={() => handleCategoryClick("health")}>Health</li>
        <li onClick={() => handleCategoryClick("lifestyles")}>Lifestyles</li>
        <li onClick={() => handleCategoryClick("news")}>News</li>
      </ul>
    </div>
  );
    }
