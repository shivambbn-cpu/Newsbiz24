"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [showActions, setShowActions] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    setShowActions(product.id);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  return (
    <div style={{ padding: 14 }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 12,
            marginBottom: 18,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {/* PRODUCT IMAGE */}
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 10,
            }}
          />

          {/* PRODUCT TITLE */}
          <h3 style={{ marginTop: 10, fontSize: 18 }}>
            {product.title}
          </h3>

          {/* PRICE (NO DISCOUNT) */}
          <div style={{ fontSize: 20, fontWeight: "bold", margin: "6px 0" }}>
            ₹ {product.price}
          </div>

          {/* TRUST BADGES */}
          <div style={{ color: "green", fontSize: 14 }}>
            <div>🛡 Secure</div>
            <div>🚚 Fast Ship</div>
            <div>✅ Quality</div>
          </div>

          {/* BUY NOW BUTTON */}
          {!showActions && (
            <button
              onClick={() => handleBuyNow(product)}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 14,
                background: "#000",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Buy Now
            </button>
          )}

          {/* AFTER CLICK → ADD TO CART + BUY NOW */}
          {showActions === product.id && (
            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: "100%",
                  padding: 12,
                  background: "#f1f1f1",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  marginBottom: 8,
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={() => router.push("/checkout")}
                style={{
                  width: "100%",
                  padding: 14,
                  background: "#000",
                  color: "#fff",
                  borderRadius: 8,
                  border: "none",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
