"use client";

// 🔹 Minimal MenuItem Component
export default function MenuItem({ label, onClick }) {
  return (
    <li
      className="menu-item"
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "0.2s",
        padding: "10px 18px",
        fontSize: "18px",
        textAlign: "center",
      }}
    >
      {label}
    </li>
  );
}
