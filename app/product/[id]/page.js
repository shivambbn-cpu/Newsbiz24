"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "shop_products", id)); // ✅ FIXED
      if (snap.exists()) setProduct(snap.data());
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">

      {product.image && (
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
        />
      )}

      <h1>{product.name}</h1>
      <h2>₹{product.price}</h2>

      {/* ✅ COD FLOW */}
      <button
        className="buy-now"
        onClick={() => router.push(`/order/${id}`)}
      >
        Buy Now (Cash on Delivery)
      </button>

    </div>
  );
}

    
