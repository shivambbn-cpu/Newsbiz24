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

  const qty = parseInt(searchParams.get("qty") || "1", 10);

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

  /* Fetch Product */
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, qty]);

  /* Place Order */
  const placeOrder = async () => {
    for (let key in form) {
      if (!form[key]) {
        return alert("Please fill all fields");
      }
    }

    await addDoc(collection(db, "orders"), {
      productId: product.id,
      productName: product.name,
      price: product.price,
      qty,
      total,
      customer: form,
      paymentMethod: "Cash On Delivery",
      status: "Pending",
      createdAt: serverTimestamp()
    });

    localStorage.setItem(
      "lastOrder",
      JSON.stringify({ product, qty, total, customer: form })
    );

    router.push("/order-success");
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!product) return <p style={{ padding: 40 }}>Product not found</p>;

  return (
    <div style={page}>
      {/* ONLY FORM – IMAGE JAISE */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={input}
      />

      <input
        placeholder="Mobile"
        value={form.mobile}
        onChange={e => setForm({ ...form, mobile: e.target.value })}
        style={input}
      />

      <textarea
        placeholder="Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        style={textarea}
      />

      <input
        placeholder="City"
        value={form.city}
        onChange={e => setForm({ ...form, city: e.target.value })}
        style={input}
      />

      <input
        placeholder="State"
        value={form.state}
        onChange={e => setForm({ ...form, state: e.target.value })}
        style={input}
      />

      <input
        placeholder="Pincode"
        value={form.pincode}
        onChange={e => setForm({ ...form, pincode: e.target.value })}
        style={input}
      />

      <button onClick={placeOrder} style={btn}>
        Place Order (₹{total})
      </button>
    </div>
  );
}

/* ===== IMAGE EXACT STYLES ===== */

const page = {
  maxWidth: 420,
  margin: "30px auto",
  padding: "10px"
};

const input = {
  width: "100%",
  padding: "18px",
  marginBottom: "18px",
  border: "2px solid #9e9e9e",
  borderRadius: "6px",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box"
};

const textarea = {
  ...input,
  minHeight: "100px",
  resize: "none"
};

const btn = {
  width: "100%",
  padding: "18px",
  background: "#16a34a",
  color: "#ffffff",
  fontSize: "18px",
  border: "2px solid #0f7a32",
  borderRadius: "6px",
  cursor: "pointer"
};
