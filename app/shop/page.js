"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [qtyMap, setQtyMap] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [activeProduct, setActiveProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔹 Fetch Products */
  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "shop_products"),
        where("active", "==", true)
      );
      const snap = await getDocs(q);

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const qtyObj = {};
      data.forEach(p => (qtyObj[p.id] = 1));

      setProducts(data);
      setQtyMap(qtyObj);
      updateCartCount();
      setLoading(false);
    })();
  }, []);

  /* 🧮 Cart Count (unique products) */
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  /* 🛒 ADD TO CART (✅ FIXED) */
  const addToCart = (product) => {
    const qty = Number(qtyMap[product.id] || 1);
    const price = Number(product.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(p => p.id === product.id);

    if (index !== -1) {
      // ✅ product already in cart → qty increase
      cart[index].qty += qty;
      cart[index].total = cart[index].qty * price;
    } else {
      // ✅ new product
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price,
        qty,
        total: price * qty,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    alert(`✅ ${qty} item(s) added to cart`);
  };

  /* ⚡ Buy Now */
  const buyNow = (product) => {
    const qty = qtyMap[product.id] || 1;
    router.push(`/checkout/${product.id}?qty=${qty}`);
  };

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center" }}>Loading…</p>;
  }

  return (
    <>
      {/* 🔝 Header */}
      <header style={headerStyle}>
        <b style={{ color: "#16a34a" }}>TULSIMALASTORE</b>
        <div style={{ position: "relative" }}>
          🛒
          {cartCount > 0 && <span style={cartBadge}>{cartCount}</span>}
        </div>
      </header>

      <div style={{ padding: 16 }}>
        <h2 style={{ textAlign: "center" }}>🛍️ Our Shop</h2>

        <div style={grid}>
          {products.map(item => {
            const isActive = activeProduct === item.id;

            return (
              <div key={item.id} style={card}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={img}
                  onClick={() =>
                    setActiveProduct(isActive ? null : item.id)
                  }
                />

                <h3>{item.name}</h3>
                <p style={{ color: "#16a34a", fontWeight: "bold" }}>
                  ₹{item.price}
                </p>

                {/* SIMPLE VIEW */}
                {!isActive && (
                  <button
                    style={simpleBtn}
                    onClick={() => setActiveProduct(item.id)}
                  >
                    Add
                  </button>
                )}

                {/* FULL VIEW */}
                {isActive && (
                  <>
                    {/* Qty */}
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

                    <button
                      style={addBtn}
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
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* 🎨 Styles */
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
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
  borderRadius: 16,
  padding: 14,
  background: "#fff",
};

const img = {
  width: "100%",
  height: 200,
  objectFit: "cover",
  borderRadius: 14,
  cursor: "pointer",
};

const simpleBtn = {
  width: "100%",
  padding: 12,
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};

const qtyRow = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginTop: 8,
};

const qtyBtn = {
  width: 34,
  height: 34,
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#fff",
  fontSize: 18,
};

const addBtn = {
  width: "100%",
  marginTop: 10,
  padding: 12,
  background: "#f59e0b",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};

const buyBtn = {
  width: "100%",
  marginTop: 8,
  padding: 12,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};
