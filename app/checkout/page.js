"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  /* 🔹 Load cart */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);

    const sum = data.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    );
    setTotal(sum);
  }, []);

  /* 🔹 Empty cart */
  if (cart.length === 0) {
    return (
      <div style={wrap}>
        <h2>🛒 Cart is empty</h2>
        <button onClick={() => router.push("/shop")} style={btn}>
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <h2>Checkout</h2>

      {cart.map((item, i) => (
        <div key={i} style={itemBox}>
          <img src={item.image} style={img} />
          <div>
            <p><b>{item.name}</b></p>
            <p>₹{item.price} × {item.qty}</p>
            <p><b>₹{item.price * item.qty}</b></p>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 15 }}>Total: ₹{total}</h3>

      <button
        style={btn}
        onClick={() => router.push("/order-success")}
      >
        Place Order
      </button>
    </div>
  );
}

/* styles */
const wrap = {
  maxWidth: 500,
  margin: "auto",
  padding: 20
};

const itemBox = {
  display: "flex",
  gap: 10,
  borderBottom: "1px solid #ddd",
  padding: "10px 0"
};

const img = {
  width: 70,
  borderRadius: 6
};

const btn = {
  width: "100%",
  padding: 14,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 15
};
