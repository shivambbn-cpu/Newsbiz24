"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  /* 🔹 Fetch products */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
      } catch (err) {
        console.error("Firestore error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* 🛒 Cart count (localStorage) */
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    setCartCount(totalQty);
  }, []);

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center" }}>Loading shop...</p>;
  }

  return (
    <div>
      {/* 🔶 TOP NOTICE BAR */}
      <div style={topBar}>
        🚚 Cash on Delivery • Free Shipping Available
      </div>

      {/* 🔶 HEADER */}
      <header style={header}>
        <span style={menuIcon} onClick={() => setMenuOpen(true)}>☰</span>

        <h1 style={logo}>TULSIMALASTORE</h1>

        {/* 🛒 CART ICON */}
        <div style={cartWrap} onClick={() => router.push("/cart")}>
          <span style={cartIcon}>🛒︎</span>
          {cartCount > 0 && (
            <span style={cartBadge}>{cartCount}</span>
          )}
        </div>
      </header>

      {/* 🔶 SIDE MENU */}
      {menuOpen && (
        <div style={overlay} onClick={() => setMenuOpen(false)}>
          <div style={sideMenu} onClick={e => e.stopPropagation()}>
            <div style={sideHeader}>
              <span onClick={() => setMenuOpen(false)}>✕</span>
              <b>TULSIMALASTORE</b>
            </div>

            <ul style={menuList}>
              <li onClick={() => router.push("/")}>Home</li>
              <li>Kanthi Mala</li>
              <li>Japa Mala</li>
              <li>Black & Brown Mala</li>
              <li>Hand Bracelet Tulsi</li>
              <li>Japa Bag</li>
              <li>Tulsi Locket Mala</li>
            </ul>

            <hr />

            <ul style={menuList}>
              <li>📦 DTDC Tracking</li>
              <li>📦 Xpressbees Tracking</li>
              <li>📦 Indian Post Tracking</li>
            </ul>
          </div>
        </div>
      )}

      {/* 🔶 SHOP GRID */}
      <div style={container}>
        <h2 style={title}>🌿 Our Spiritual Products</h2>

        <div style={grid}>
          {products.map(item => (
            <div
              key={item.id}
              style={card}
              onClick={() => router.push(`/product/${item.id}`)}
            >
              {item.image && (
                <img src={item.image} alt={item.name} style={image} />
              )}

              <h3 style={productName}>{item.name}</h3>
              <p style={price}>₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const topBar = {
  background: "#b8860b",
  color: "#fff",
  padding: 8,
  fontSize: 14,
  textAlign: "center",
};

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  background: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

const menuIcon = { fontSize: 24, cursor: "pointer" };
const logo = { fontSize: 18, color: "#1f7a3f", fontWeight: "bold" };

/* 🛒 CART STYLES */
const cartWrap = {
  position: "relative",
  cursor: "pointer",
};

const cartIcon = {
  fontSize: 26,
};

const cartBadge = {
  position: "absolute",
  top: -6,
  right: -10,
  background: "#000",
  color: "#fff",
  borderRadius: "50%",
  fontSize: 12,
  width: 18,
  height: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  zIndex: 100,
};

const sideMenu = {
  width: 280,
  height: "100%",
  background: "#fff",
  padding: 20,
  overflowY: "auto",
};

const sideHeader = {
  display: "flex",
  gap: 15,
  alignItems: "center",
  fontSize: 18,
  marginBottom: 20,
};

const menuList = {
  listStyle: "none",
  padding: 0,
  fontSize: 16,
  lineHeight: "2.2em",
};

const container = { padding: 20 };
const title = { textAlign: "center", marginBottom: 20 };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
  gap: 16,
};

const card = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 10,
  textAlign: "center",
  cursor: "pointer",
  background: "#fff",
};

const image = {
  width: "100%",
  height: 150,
  objectFit: "cover",
  borderRadius: 10,
};

const productName = { margin: "10px 0 5px" };
const price = { color: "#1f7a3f", fontWeight: "bold", fontSize: 18 };
