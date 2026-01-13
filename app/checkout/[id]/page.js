"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const ref = doc(db, "shop_products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
    };

    fetchProduct();
  }, [id]);

  const placeOrder = async () => {
    if (!form.name || !form.mobile || !form.address) {
      alert("All fields required");
      return;
    }

    await addDoc(collection(db, "orders"), {
      productId: product.id,
      productName: product.name,
      price: product.price,
      ...form,
      payment: "COD",
      status: "Pending",
      createdAt: serverTimestamp()
    });

    router.push("/order-success");
  };

  if (!product) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 520, margin: "auto" }}>
      <h2>{product.name}</h2>
      <img src={product.image} style={{ width: "100%", borderRadius: 10 }} />
      <h3 style={{ color: "green" }}>₹{product.price}</h3>

      <input placeholder="Full Name" onChange={e => setForm({ ...form, name: e.target.value })} style={input} />
      <input placeholder="Mobile Number" onChange={e => setForm({ ...form, mobile: e.target.value })} style={input} />
      <textarea placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} style={input} />
      <input placeholder="City" onChange={e => setForm({ ...form, city: e.target.value })} style={input} />
      <input placeholder="State" onChange={e => setForm({ ...form, state: e.target.value })} style={input} />
      <input placeholder="Pincode" onChange={e => setForm({ ...form, pincode: e.target.value })} style={input} />

      <button onClick={placeOrder} style={btn}>
        Place Order (COD)
      </button>
    </div>
  );
}

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
  marginTop: 10
};

