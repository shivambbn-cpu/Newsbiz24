"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function OrderPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const loadProduct = async () => {
      const snap = await getDoc(doc(db, "shop_products", id));
      if (snap.exists()) setProduct(snap.data());
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    await addDoc(collection(db, "orders"), {
      productId: id,
      productName: product.name,
      price: product.price,
      payment: "Cash on Delivery",
      customer: form,
      status: "Pending",
      createdAt: new Date(),
    });

    alert("✅ Order placed successfully!");
    router.push("/order-success");
  };

  if (loading || !product) return <p>Loading...</p>;

  return (
    <div className="order-page">
      <h2>🛒 Order: {product.name}</h2>
      <p>Price: ₹{product.price}</p>

      <input placeholder="Full Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Phone Number"
        onChange={(e) => setForm({ ...form, phone: e.target.value })} />

      <textarea placeholder="Full Address"
        onChange={(e) => setForm({ ...form, address: e.target.value })} />

      <input placeholder="Pincode"
        onChange={(e) => setForm({ ...form, pincode: e.target.value })} />

      <input placeholder="City"
        onChange={(e) => setForm({ ...form, city: e.target.value })} />

      <input placeholder="State"
        onChange={(e) => setForm({ ...form, state: e.target.value })} />

      <button onClick={placeOrder}>
        Place Order (COD)
      </button>
    </div>
  );
        }

    
