"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductPage() {
  const params = useParams(); // ✅ IMPORTANT FIX
  const router = useRouter();
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const ref = doc(db, "shop_products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProduct({ id, ...snap.data() });
        } else {
          console.log("❌ No such product");
        }
      } catch (err) {
        console.error("🔥 Product load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <p style={{ padding: 40 }}>Loading product...</p>;
  if (!product) return <p style={{ padding: 40 }}>Product not found</p>;

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={250}
      />

      <h2>{product.name}</h2>
      <h3 style={{ color: "green" }}>₹{product.price}</h3>
      <p>{product.description}</p>

      <button
        style={btn("#f0ad4e")}
        onClick={() => alert("Added to cart")}
      >
        Add to Cart
      </button>

      <button
        style={btn("#4caf50")}
        onClick={() => router.push(`/checkout/${id}`)}
      >
        Buy Now
      </button>
    </div>
  );
}

const btn = (bg) => ({
  width: "100%",
  padding: 12,
  marginTop: 10,
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: 6,
});
