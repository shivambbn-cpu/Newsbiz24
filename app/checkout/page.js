"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  /* 🔹 Load cart from localStorage */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);

    const sum = data.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    );
    setTotal(sum);
  }, []);

  /* 🔹 Place Order */
  const placeOrder = async () => {
    if (!cart.length) return alert("Cart is empty!");

    // Validate form
    for (let key in form) {
      if (!form[key]) return alert("❌ Please fill all customer details");
    }

    try {
      // Save each cart item as separate order (or combine as one order if you like)
      for (let item of cart) {
        await addDoc(collection(db, "orders"), {
          productId: item.id,
          productName: item.name,
          productImage: item.image,
          price: Number(item.price),
          qty: Number(item.qty),
          total: Number(item.price) * Number(item.qty),
          paymentMethod: "Cash On Delivery",
          customer: form,
          status: "Pending",
          createdAt: serverTimestamp()
        });
      }

      // Save last order for PDF (optional)
      const orderData = {
        orderId: Date.now(),
        products: cart,
        total,
        customer: form,
        paymentMethod: "Cash On Delivery"
      };
      localStorage.setItem("lastOrder", JSON.stringify(orderData));

      // Clear cart
      localStorage.removeItem("cart");

      // Redirect to success page
      router.push("/order-success");
    } catch (err) {
      console.error("ORDER ERROR", err);
      alert("Order failed, try again.");
    }
  };

  /* 🔹 If cart empty */
  if (!cart.length) {
    return (
      <div style={wrap}>
        <h2>🛒 Your cart is empty</h2>
        <button style={btn} onClick={() => router.push("/shop")}>
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <h2>Checkout</h2>

      {/* Order Summary */}
      {cart.map((item, i) => (
        <div key={i} style={itemBox}>
          <img src={item.image} style={img} alt={item.name} />
          <div>
            <p><b>{item.name}</b></p>
            <p>₹{item.price} × {item.qty}</p>
            <p><b>₹{Number(item.price) * Number(item.qty)}</b></p>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 10 }}>Total: ₹{total}</h3>

      {/* Customer Details Form */}
      <h3 style={{ marginTop: 20 }}>Customer Details</h3>
      <input
        style={input}
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        style={input}
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={e => setForm({ ...form, mobile: e.target.value })}
      />
      <textarea
        style={input}
        placeholder="Full Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
      />
      <input
        style={input}
        placeholder="City"
        value={form.city}
        onChange={e => setForm({ ...form, city: e.target.value })}
      />
      <input
        style={input}
        placeholder="State"
        value={form.state}
        onChange={e => setForm({ ...form, state: e.target.value })}
      />
      <input
        style={input}
        placeholder="Pincode"
        value={form.pincode}
        onChange={e => setForm({ ...form, pincode: e.target.value })}
      />

      {/* Payment Method */}
      <p style={{ marginTop: 10 }}>
        Payment Method: <b>Cash on Delivery</b>
      </p>

      <button style={btn} onClick={placeOrder}>
        Place Order (₹{total})
      </button>
    </div>
  );
}

/* ================= STYLES ================= */
const wrap = {
  maxWidth: 500,
  margin: "auto",
  padding: 20
};

const itemBox = {
  display: "flex",
  gap: 10,
  borderBottom: "1px solid #ddd",
  padding: "10px 0"
};

const img = {
  width: 70,
  height: 70,
  borderRadius: 6,
  objectFit: "cover"
};

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
  marginTop: 15,
  cursor: "pointer"
};
