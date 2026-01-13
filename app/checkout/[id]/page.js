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

export default function CheckoutPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  /* ðŸ”¹ Fetch Product */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const ref = doc(db, "shop_products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          alert("Product not found");
        }
      } catch (error) {
        console.error("PRODUCT FETCH ERROR ðŸ‘‰", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ðŸ”¹ Place Order */
  const placeOrder = async () => {
    if (!product) {
      alert("Product not loaded");
      return;
    }

    if (
      !form.name ||
      !form.mobile ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        customer: form,
        paymentMethod: "Cash On Delivery",
        status: "Pending",
        createdAt: serverTimestamp()
      });

      router.push("/order-success");
    } catch (error) {
      console.error("ORDER ERROR ðŸ‘‰", error);
      alert("Order failed. Check console.");
    }
  };

  if (loading) {
    return <p style={{ padding: 40 }}>Loading...</p>;
  }

  if (!product) {
    return <p style={{ padding: 40 }}>Product not found</p>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 520, margin: "auto" }}>
      <h2>{product.name}</h2>

      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: 10 }}
      />

      <h3 style={{ color: "green" }}>Rs{product.price}</h3>

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
        Place Order (COD)
      </button>
    </div>
  );
}

/* ðŸ”¹ Styles */
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
