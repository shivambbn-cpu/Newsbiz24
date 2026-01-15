"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

export default function CheckoutPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const qty = Number(searchParams.get("qty") || 1);

  const [product, setProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  /* 🔹 Fetch product */
  useEffect(() => {
    if (!id) return;

    (async () => {
      const ref = doc(db, "shop_products", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        const price = Number(data.price);

        setProduct({
          id: snap.id,
          name: data.name,
          image: data.image,
          price
        });

        setTotal(price * qty);
      }
      setLoading(false);
    })();
  }, [id, qty]);

  /* 🔹 Place Order */
  const placeOrder = async () => {
    for (let key in form) {
      if (!form[key]) return alert("❌ Please fill all details");
    }

    try {
      await addDoc(collection(db, "orders"), {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        qty,
        total,
        paymentMethod: "Cash On Delivery",
        customer: form,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      const orderData = {
        orderId: Date.now(),
        products: [{ ...product, qty }],
        total,
        customer: form,
        paymentMethod: "Cash On Delivery"
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      router.push("/order-success");

    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  if (loading) return <p style={{ padding: 30 }}>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={wrap}>
      <h2>Checkout</h2>

      {/* Product box */}
      <div style={itemBox}>
        <img src={product.image} style={img} alt={product.name} />
        <div>
          <p><b>{product.name}</b></p>
          <p>₹{product.price} × {qty}</p>
          <p><b>₹{total}</b></p>
        </div>
      </div>

      <h3>Total: ₹{total}</h3>

      {/* FORM (same order as cart checkout) */}
      <input
        style={input}
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        style={input}
        placeholder="Mobile"
        onChange={e => setForm({ ...form, mobile: e.target.value })}
      />
      <textarea
        style={input}
        placeholder="Address"
        onChange={e => setForm({ ...form, address: e.target.value })}
      />
      <input
        style={input}
        placeholder="City"
        onChange={e => setForm({ ...form, city: e.target.value })}
      />
      <input
        style={input}
        placeholder="State"
        onChange={e => setForm({ ...form, state: e.target.value })}
      />
      <input
        style={input}
        placeholder="Pincode"
        onChange={e => setForm({ ...form, pincode: e.target.value })}
      />

      <button style={btn} onClick={placeOrder}>
        Place Order (₹{total})
      </button>
    </div>
  );
}

/* STYLES – SAME AS CHECKOUT PAGE */
const wrap = {
  maxWidth: 500,
  margin: "auto",
  padding: 20
};

const itemBox = {
  display: "flex",
  gap: 12,
  borderBottom: "1px solid #ddd",
  paddingBottom: 10,
  marginBottom: 10
};

const img = {
  width: 70,
  height: 70,
  borderRadius: 6,
  objectFit: "cover"
};

const input = {
  width: "100%",
  padding: 12,
  margin: "6px 0",
  border: "1px solid #ccc",
  borderRadius: 6
};

const btn = {
  width: "100%",
  padding: 14,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 16,
  marginTop: 10
};
