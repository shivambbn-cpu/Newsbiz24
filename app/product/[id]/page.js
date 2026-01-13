"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const ref = doc(db, "shop_products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Product fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <p style={{ padding: 40, textAlign: "center" }}>
        Loading product...
      </p>
    );
  }

  if (!product) {
    return (
      <p style={{ padding: 40, textAlign: "center" }}>
        ❌ Product not found
      </p>
    );
  }

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 600,
        margin: "auto"
      }}
    >
      {/* Product Image */}
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

      {/* Product Info */}
      <h1 style={{ marginTop: 15 }}>{product.name}</h1>

      <h2 style={{ color: "#4caf50", margin: "10px 0" }}>
        ₹{product.price}
      </h2>

      {product.description && (
        <p style={{ lineHeight: 1.6 }}>
          {product.description}
        </p>
      )}

      {/* Buy Now */}
      <button
        style={btnStyle("#4caf50")}
        onClick={() => router.push(`/checkout/${product.id}`)}
      >
        Buy Now
      </button>
    </div>
  );
}

const btnStyle = (bg) => ({
  width: "100%",
  padding: 12,
  marginTop: 20,
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 16,
  cursor: "pointer"
});

        
