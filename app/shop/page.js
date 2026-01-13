"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔹 Fetch products */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "shop_products"),
          where("active", "==", true)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (err) {
        console.error("Firestore error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p style={{ padding: 40, textAlign: "center" }}>
        Loading shop...
      </p>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        🛍️ Our Shop
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 20,
        }}
      >
        {products.map(item => (
          <div
            key={item.id}
            onClick={() => router.push(`/product/${item.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 10,
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  maxHeight: 180,
                  objectFit: "cover",
                }}
              />
            )}

            <h3 style={{ margin: "10px 0" }}>
              {item.name}
            </h3>

            <p
              style={{
                color: "#4caf50",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
