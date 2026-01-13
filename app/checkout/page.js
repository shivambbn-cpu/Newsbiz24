"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("pid");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.mobile || !form.address) {
      alert("❌ All required fields fill karo");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        productId,
        ...form,
        paymentMethod: "COD",
        status: "Pending",
        createdAt: serverTimestamp()
      });

      router.push("/order-success");
    } catch (err) {
      alert("❌ Order failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h1>🧾 Checkout</h1>

      <input name="name" placeholder="Full Name" onChange={handleChange} style={inputStyle} />
      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} style={inputStyle} />
      <textarea name="address" placeholder="Full Address" onChange={handleChange} style={inputStyle} />
      <input name="city" placeholder="City" onChange={handleChange} style={inputStyle} />
      <input name="state" placeholder="State" onChange={handleChange} style={inputStyle} />
      <input name="pincode" placeholder="Pincode" onChange={handleChange} style={inputStyle} />

      <button onClick={placeOrder} style={btnStyle}>
        Place Order (COD)
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  margin: "8px 0",
  borderRadius: 6,
  border: "1px solid #ccc"
};

const btnStyle = {
  width: "100%",
  padding: 12,
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  marginTop: 10,
  fontSize: 16
};
