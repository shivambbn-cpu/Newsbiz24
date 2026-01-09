"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // parent ko search text bhejta hai
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search news..."
        autoComplete="off"
      />
    </div>
  );
}
