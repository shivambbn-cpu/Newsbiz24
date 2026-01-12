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
          id: doc.id,
          ...doc.data(),
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
    return (
      <p style={{ textAlign: "center", padding: 40 }}>
        Loading shop...
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: 40 }}>
        😔 No products available
      </p>
    );
  }

  return (
    <div className="shop-page">
      <h1 className="shop-title">🛍️ hOur Shop</h1>

      <div className="shop-grid">
        {products.map((item) => (
          <div className="shop-card" key={item.id}>
            {/* 🔹 IMAGE CLICK → PRODUCT DETAIL */}
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                className="shop-img"
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/product/${item.id}`)}
              />
            )}

            <h3>{item.name}</h3>
            <p className="price">₹{item.price}</p>

            {/* 🔹 BUY NOW → ORDER PAGE */}
            <button
              className="buy-btn"
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



