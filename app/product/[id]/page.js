"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const ref = doc(db, "shop_products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        }
      } catch (e) {
        console.error("Firestore error:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center" }}>Loading…</p>;
  }

  if (!product) {
    return <p style={{ padding: 40, textAlign: "center" }}>❌ Product not found</p>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: 350,
            objectFit: "cover",
            borderRadius: 10
          }}
        />
      )}

      <h1>{product.name}</h1>
      <h2 style={{ color: "#4caf50" }}>₹{product.price}</h2>

      <p>{product.description}</p>

      <button
        onClick={() => router.push(`/checkout/${product.id}`)}
        style={{
          width: "100%",
          padding: 12,
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16
        }}
      >
        Buy Now
      </button>
    </div>
  );
}

    
