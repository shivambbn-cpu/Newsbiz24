"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [qty, setQty] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((s, i) => s + Number(i.qty || 0), 0);
    setCartCount(total);
  };

  const buyNow = (product) => {
    router.push(`/checkout/${product.id}?qty=${qty}`);
  };

  if (loading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading…</p>;
  }

  return (
    <>
      {/* HEADER */}
      <header style={header}>
        <b>TULSIMALASTORE</b>
        <div style={{ position: "relative" }} onClick={() => router.push("/cart")}>
          🛒
          {cartCount > 0 && <span style={badge}>{cartCount}</span>}
        </div>
      </header>

      <div style={{ padding: 14 }}>
        <h3 style={{ textAlign: "center", marginBottom: 16 }}>
          🛍 Our Products
        </h3>

        {/* PRODUCT LIST */}
        {openId === null && (
          <div style={grid}>
            {products.map(p => (
              <div
                key={p.id}
                style={card}
                onClick={() => {
                  setOpenId(p.id);
                  setQty(1);
                }}
              >
                <img src={p.image} style={img} />
                <h4 style={{ margin: "10px 0" }}>{p.name}</h4>

                <div>
                  <b style={{ fontSize: 18 }}>₹ {p.price}</b>
                  {p.mrp && (
                    <span style={cut}>₹{p.mrp}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SINGLE PRODUCT */}
        {openId !== null &&
          products
            .filter(p => p.id === openId)
            .map(item => (
              <div key={item.id} style={single}>
                <img src={item.image} style={imgLarge} />

                <p style={{ color: "#888", fontSize: 12 }}>
                  TULSIMALASTORE.IN
                </p>

                <h2>{item.name}</h2>

                <div style={{ margin: "10px 0" }}>
                  <b style={{ fontSize: 22 }}>Rs. {item.price}.00</b>
                  {item.mrp && (
                    <span style={cutBig}>Rs. {item.mrp}.00</span>
                  )}
                </div>

                {/* ICON FEATURES */}
                <div style={features}>
                  <span>🔒 Secure</span>
                  <span>🚚 Fast Ship</span>
                  <span>✅ Quality</span>
                </div>

                {/* QTY */}
                <div style={qtyRow}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>

                {/* BUY NOW */}
                <button
                  style={buyNowBtn}
                  onClick={() => buyNow(item)}
                >
                  Buy Now
                </button>

                <button style={backBtn} onClick={() => setOpenId(null)}>
                  ← Back
                </button>
              </div>
            ))}
      </div>
    </>
  );
}

/* STYLES */

const header = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  position: "sticky",
  top: 0,
  background: "#fff",
  zIndex: 10,
};

const badge = {
  position: "absolute",
  top: -6,
  right: -10,
  background: "red",
  color: "#fff",
  borderRadius: "50%",
  fontSize: 12,
  padding: "2px 6px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 14,
};

const card = {
  border: "1px solid #e5e7eb",
  borderRadius: 14,
  padding: 10,
  background: "#fff",
  cursor: "pointer",
};

const img = {
  width: "100%",
  height: 160,
  objectFit: "cover",
  borderRadius: 12,
};

const imgLarge = {
  width: "100%",
  height: 260,
  objectFit: "cover",
  borderRadius: 14,
};

const cut = {
  marginLeft: 8,
  textDecoration: "line-through",
  color: "#999",
};

const cutBig = {
  marginLeft: 10,
  textDecoration: "line-through",
  color: "#999",
  fontSize: 16,
};

const single = {
  border: "1px solid #ddd",
  padding: 16,
  borderRadius: 14,
};

const features = {
  display: "flex",
  gap: 16,
  color: "#16a34a",
  fontSize: 14,
  margin: "12px 0",
};

const qtyRow = {
  display: "flex",
  justifyContent: "center",
  gap: 16,
  margin: "16px 0",
};

const buyNowBtn = {
  width: "100%",
  padding: 14,
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 18,
};

const backBtn = {
  width: "100%",
  padding: 10,
  background: "#eee",
  border: "none",
  borderRadius: 8,
  marginTop: 12,
};
