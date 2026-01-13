"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    landmark: "",
  });

  // 🔹 Fetch product
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
          router.push("/shop");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) return <p style={{ padding: 40, textAlign: "center" }}>Loading...</p>;
  if (!product) return null;

  // 🔹 Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Place order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "shop_orders"), {
        productId: product.id,
        productName: product.name,
        price: product.price,
        customer: { ...form },
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setOrderPlaced(true);
      setForm({
        name: "",
        phone: "",
        pincode: "",
        state: "",
        city: "",
        landmark: "",
      });
    } catch (err) {
      console.error(err);
      alert("Order failed, try again");
    }
  };

  if (orderPlaced) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>✅ Your order has been placed!</h2>
        <p>We will contact you soon.</p>
        <button
          onClick={() => router.push("/shop")}
          style={{
            padding: 12,
            marginTop: 20,
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
          }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h1>Checkout</h1>

      <div style={{ margin: "20px 0" }}>
        <h2>{product.name}</h2>
        <p style={{ color: "#4caf50", fontWeight: "bold" }}>₹{product.price}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          value={form.landmark}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            padding: 14,
            background: "#ff5722",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Place Order (Cash on Delivery)
        </button>
      </form>
    </div>
  );
}


