"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter(); // 🔥 ADD THIS

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const ref = doc(db, "shop_products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

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

      <h2 style={{ color: "green", marginTop: 10 }}>
        ₹{product.price}
      </h2>

      <p style={{ marginTop: 10 }}>{product.description}</p>

      {/* 🔥 BUY NOW BUTTON FIXED */}
      <button
        onClick={() => router.push(`/checkout/${product.id}`)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 15,
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
