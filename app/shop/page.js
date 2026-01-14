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

  /* 🛒 Cart count */
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((a, b) => a + b.qty, 0));
  }, []);

  /* 🔹 Fetch products */
  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(
        collection(db, "shop_products"),
        where("active", "==", true)
      );
      const snap = await getDocs(q);
      setProducts(
        snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const go = (path) => {
    setMenuOpen(false);
    router.push(path);
  };

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center" }}>Loading shop...</p>;
  }

  return (
    <div>
      {/* 🔶 TOP BAR */}
      <div style={topBar}>🚚 Cash on Delivery • Free Shipping Available</div>

      {/* 🔶 HEADER */}
      <header style={header}>
        <span style={menuIcon} onClick={() => setMenuOpen(true)}>☰</span>
        <h1 style={logo}>TULSIMALASTORE</h1>

        <span style={cart} onClick={() => router.push("/cart")}>
          🛒 {cartCount > 0 && <small>({cartCount})</small>}
        </span>
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
              <li onClick={() => go("/")}>🏠 Home</li>
              <li onClick={() => go("/category/kanthi-mala")}>Kanthi Mala</li>
              <li onClick={() => go("/category/japa-mala")}>Japa Mala</li>
              <li onClick={() => go("/category/black-brown")}>Black & Brown Mala</li>
              <li onClick={() => go("/category/bracelet")}>Hand Bracelet Tulsi</li>
              <li onClick={() => go("/category/japa-bag")}>Japa Bag</li>
              <li onClick={() => go("/category/locket")}>Tulsi Locket Mala</li>
            </ul>

            <hr />

            <ul style={menuList}>
              <li onClick={() => window.open("https://www.dtdc.in/tracking.asp")}>
                📦 DTDC Tracking
              </li>
              <li onClick={() => window.open("https://www.xpressbees.com/track")}>
                📦 Xpressbees Tracking
              </li>
              <li onClick={() => window.open("https://www.indiapost.gov.in")}>
                📦 Indian Post Tracking
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 🔶 PRODUCTS */}
      <div style={container}>
        <h2 style={title}>🌿 Our Spiritual Products</h2>

        <div style={grid}>
          {products.map(item => (
            <div
              key={item.id}
              style={card}
              onClick={() => router.push(`/product/${item.id}`)}
            >
              <img src={item.image} alt={item.name} style={image} />
              <h3 style={productName}>{item.name}</h3>
              <p style={price}>₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES (unchanged) ===== */
const topBar = { background: "#b8860b", color: "#fff", padding: 8, textAlign: "center" };
const header = { display: "flex", justifyContent: "space-between", padding: 12, borderBottom: "1px solid #eee", position: "sticky", top: 0, background: "#fff" };
const menuIcon = { fontSize: 24, cursor: "pointer" };
const cart = { fontSize: 22, cursor: "pointer" };
const logo = { fontSize: 18, color: "#1f7a3f", fontWeight: "bold" };

const overlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 100 };
const sideMenu = { width: 280, height: "100%", background: "#fff", padding: 20 };
const sideHeader = { display: "flex", gap: 15, marginBottom: 20, fontSize: 18 };

const menuList = {
  listStyle: "none",
  padding: 0,
  fontSize: 16,
  lineHeight: "2.2em",
  cursor: "pointer"
};

const container = { padding: 20 };
const title = { textAlign: "center", marginBottom: 20 };

const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16 };
const card = { border: "1px solid #eee", borderRadius: 12, padding: 10, cursor: "pointer", background: "#fff" };
const image = { width: "100%", height: 150, objectFit: "cover", borderRadius: 10 };
const productName = { margin: "10px 0 5px" };
const price = { color: "#1f7a3f", fontWeight: "bold", fontSize: 18 };
