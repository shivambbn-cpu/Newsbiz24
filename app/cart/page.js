"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  /* 🔹 Load cart */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  /* 🔹 Update localStorage */
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  /* ➕ Increase qty */
  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id
        ? {
            ...item,
            qty: item.qty + 1,
            total: (item.qty + 1) * item.price,
          }
        : item
    );
    saveCart(updated);
  };

  /* ➖ Decrease qty */
  const decreaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id && item.qty > 1
        ? {
            ...item,
            qty: item.qty - 1,
            total: (item.qty - 1) * item.price,
          }
        : item
    );
    saveCart(updated);
  };

  /* 🗑️ Delete item */
  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    saveCart(updated);
  };

  /* 🧮 Total amount */
  const grandTotal = cart.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );

  if (cart.length === 0) {
    return <p style={{ padding: 40 }}>🛒 Cart is empty</p>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2 style={{ marginBottom: 20 }}>🛒 Your Cart</h2>

      {cart.map(item => (
        <div key={item.id} style={card}>
          <img src={item.image} style={img} />

          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p style={{ color: "green", fontWeight: "bold" }}>
              ₹{item.price} रुपये
            </p>

            {/* ➕➖ QTY */}
            <div style={qtyRow}>
              <button style={qtyBtn} onClick={() => decreaseQty(item.id)}>
                −
              </button>
              <span>{item.qty}</span>
              <button style={qtyBtn} onClick={() => increaseQty(item.id)}>
                +
              </button>

              {/* 🗑️ DELETE */}
              <button
                style={deleteBtn}
                onClick={() => removeItem(item.id)}
              >
                🗑️
              </button>
            </div>
          </div>

          <b>₹{item.total}</b>
        </div>
      ))}

      {/* 🔹 TOTAL */}
      <h3 style={{ textAlign: "right", marginTop: 20 }}>
        Total: ₹{grandTotal} रुपये
      </h3>

      <button
        style={checkoutBtn}
        onClick={() => router.push("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

/* 🎨 STYLES */
const card = {
  display: "flex",
  gap: 12,
  marginBottom: 14,
  border: "1px solid #e5e7eb",
  padding: 12,
  borderRadius: 12,
  alignItems: "center",
};

const img = {
  width: 80,
  height: 80,
  objectFit: "cover",
  borderRadius: 8,
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 6,
};

const qtyBtn = {
  width: 30,
  height: 30,
  borderRadius: 6,
  border: "1px solid #ccc",
  background: "#fff",
  fontSize: 18,
};

const deleteBtn = {
  marginLeft: 10,
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer",
};

const checkoutBtn = {
  width: "100%",
  padding: 14,
  marginTop: 20,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
};
