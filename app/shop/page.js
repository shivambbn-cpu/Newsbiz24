"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null); // 🔥 NEW

  useEffect(() => {
    const fetchProducts = async () => {
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
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center", padding: 40 }}>Loading shop...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>🛍️ Our Shop</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
        {products.map((item) => {

          // 🔹 IF SELECTED → ONLY IMAGE + TITLE
          if (selectedId === item.id) {
            return (
              <div
                key={item.id}
                style={{
                  border: "2px solid #4caf50",
                  padding: 15,
                  borderRadius: 8,
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => router.push(`/product/${item.id}`)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={280}
                  height={180}
                  style={{ borderRadius: 8 }}
                />
                <h3 style={{ marginTop: 10 }}>{item.name}</h3>
                <p style={{ fontSize: 13, color: "#777" }}>
                  Click to view details →
                </p>
              </div>
            );
          }

          // 🔹 NORMAL CARD
          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 10,
                textAlign: "center",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                style={{ borderRadius: 8 }}
              />

              <h3 style={{ margin: "10px 0" }}>{item.name}</h3>
              <p style={{ color: "#4caf50", fontWeight: "bold" }}>
                ₹{item.price}
              </p>

              <button
                style={{
                  marginTop: 10,
                  padding: "10px 0",
                  width: "100%",
                  backgroundColor: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
                onClick={() => setSelectedId(item.id)} // 🔥 ONLY IMAGE + TITLE MODE
              >
                Add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

    
