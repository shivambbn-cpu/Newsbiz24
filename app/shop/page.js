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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "shop_products"),
          where("active", "==", true)
        );

        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,        // Firestore document ID
          ...doc.data(),      // name, price, image, description
        }));

        setProducts(data);
      } catch (err) {
        console.error("Shop load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading shop...</p>;
  }

  if (products.length === 0) {
    return <p style={{ textAlign: "center", padding: 40 }}>😔 No products available</p>;
  }

  return (
    <div className="shop-page" style={{ padding: 20 }}>
      <h1 className="shop-title" style={{ textAlign: "center", marginBottom: 20 }}>
        🛍️ Our Shop
      </h1>

      <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {products.map((item) => (
          <div key={item.id} className="shop-card" style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10, textAlign: "center" }}>
            
            {/* 🔹 Image click → Product Detail */}
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                style={{ cursor: "pointer", borderRadius: 8 }}
                onClick={() => router.push(`/product/${item.id}`)}
              />
            )}

            <h3 style={{ margin: "10px 0" }}>{item.name}</h3>
            <p style={{ color: "#4caf50", fontWeight: "bold" }}>₹{item.price}</p>
            {item.description && <p style={{ fontSize: 14, color: "#555" }}>{item.description}</p>}

            {/* 🔹 Buy Now → Order Page (Cash on Delivery) */}
            <button
              style={{
                marginTop: 10,
                padding: "10px 0",
                width: "100%",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
              onClick={() => router.push(`/order/${item.id}`)}
            >
              Buy Now (Cash on Delivery)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

          
