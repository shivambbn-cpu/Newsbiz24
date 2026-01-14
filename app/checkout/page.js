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

  /* 🔹 Load cart */
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

    for (let key in form) {
      if (!form[key]) return alert("❌ Please fill all customer details");
    }

    try {
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

      const orderData = {
        orderId: Date.now(),
        products: cart,
        total,
        customer: form,
        paymentMethod: "Cash On Delivery"
      };

      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      localStorage.removeItem("cart");
      setOrderPlaced(true);

      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error(err);
      alert("Order failed!");
    }
  };

  /* 🔹 DOWNLOAD INVOICE (UPDATED PROFESSIONAL PDF) */
  const downloadInvoice = () => {
    const order = JSON.parse(localStorage.getItem("lastOrder"));
    if (!order) return alert("No order data found");

    const doc = new jsPDF("p", "mm", "a4");
    let y = 20;

    doc.setFontSize(18);
    doc.text("INVOICE", 105, y, { align: "center" });

    y += 10;
    doc.setFontSize(11);
    doc.text("TULSIMALASTORE", 10, y);
    y += 6;
    doc.text("India", 10, y);
    y += 6;
    doc.text(`Payment: ${order.paymentMethod}`, 10, y);

    doc.text(`Order ID: ${order.orderId}`, 150, 36);
    doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 150, 42);

    y += 10;
    doc.line(10, y, 200, y);

    y += 8;
    doc.setFontSize(12);
    doc.text("Bill To:", 10, y);

    doc.setFontSize(11);
    y += 6;
    doc.text(order.customer.name, 10, y);
    y += 6;
    doc.text(order.customer.mobile, 10, y);
    y += 6;
    doc.text(
      `${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`,
      10,
      y
    );

    y += 12;
    doc.line(10, y, 200, y);
    y += 6;

    doc.text("Product", 12, y);
    doc.text("Qty", 120, y);
    doc.text("Price", 145, y);
    doc.text("Total", 175, y);

    y += 4;
    doc.line(10, y, 200, y);

    y += 8;
    order.products.forEach((p) => {
      doc.text(p.name, 12, y);
      doc.text(String(p.qty), 122, y);
      doc.text(`Rs. ${p.price}`, 145, y);
      doc.text(`Rs. ${p.price * p.qty}`, 175, y);
      y += 8;
    });

    y += 4;
    doc.line(10, y, 200, y);
    y += 8;

    doc.setFontSize(12);
    doc.text(`Grand Total: Rs. ${order.total}`, 140, y);

    y += 15;
    doc.setFontSize(10);
    doc.text("Thank you for shopping with us!", 105, y, { align: "center" });

    doc.save(`Invoice-${order.orderId}.pdf`);
  };

  /* 🔹 Empty Cart */
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

      {cart.map((item, i) => (
        <div key={i} style={itemBox}>
          <img src={item.image} style={img} alt={item.name} />
          <div>
            <p><b>{item.name}</b></p>
            <p>₹{item.price} × {item.qty}</p>
            <p><b>₹{item.price * item.qty}</b></p>
          </div>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      {!orderPlaced && (
        <>
          <input style={input} placeholder="Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <input style={input} placeholder="Mobile" value={form.mobile}
            onChange={e => setForm({ ...form, mobile: e.target.value })} />
          <textarea style={input} placeholder="Address" value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })} />
          <input style={input} placeholder="City" value={form.city}
            onChange={e => setForm({ ...form, city: e.target.value })} />
          <input style={input} placeholder="State" value={form.state}
            onChange={e => setForm({ ...form, state: e.target.value })} />
          <input style={input} placeholder="Pincode" value={form.pincode}
            onChange={e => setForm({ ...form, pincode: e.target.value })} />

          <button style={btn} onClick={placeOrder}>
            Place Order (₹{total})
          </button>
        </>
      )}

      {orderPlaced && (
        <button style={btn} onClick={downloadInvoice}>
          📄 Download Invoice (PDF)
        </button>
      )}
    </div>
  );
}

/* STYLES */
const wrap = { maxWidth: 500, margin: "auto", padding: 20 };
const itemBox = { display: "flex", gap: 10, borderBottom: "1px solid #ddd" };
const img = { width: 70, height: 70, borderRadius: 6 };
const input = { width: "100%", padding: 10, margin: "6px 0" };
const btn = { width: "100%", padding: 14, background: "#16a34a", color: "#fff" };
