"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [qtyMap, setQtyMap] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  /* 🔹 Products fetch */
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
    updateCartCount();
  }, []);

  /* 🧮 Cart count (UNIQUE products only) */
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length); // ✅ FIX (no 47 / 48 bug)
  };

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
    updateCartCount();
  };

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center" }}>Loading…</p>;
  }

  return (
    <>
      {/* 🔝 HEADER (same as before, only count fixed) */}
      <header style={headerStyle}>
        <span style={{ fontWeight: "bold", color: "#16a34a" }}>
          TULSIMALASTORE
        </span>

        <div style={{ position: "relative" }}>
          🛒
          {cartCount > 0 && (
            <span style={cartBadge}>{cartCount}</span>
          )}
        </div>
      </header>

      {/* 🛍️ PRODUCTS */}
      <div style={{ padding: 16 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          🌿 Our Spiritual Products
        </h2>

        <div style={grid}>
          {products.map(item => (
            <div key={item.id} style={card}>
              <img src={item.image} alt={item.name} style={img} />

              <h3>{item.name}</h3>
              <p style={{ color: "#16a34a", fontWeight: "bold" }}>
                ₹{item.price}
              </p>

              {/* Quantity */}
              <div style={qtyRow}>
                <button
                  style={qtyBtn}
                  onClick={() =>
                    setQtyMap(q => ({
                      ...q,
                      [item.id]: Math.max(1, q[item.id] - 1),
                    }))
                  }
                >
                  −
                </button>

                <span>{qtyMap[item.id]}</span>

                <button
                  style={qtyBtn}
                  onClick={() =>
                    setQtyMap(q => ({
                      ...q,
                      [item.id]: q[item.id] + 1,
                    }))
                  }
                >
                  +
                </button>
              </div>

              <button style={addBtn} onClick={() => addToCart(item)}>
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* 🎨 styles */
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  borderBottom: "1px solid #e5e7eb",
  position: "sticky",
  top: 0,
  background: "#fff",
  zIndex: 10,
};

const cartBadge = {
  position: "absolute",
  top: -6,
  right: -10,
  background: "red",
  color: "#fff",
  fontSize: 12,
  borderRadius: "50%",
  padding: "2px 6px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: 20,
};

const card = {
  border: "1px solid #e5e7eb",
  borderRadius: 14,
  padding: 12,
  background: "#fff",
};

const img = {
  width: "100%",
  height: 180,
  objectFit: "cover",
  borderRadius: 12,
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 8,
};

const qtyBtn = {
  width: 34,
  height: 34,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  fontSize: 18,
};

const addBtn = {
  width: "100%",
  marginTop: 12,
  padding: 12,
  background: "#f59e0b",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};
