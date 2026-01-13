"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, "shop_products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={350}
        style={{ borderRadius: 10 }}
      />

      <h1>{product.name}</h1>
      <h2 style={{ color: "#4caf50" }}>₹{product.price}</h2>

      <p>{product.description}</p>

      <button
        style={btnStyle("#4caf50")}
        onClick={() => router.push(`/checkout/${product.id}`)}
      >
        Buy Now
      </button>
    </div>
  );
}

const btnStyle = (bg) => ({
  width: "100%",
  padding: 12,
  marginTop: 20,
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 16
});




    
