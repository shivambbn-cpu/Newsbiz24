"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { jsPDF } from "jspdf";

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
  const [orderPlaced, setOrderPlaced] = useState(false);

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
      // Save each cart item as separate order
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

      // Save last order for PDF
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
      setOrderPlaced(true);

      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("ORDER ERROR", err);
      alert("Order failed, try again.");
    }
  };

  /* 🔹 Download Invoice PDF */
  const downloadInvoice = () => {
    const order = JSON.parse(localStorage.getItem("lastOrder"));
    if (!order) return alert("No order data found");

    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(18);
    doc.text("🛒 TULSIMALASTORE Invoice", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.orderId}`, 10, y);
    y += 8;
    doc.text(`Customer: ${order.customer.name}`, 10, y);
    y += 8;
    doc.text(`Mobile: ${order.customer.mobile}`, 10, y);
    y += 8;
    doc.text(
      `Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`,
      10,
      y
    );
    y += 8;
    doc.text(`Payment Method: ${order.paymentMethod}`, 10, y);
    y += 10;

    doc.text("Products:", 10, y);
    y += 8;

    order.products.forEach((p, index) => {
      doc.text(
        `${index + 1}. ${p.name} - ₹${p.price} × ${p.qty} = ₹${p.total}`,
        10,
        y
      );
      y += 8;
    });

    doc.text(`Total: ₹${order.total}`, 10, y + 5);

    doc.save(`invoice_${order.orderId}.pdf`);
  };

  /* 🔹 If cart empty */
  if (!cart.length && !orderPlaced) {
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
      {!orderPlaced && (
        <>
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
        </>
      )}

      {/* Download Invoice */}
      {orderPlaced && (
        <button style={btn} onClick={downloadInvoice}>
          📄 Download Invoice (PDF)
        </button>
      )}
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
