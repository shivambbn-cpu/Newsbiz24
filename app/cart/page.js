"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  if (cart.length === 0) {
    return <p style={{ padding: 40 }}>🛒 Cart is empty</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Your Cart</h2>

      {cart.map(item => (
        <div key={item.id} style={card}>
          <img src={item.image} style={img} />
          <div>
            <h4>{item.name}</h4>
            <p>Qty: {item.qty}</p>
            <p>₹{item.total}</p>
          </div>
        </div>
      ))}

      <button
        style={btn}
        onClick={() => router.push("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

const card = {
  display: "flex",
  gap: 12,
  marginBottom: 12,
  border: "1px solid #ddd",
  padding: 10,
  borderRadius: 10,
};

const img = {
  width: 80,
  height: 80,
  objectFit: "cover",
  borderRadius: 8,
};

const btn = {
  width: "100%",
  padding: 14,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
};
