"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const snap = await getDoc(doc(db, "shop_products", id));
      if (snap.exists()) setProduct(snap.data());
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", padding: 40 }}>Loading product...</p>;
  if (!product) return <p style={{ textAlign: "center", padding: 40 }}>Product not found</p>;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex >= 0) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart");
  };

  const buyNow = () => {
    addToCart(); // add to cart first
    router.push(`/order/${id}`); // go to Cash on Delivery page
  };

  return (
    <div className="product-detail" style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      {product.image && (
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          style={{ borderRadius: 8 }}
        />
      )}

      <h1 style={{ marginTop: 20 }}>{product.name}</h1>
      <h2 style={{ color: "#4caf50", margin: "10px 0" }}>₹{product.price}</h2>

      {/* Quantity selector */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <button
          onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
          style={{ padding: "5px 10px" }}
        >-</button>
        <span style={{ margin: "0 10px" }}>{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          style={{ padding: "5px 10px" }}
        >+</button>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={addToCart}
          style={{
            flex: 1,
            padding: "10px 0",
            backgroundColor: "#f0ad4e",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={buyNow}
          style={{
            flex: 1,
            padding: "10px 0",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

    
