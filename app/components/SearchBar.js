"use client";

export default function SearchBar({ onSearch }) {
  return (
    <div style={{ padding: "10px" }}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          const value = e.target.value;
          console.log("SEARCH TEXT:", value); // 🔥 ye zaroor print hoga
          onSearch(value); // 🔥 yahin se search trigger hota hai
        }}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
        }}
      />
    </div>
  );
}
