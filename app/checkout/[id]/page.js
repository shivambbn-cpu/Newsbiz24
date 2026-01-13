"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

/* 🔹 INDIA STATE → DISTRICT MAP (sample, extend later) */
const STATE_DISTRICT = {
  "Uttar Pradesh": ["Lucknow", "Varanasi", "Prayagraj", "Kanpur", "Noida"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"]
};

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    country: "India"
  });

  /* 🔹 Fetch Product */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const snap = await getDoc(doc(db, "shop_products", id));
      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  /* 🔹 Place Order */
  const placeOrder = async () => {
    if (
      !form.name ||
      !form.mobile ||
      !form.address ||
      !form.state ||
      !form.district ||
      !form.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "orders"), {
      productId: product.id,
      productName: product.name,
      price: product.price,
      customer: form,
      paymentMethod: "Cash On Delivery",
      status: "Pending",
      createdAt: serverTimestamp()
    });

    router.push("/order-success");
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: 20, maxWidth: 520, margin: "auto" }}>
      <h2>{product.name}</h2>

      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: 10 }}
      />

      <h3 style={{ color: "green" }}>₹{product.price}</h3>

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={input}
      />

      <input
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={e => setForm({ ...form, mobile: e.target.value })}
        style={input}
      />

      <textarea
        placeholder="Full Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        style={input}
      />

      {/* 🔽 STATE SELECT */}
      <select
        value={form.state}
        onChange={e =>
          setForm({
            ...form,
            state: e.target.value,
            district: ""
          })
        }
        style={input}
      >
        <option value="">Select State</option>
        {Object.keys(STATE_DISTRICT).map(state => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* 🔽 DISTRICT SELECT */}
      <select
        value={form.district}
        onChange={e => setForm({ ...form, district: e.target.value })}
        style={input}
        disabled={!form.state}
      >
        <option value="">Select District</option>
        {form.state &&
          STATE_DISTRICT[form.state].map(dist => (
            <option key={dist} value={dist}>
              {dist}
            </option>
          ))}
      </select>

      <input
        placeholder="Pincode"
        value={form.pincode}
        onChange={e => setForm({ ...form, pincode: e.target.value })}
        style={input}
      />

      {/* 🔒 COUNTRY FIXED */}
      <input value="India" disabled style={input} />

      <button onClick={placeOrder} style={btn}>
        Place Order (COD)
      </button>
    </div>
  );
}

/* 🔹 Styles */
const input = {
  width: "100%",
  padding: 10,
  margin: "6px 0",
  borderRadius: 6,
  border: "1px solid #ccc"
};

const btn = {
  width: "100%",
  padding: 14,
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
  marginTop: 10,
  cursor: "pointer"
};
