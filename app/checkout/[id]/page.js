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

import CheckoutForm from "@/components/CheckoutForm";
import "@/styles/checkout-form.css";

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

  /* 🔹 Fetch Product */
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

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId: Date.now(),
          productName: product.name,
          price: product.price,
          qty,
          total,
          customer: form
        })
      );

      router.push("/order-success");
    } catch (err) {
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
        style={{ width: "100%", borderRadius: 10, marginBottom: 12 }}
      />

      <p>Price: ₹{product.price}</p>
      <p>Quantity: <b>{qty}</b></p>

      <h3 style={{ color: "#16a34a", marginBottom: 10 }}>
        Total: ₹{total}
      </h3>

      {/* ✅ REUSABLE CHECKOUT FORM */}
      <CheckoutForm
        form={form}
        setForm={setForm}
        total={total}
        onSubmit={placeOrder}
      />
    </div>
  );
      }
