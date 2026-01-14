"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <p style={{ padding: 50, textAlign: "center", fontSize: 18 }}>
        🙏 Loading spiritual products...
      </p>
    );
  }

  return (
    <div style={pageWrap}>
      {/* 🔶 Top Notice */}
      <div style={noticeBar}>
        🇮🇳 Free delivery on prepaid orders above ₹300
      </div>

      {/* 🔶 Header */}
      <header style={header}>
        <span style={menu}>☰</span>
        <h1 style={logo}>NEWSBIZ24.in</h1>
        <span style={cart}>🛒</span>
      </header>

      {/* 🔶 Category Icons */}
      <div style={categoryWrap}>
        {categories.map(c => (
          <div key={c.title} style={catItem}>
            <div style={catCircle}>{c.icon}</div>
            <span>{c.title}</span>
          </div>
        ))}
      </div>

      {/* 🔶 Banner */}
      <div style={banner}>
        <h2>Hand-Crafted With Devotion</h2>
        <p>Purity & Tradition in Every Product</p>
      </div>

      {/* 🔶 Product Grid */}
      <h2 style={sectionTitle}>Our Sacred Collection</h2>

      <div style={grid}>
        {products.map(item => (
          <div
            key={item.id}
            onClick={() => router.push(`/product/${item.id}`)}
            style={card}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={image}
              />
            )}

            <h3 style={productName}>{item.name}</h3>

            <p style={price}>₹{item.price}</p>

            <button style={buyBtn}>View Product</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageWrap = {
  fontFamily: "Arial, sans-serif",
  background: "#f9faf7",
  minHeight: "100vh",
};

const noticeBar = {
  background: "#c89b2c",
  color: "#fff",
  textAlign: "center",
  padding: "8px 10px",
  fontSize: 14,
};

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px 18px",
  background: "#fff",
  borderBottom: "1px solid #eee",
};

const logo = {
  color: "#1b5e20",
  fontWeight: "bold",
  fontSize: 20,
};

const menu = { fontSize: 22 };
const cart = { fontSize: 22 };

const categoryWrap = {
  display: "flex",
  gap: 18,
  padding: 15,
  overflowX: "auto",
  background: "#fff",
};

const catItem = {
  textAlign: "center",
  minWidth: 90,
  fontSize: 14,
};

const catCircle = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: "#e8f5e9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 30,
  margin: "0 auto 6px",
};

const banner = {
  margin: 20,
  padding: 25,
  borderRadius: 16,
  textAlign: "center",
  background:
    "linear-gradient(135deg,#e8f5e9,#fffde7)",
};

const sectionTitle = {
  textAlign: "center",
  margin: "25px 0 10px",
  color: "#2e7d32",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: 18,
  padding: 20,
};

const card = {
  background: "#fff",
  borderRadius: 14,
  padding: 12,
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "0.2s",
};

const image = {
  width: "100%",
  height: 180,
  objectFit: "cover",
  borderRadius: 10,
};

const productName = {
  margin: "10px 0 4px",
  fontSize: 16,
};

const price = {
  color: "#2e7d32",
  fontWeight: "bold",
  fontSize: 18,
};

const buyBtn = {
  marginTop: 8,
  width: "100%",
  padding: 10,
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 14,
};

/* ================= DATA ================= */

const categories = [
  { title: "Bhakti", icon: "🕉️" },
  { title: "Japa Bag", icon: "🎒" },
  { title: "Tulsi Mala", icon: "📿" },
  { title: "Bracelet", icon: "🧿" },
];
