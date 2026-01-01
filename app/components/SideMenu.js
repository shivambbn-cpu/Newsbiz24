"use client";
import Link from "next/link";

const categories = [
  "astro",
  "religious",
  "health",
  "business",
  "news",
  "trending",
  "lifestyles",
  "weather",
];

export default function SideMenu() {
  return (
    <aside className="side-menu">
      {categories.map(cat => (
        <Link key={cat} href={`/category/${cat}`}>
          {cat.toUpperCase()}
        </Link>
      ))}
    </aside>
  );
}
