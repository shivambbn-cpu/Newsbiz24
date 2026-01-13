"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CheckoutPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const loadProduct = async () => {
      const snap = await getDoc(doc(db, "shop_products", id));
      if (snap.exists()) setProduct({ id, ...snap.data() });
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("❌ Please fill all required fields");
      return;
    }

    await addDoc(collection(db, "orders"), {
      productId: product.id,
      productName: product.name,
      price: product.price,
      customer: form,
      paymentMethod: "Cash on Delivery",
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    localStorage.removeItem("cart");
    router.push("/order-success");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>🧾 Order Details</h2>

      <Image src={product.image} alt={product.name} width={400} height={250} />

      <h3>{product.name}</h3>
      <p style={{ fontWeight: "bold" }}>₹{product.price}</p>

      <hr />

      <h3>Customer Details</h3>

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="email"
        placeholder="Email (optional)"
        onChange={handleChange}
        style={inputStyle}
      />

      <textarea
        name="address"
        placeholder="Full Address"
        onChange={handleChange}
        style={{ ...inputStyle, height: 80 }}
      />

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          padding: 12,
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontSize: 16,
        }}
      >
        Place Order (Cash on Delivery)
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  margin: "8px 0",
  borderRadius: 6,
  border: "1px solid #ccc",
};

  
