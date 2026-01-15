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
  const [cartCount, setCartCount] = useState(0);

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
      updateCartCount();
    };
    fetchProducts();
  }, []);

  /* 🧮 Cart count */
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce(
      (sum, item) => sum + Number(item.qty || 0),
      0
    );
    setCartCount(totalQty);
  };

  /* 🛒 Add to Cart */
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(p => p.id === product.id);

    if (index >= 0) {
      cart[index].qty += qty;
      cart[index].total += product.price * qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
        total: product.price * qty,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
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
    <>
      {/* 🔝 HEADER WITH CART */}
      <header style={header}>
        <b style={{ color: "#16a34a" }}>TULSIMALASTORE</b>

        <div
          style={{ position: "relative", cursor: "pointer", fontSize: 22 }}
          onClick={() => router.push("/cart")}
        >
          🛒
          {cartCount > 0 && (
            <span style={cartBadge}>{cartCount}</span>
          )}
        </div>
      </header>

      <div style={{ padding: 16 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          🛍 Our Shop
        </h2>

        {/* 🔹 PRODUCT LIST */}
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
                    setOpenId(item.id);
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
        {openId !== null &&
          products
            .filter(p => p.id === openId)
            .map(item => (
              <div key={item.id} style={singleCard}>
                <img src={item.image} style={img} />

                <h2>{item.name}</h2>

                <p style={{ color: "green", fontWeight: "bold" }}>
                  ₹{item.price} रुपये
                </p>

                <div style={qtyRow}>
                  <button
                    style={qtyBtn}
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span>{qty}</span>
                  <button
                    style={qtyBtn}
                    onClick={() => setQty(q => q + 1)}
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

                <button
                  style={backBtn}
                  onClick={() => setOpenId(null)}
                >
                  ← Back to Products
                </button>
              </div>
            ))}
      </div>
    </>
  );
}

/* 🎨 STYLES */
const header = {
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
