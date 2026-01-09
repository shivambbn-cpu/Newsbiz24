"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // 🔥 Ye ensure karta hai ki search har change pe chale
  useEffect(() => {
    if (onSearch) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  return (
    <div style={{ padding: "10px" }}>
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

