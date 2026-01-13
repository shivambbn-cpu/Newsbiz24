

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProductPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "shop_products", id));
      if (snap.exists()) setProduct({ id, ...snap.data() });
    };
    load();
  }, [id]);

  if (!product) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart");
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <Image src={product.image} alt={product.name} width={400} height={250} />

      <h2>{product.name}</h2>
      <h3 style={{ color: "#4caf50" }}>₹{product.price}</h3>

      <p>{product.description}</p>

      <button style={btn("#f0ad4e")} onClick={addToCart}>
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


               


  

  
