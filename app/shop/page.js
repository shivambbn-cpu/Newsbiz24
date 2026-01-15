"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [openId, setOpenId] = useState(null); // 👈 selected product
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  /* 🔹 Fetch products */
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

  /* 🛒 Add to Cart */
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty,
      total: product.price * qty,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Cart में add हो गया");
  };

  /* ⚡ Buy Now */
  const buyNow = (product) => {
    router.push(`/checkout/${product.id}?qty=${qty}`);
  };

  if (loading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading…</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        🛍 Our Shop
      </h2>

      {/* 🔹 PRODUCT LIST (पहले सब दिखेंगे) */}
      {openId === null && (
        <div style={grid}>
          {products.map(item => (
            <div key={item.id} style={card}>
              <img src={item.image} style={img} />

              <h3>{item.name}</h3>

              <p style={{ color: "green", fontWeight: "bold" }}>
                ₹{item.price} रुपये
              </p>

              <button
                style={addBtn}
                onClick={() => {
                  setOpenId(item.id); // 👈 बाकी hide
                  setQty(1);
                }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 SINGLE PRODUCT VIEW */}
      {openId !== null && (
        <>
          {products
            .filter(p => p.id === openId)
            .map(item => (
              <div key={item.id} style={singleCard}>
                <img src={item.image} style={img} />

                <h2>{item.name}</h2>

                <p style={{ color: "green", fontWeight: "bold" }}>
                  ₹{item.price} रुपये
                </p>

                {/* Qty */}
                <div style={qtyRow}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={qtyBtn}
                  >
                    −
                  </button>
                  <span>{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    style={qtyBtn}
                  >
                    +
                  </button>
                </div>

                <button
                  style={cartBtn}
                  onClick={() => addToCart(item)}
                >
                  🛒 Add to Cart
                </button>

                <button
                  style={buyBtn}
                  onClick={() => buyNow(item)}
                >
                  ⚡ Buy Now
                </button>

                {/* 🔙 BACK */}
                <button
                  style={backBtn}
                  onClick={() => setOpenId(null)}
                >
                  ← Back to Products
                </button>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

/* 🎨 STYLES */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 20,
};

const card = {
  border: "1px solid #ddd",
  borderRadius: 14,
  padding: 12,
  background: "#fff",
};

const singleCard = {
  border: "1px solid #ddd",
  borderRadius: 14,
  padding: 16,
  background: "#fff",
};

const img = {
  width: "100%",
  height: 220,
  objectFit: "cover",
  borderRadius: 12,
};

const addBtn = {
  width: "100%",
  padding: 12,
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};

const qtyRow = {
  display: "flex",
  justifyContent: "center",
  gap: 16,
  margin: "16px 0",
};

const qtyBtn = {
  width: 36,
  height: 36,
  borderRadius: 8,
  border: "1px solid #ccc",
  background: "#fff",
  fontSize: 18,
};

const cartBtn = {
  width: "100%",
  padding: 12,
  background: "#f59e0b",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  marginBottom: 10,
};

const buyBtn = {
  width: "100%",
  padding: 12,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};

const backBtn = {
  width: "100%",
  padding: 10,
  marginTop: 12,
  background: "#eee",
  border: "none",
  borderRadius: 8,
};
