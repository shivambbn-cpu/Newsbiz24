"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔢 quantity per product
  const [qtyMap, setQtyMap] = useState({});

  /* 🔹 Fetch products */
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

      // default qty = 1
      const qObj = {};
      data.forEach(p => (qObj[p.id] = 1));
      setQtyMap(qObj);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  /* 🛒 Add to Cart */
  const addToCart = (product) => {
    const qty = qtyMap[product.id] || 1;
    const total = product.price * qty;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(p => p.id === product.id);

    if (index >= 0) {
      cart[index].qty += qty;
      cart[index].total += total;
    } else {
      cart.push({ ...product, qty, total });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Added ${qty} item(s)`);
  };

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center" }}>Loading shop…</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        🛍️ Our Spiritual Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 20,
        }}
      >
        {products.map(item => (
          <div
            key={item.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: 12,
              background: "#fff",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                borderRadius: 12,
                maxHeight: 180,
                objectFit: "cover",
              }}
            />

            <h3 style={{ marginTop: 10 }}>{item.name}</h3>

            <p style={{ color: "#16a34a", fontSize: 18, fontWeight: "bold" }}>
              ₹{item.price}
            </p>

            {/* 🔢 Quantity */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 8,
              }}
            >
              <button
                onClick={() =>
                  setQtyMap(q => ({
                    ...q,
                    [item.id]: Math.max(1, q[item.id] - 1),
                  }))
                }
                style={qtyBtn}
              >
                −
              </button>

              <span>{qtyMap[item.id]}</span>

              <button
                onClick={() =>
                  setQtyMap(q => ({
                    ...q,
                    [item.id]: q[item.id] + 1,
                  }))
                }
                style={qtyBtn}
              >
                +
              </button>
            </div>

            {/* 🛒 Add to cart */}
            <button
              onClick={() => addToCart(item)}
              style={{
                width: "100%",
                marginTop: 12,
                padding: 12,
                background: "#f59e0b",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* styles */
const qtyBtn = {
  width: 34,
  height: 34,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  fontSize: 18,
  cursor: "pointer",
};
