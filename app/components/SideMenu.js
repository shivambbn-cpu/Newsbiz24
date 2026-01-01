"use client";

import dynamic from "next/dynamic";

// 🔥 CATEGORY MAP
const CATEGORY_MAP = {
  Religious: "religious",
  Weather: "weather",
  Trending: "trending",
  Astro: "astro",
  Business: "business",
  Health: "health",
  Lifestyles: "lifestyles",
  News: "news",
};

// 🔹 Turbopack Optimized MenuItem (lazy load)
const MenuItem = dynamic(() => import("./MenuItem"), {
  ssr: false, // client-only
  loading: () => null, // no flash
});

export default function SideMenu({ onCategorySelect }) {
  const closeMenu = () => {
    document.getElementById("side-menu")?.classList.remove("active");
    document.getElementById("menu-button")?.classList.remove("open");
  };

  const handleClick = (label) => {
    const category = CATEGORY_MAP[label];
    console.log("📌 Selected Category:", category);
    onCategorySelect(category);
    closeMenu();
  };

  return (
    <div id="side-menu" className="side-menu">
      <ul>
        {Object.keys(CATEGORY_MAP).map((label) => (
          <MenuItem
            key={label}
            label={label}
            onClick={() => handleClick(label)}
          />
        ))}
      </ul>
    </div>
  );
}
