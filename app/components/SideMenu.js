"use client";

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

export default function SideMenu({ onCategorySelect }) {

  const closeMenu = () => {
    document.getElementById("side-menu")?.classList.remove("active");
    document.getElementById("menu-button")?.classList.remove("open");
  };

  const handleClick = (label) => {
    const category = CATEGORY_MAP[label];
    console.log("📂 Selected Category:", category); // 🔍 DEBUG
    onCategorySelect(category);
    closeMenu();
  };

  return (
    <div id="side-menu" className="side-menu">
      <ul>
        {Object.keys(CATEGORY_MAP).map((label) => (
          <li key={label} onClick={() => handleClick(label)}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
