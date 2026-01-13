"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "shop_products", id);
        const snap = await getDoc(productRef);

        if (snap.exists()) {
          const data = snap.data();

          // 🔒 inactive product hide
          if (!data.active) {
            alert("Product not available");
            router.push("/shop");
            return;
          }

          setProduct({ id: snap.id, ...data });
        } else {
          alert("Product not found");
          router.push("/shop");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!product) return null;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        style={{ width: "100%", height: "auto", borderRadius: 12 }}
      />

      <h1 style={{ marginTop: 16 }}>{product.name}</h1>
      <h2 style={{ color: "#2e7d32" }}>₹{product.price}</h2>

      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        {product.description}
      </p>

      <button
        onClick={() => router.push(`/checkout/${product.id}`)}
        style={{
          width: "100%",
          marginTop: 20,
          padding: 14,
          background: "#ff5722",
          color: "#fff",
          fontSize: 16,
          border: "none",
          borderRadius: 8,
        }}
      >
        Buy Now
      </button>
    </div>
  );
}

        
