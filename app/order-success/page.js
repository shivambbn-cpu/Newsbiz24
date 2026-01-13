"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

export default function OrderSuccess() {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) setOrder(JSON.parse(data));
  }, []);

  const downloadPDF = () => {
    if (!order) return;

    const pdf = new jsPDF();

    /* 🔥 FIX START */
    pdf.setFont("helvetica", "normal");
    pdf.setCharSpace(0);
    /* 🔥 FIX END */

    pdf.setFontSize(18);
    pdf.text("INVOICE", 105, 15, { align: "center" });

    pdf.setFontSize(12);
    pdf.text("Your Shop Name", 15, 25);
    pdf.text("India", 15, 32);
    pdf.text("Payment: Cash on Delivery", 15, 39);

    pdf.line(15, 42, 195, 42);

    pdf.text(`Order ID: ${order.orderId}`, 15, 50);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 15, 58);

    pdf.text("Bill To:", 15, 70);
    pdf.text(order.customer.name, 15, 78);
    pdf.text(order.customer.mobile, 15, 86);
    pdf.text(
      `${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`,
      15,
      94,
      { maxWidth: 180 }
    );

    pdf.line(15, 115, 195, 115);

    pdf.text("Product", 15, 125);
    pdf.text("Qty", 120, 125);
    pdf.text("Price", 140, 125);
    pdf.text("Total", 165, 125);

    pdf.line(15, 128, 195, 128);

    pdf.text(order.productName, 15, 138);
    pdf.text(String(order.qty), 120, 138);
    pdf.text(`₹${Number(order.price)}`, 140, 138);
    pdf.text(`₹${Number(order.total)}`, 165, 138);

    pdf.line(15, 150, 195, 150);

    pdf.setFontSize(14);
    pdf.text(`Grand Total: ₹${Number(order.total)}`, 140, 162);

    pdf.setFontSize(10);
    pdf.text("Thank you for shopping with us!", 105, 180, {
      align: "center",
    });

    pdf.save(`Invoice-${order.orderId}.pdf`);
  };

  if (!order) {
    return <p style={{ padding: 40, textAlign: "center" }}>No Order Found</p>;
  }

  return (
    <div style={wrap}>
      <h1 style={{ color: "green" }}>✅ Order Placed Successfully</h1>
      <p>Your order has been confirmed.</p>

      <div style={card}>
        <h3>📦 Order Summary</h3>
        <p><b>Order ID:</b> {order.orderId}</p>
        <p><b>Product:</b> {order.productName}</p>
        <p><b>Quantity:</b> {order.qty}</p>
        <p><b>Total:</b> ₹{order.total}</p>
        <p><b>Payment:</b> Cash on Delivery</p>
      </div>

      <button onClick={downloadPDF} style={pdfBtn}>
        📄 Download Invoice PDF
      </button>

      <button onClick={() => router.push("/shop")} style={shopBtn}>
        Continue Shopping
      </button>
    </div>
  );
}

/* styles unchanged */
const wrap = {
  padding: 30,
  maxWidth: 600,
  margin: "auto",
  textAlign: "center",
};

const card = {
  marginTop: 20,
  padding: 20,
  border: "1px solid #ddd",
  borderRadius: 10,
  textAlign: "left",
};

const pdfBtn = {
  width: "100%",
  padding: 14,
  marginTop: 15,
  background: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 16,
};

const shopBtn = {
  width: "100%",
  padding: 14,
  marginTop: 10,
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 16,
};
