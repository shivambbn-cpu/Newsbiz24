"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [showActions, setShowActions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "shop_products"));
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Product added to cart");
  };

  const handleBuyNowClick = (productId) => {
    setShowActions(productId);
  };

  if (loading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading…</p>;
  }

  return (
    <div style={{ padding: 14 }}>
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>🛍 Our Products</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: 12,
              background: "#fff",
            }}
          >
            {/* PRODUCT IMAGE */}
            <img
              src={p.image}
              alt={p.name}
              style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10 }}
            />

            {/* PRODUCT NAME */}
            <h4 style={{ margin: "10px 0" }}>{p.name}</h4>

            {/* PRICE */}
            <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 6 }}>₹ {p.price}</div>

            {/* FEATURES */}
            <div style={{ display: "flex", gap: 12, color: "#16a34a", fontSize: 12, marginBottom: 10 }}>
              <span>🔒 Secure</span>
              <span>🚚 Fast Ship</span>
              <span>✅ Quality</span>
            </div>

            {/* BUY NOW / ADD TO CART */}
            {showActions === p.id ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    width: "100%",
                    padding: 12,
                    background: "#f1f1f1",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    fontWeight: "bold",
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => router.push(`/checkout/${p.id}`)}
                  style={{
                    width: "100%",
                    padding: 14,
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: "bold",
                  }}
                >
                  Buy Now
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleBuyNowClick(p.id)}
                style={{
                  width: "100%",
                  padding: 14,
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: "bold",
                }}
              >
                Buy Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  }
