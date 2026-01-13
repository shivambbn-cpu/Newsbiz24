"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1); // 🔹 Quantity state

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const ref = doc(db, "shop_products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) setProduct({ id: snap.id, ...snap.data() });
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  /* 🔹 Add to Cart with quantity */
  const addToCart = (item, qty) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(p => p.id === item.id);

    if (index >= 0) cart[index].qty += qty;
    else cart.push({ ...item, qty });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Added ${qty} item(s) to cart`);
  };

  /* 🔹 Buy Now with quantity */
  const handleBuyNow = (item) => {
    router.push(`/checkout/${item.id}?qty=${qty}`);
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!product) return <p>❌ Product not found</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: 10 }}
      />

      <h2 style={{ color: "green", marginTop: 10 }}>₹{product.price}</h2>

      <p style={{ marginTop: 10 }}>{product.description}</p>

      {/* 🔹 Quantity selector */}
      <div style={{ marginTop: 15, display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          style={qtyBtn}
        >
          -
        </button>
        <span>{qty}</span>
        <button
          onClick={() => setQty(q => q + 1)}
          style={qtyBtn}
        >
          +
        </button>
      </div>

      {/* 🔹 Add to Cart */}
      <button
        style={btnStyle("#f0ad4e")}
        onClick={() => addToCart(product, qty)}
      >
        Add to Cart
      </button>

      {/* 🔹 Buy Now */}
      <button
        style={btnStyle("#4caf50")}
        onClick={() => handleBuyNow(product)}
      >
        Buy Now
      </button>
    </div>
  );
}

/* 🔹 Styles */
const btnStyle = (bg) => ({
  width: "100%",
  padding: 12,
  marginTop: 12,
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 16,
  cursor: "pointer"
});

const qtyBtn = {
  width: 30,
  height: 30,
  borderRadius: 6,
  border: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
  fontSize: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
