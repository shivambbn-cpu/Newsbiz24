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

  // ✅ qty always NUMBER
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

  /* 🔹 Fetch Product */
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const ref = doc(db, "shop_products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          const price = Number(data.price); // ✅ number only
          const finalQty = Number(qty);

          setProduct({
            id: snap.id,
            name: data.name,
            image: data.image,
            price
          });

          setTotal(price * finalQty); // ✅ correct total
        }
      } catch (err) {
        console.error("PRODUCT ERROR", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, qty]);

  /* 🔹 Place Order */
  const placeOrder = async () => {
    if (!product) return alert("Product not loaded");

    for (let key in form) {
      if (!form[key]) {
        return alert("❌ Please fill all address fields");
      }
    }

    try {
      /* ✅ Save Order in Firestore */
      await addDoc(collection(db, "orders"), {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: Number(product.price),
        qty: Number(qty),
        total: Number(total),
        paymentMethod: "Cash On Delivery",
        customer: form,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      /* ✅ Save clean data for PDF */
      const orderData = {
        orderId: Date.now(),
        productName: product.name,
        price: Number(product.price),
        qty: Number(qty),
        total: Number(total),
        customer: form,
        paymentMethod: "Cash On Delivery"
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderData));

      router.push("/order-success");

    } catch (err) {
      console.error("ORDER ERROR", err);
      alert("Order failed");
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!product) return <p style={{ padding: 40 }}>Product not found</p>;

  return (
    <div style={{ padding: 20, maxWidth: 520, margin: "auto" }}>
      <h2>{product.name}</h2>

      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: 10 }}
      />

      <p>Price: ₹{product.price}</p>
      <p>Quantity: <b>{qty}</b></p>

      <h3 style={{ color: "#16a34a" }}>
        Grand Total: ₹{total}
      </h3>

      {/* Address */}
      <input placeholder="Full Name" onChange={e => setForm({ ...form, name: e.target.value })} style={input} />
      <input placeholder="Mobile Number" onChange={e => setForm({ ...form, mobile: e.target.value })} style={input} />
      <textarea placeholder="Full Address" onChange={e => setForm({ ...form, address: e.target.value })} style={input} />
      <input placeholder="City" onChange={e => setForm({ ...form, city: e.target.value })} style={input} />
      <input placeholder="State" onChange={e => setForm({ ...form, state: e.target.value })} style={input} />
      <input placeholder="Pincode" onChange={e => setForm({ ...form, pincode: e.target.value })} style={input} />

      <p style={{ marginTop: 10 }}>
        Payment Method: <b>Cash on Delivery</b>
      </p>

      <button onClick={placeOrder} style={btn}>
        Place Order (₹{total})
      </button>
    </div>
  );
}

/* Styles */
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
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
  marginTop: 10,
  cursor: "pointer"
};
