"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* 🎨 Professional Colors */
const COLORS = {
  primary: "#16a34a",   // checkout / total
  secondary: "#f59e0b",
  text: "#111827",
  muted: "#6b7280",
  bg: "#f9fafb",
  border: "#e5e7eb",
};

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  /* 🚀 Fast load cart */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

  if (cart.length === 0) {
    return (
      <p style={empty}>
        🛒 Cart is empty
      </p>
    );
  }

  return (
    <div style={wrap}>
      <h2 style={title}>🛒 Your Cart</h2>

      {cart.map(item => (
        <div key={item.id} style={card}>
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            style={img}
          />

          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <p style={muted}>Qty: {item.qty}</p>
            <p style={price}>₹{item.total}</p>
          </div>
        </div>
      ))}

      <h3 style={total}>
        Grand Total:{" "}
        <span style={{ color: COLORS.primary }}>
          ₹{grandTotal}
        </span>
      </h3>

      <button
        style={btn(COLORS.primary)}
        onClick={() => router.push("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

/* 🎨 Styles */
const wrap = {
  padding: 20,
  maxWidth: 700,
  margin: "auto",
  background: COLORS.bg,
  minHeight: "100vh",
};

const title = {
  marginBottom: 15,
  color: COLORS.text,
};

const card = {
  display: "flex",
  gap: 12,
  padding: 12,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  marginBottom: 12,
  background: "#fff",
};

const img = {
  width: 80,
  height: 80,
  objectFit: "cover",
  borderRadius: 8,
};

const price = {
  color: COLORS.primary,
  fontWeight: "bold",
  marginTop: 4,
};

const muted = {
  color: COLORS.muted,
  fontSize: 14,
};

const total = {
  marginTop: 16,
  fontSize: 18,
};

const btn = bg => ({
  width: "100%",
  padding: 14,
  marginTop: 16,
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
  cursor: "pointer",
});

const empty = {
  padding: 40,
  textAlign: "center",
  color: COLORS.muted,
  fontSize: 18,
};
