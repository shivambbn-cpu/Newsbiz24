"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

/* 🎨 Professional Colors */
const COLORS = {
  primary: "#16a34a",   // Buy / Total
  secondary: "#f59e0b", // Add to cart
  text: "#111827",
  muted: "#6b7280",
  bg: "#f9fafb",
  border: "#e5e7eb",
};

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);

  /* 🚀 Fetch product (FAST) */
  useEffect(() => {
    if (!id) return;

    (async () => {
      const ref = doc(db, "shop_products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = { id: snap.id, ...snap.data() };
        setProduct(data);
        setTotal(data.price);
      }
      setLoading(false);
    })();
  }, [id]);

  /* 🔢 Auto total calc */
  useEffect(() => {
    if (product) {
      setTotal(product.price * qty);
    }
  }, [qty, product]);

  /* 🛒 Add to Cart */
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(p => p.id === product.id);

    if (index >= 0) {
      cart[index].qty += qty;
      cart[index].total += total;
    } else {
      cart.push({ ...product, qty, total });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Added ${qty} item(s)\nTotal ₹${total}`);
  };

  /* 🧾 Buy Now */
  const handleBuyNow = () => {
    router.push(`/checkout/${product.id}?qty=${qty}&total=${total}`);
  };

  if (loading) {
    return (
      <p style={{ padding: 40, textAlign: "center", color: COLORS.muted }}>
        Loading product...
      </p>
    );
  }

  if (!product) {
    return <p style={{ padding: 40 }}>❌ Product not found</p>;
  }

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 600,
        margin: "auto",
        background: COLORS.bg,
        color: COLORS.text,
      }}
    >
      <h1 style={{ fontSize: 22 }}>{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        loading="lazy" // 🚀 FAST
        style={{
          width: "100%",
          borderRadius: 12,
          marginTop: 10,
        }}
      />

      <h2 style={{ color: COLORS.primary, marginTop: 12 }}>
        ₹{product.price} / item
      </h2>

      <p style={{ marginTop: 8, color: COLORS.muted }}>
        {product.description}
      </p>

      {/* 🔢 Quantity */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          style={qtyBtn}
        >
          −
        </button>

        <span style={{ fontSize: 18 }}>{qty}</span>

        <button
          onClick={() => setQty(q => q + 1)}
          style={qtyBtn}
        >
          +
        </button>
      </div>

      {/* 💰 Total */}
      <h3 style={{ marginTop: 16 }}>
        Total:&nbsp;
        <span style={{ color: COLORS.primary }}>
          ₹{total}
        </span>
      </h3>

      {/* 🛒 Add to Cart */}
      <button
        style={btnStyle(COLORS.secondary)}
        onClick={addToCart}
      >
        Add to Cart
      </button>

      {/* 🟢 Buy Now */}
      <button
        style={btnStyle(COLORS.primary)}
        onClick={handleBuyNow}
      >
        Buy Now
      </button>
    </div>
  );
}

/* 🎨 Styles */
const btnStyle = (bg) => ({
  width: "100%",
  padding: 14,
  marginTop: 12,
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
  cursor: "pointer",
});

const qtyBtn = {
  width: 36,
  height: 36,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  fontSize: 20,
};
