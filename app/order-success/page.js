"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) setOrder(JSON.parse(data));
  }, []);

  const downloadPDF = async () => {
    const invoice = document.getElementById("invoice");

    const canvas = await html2canvas(invoice, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`Invoice-${order.orderId}.pdf`);
  };

  if (!order) return <p style={{ padding: 40 }}>No order found</p>;

  return (
    <div style={{ padding: 20 }}>
      {/* ================= INVOICE ================= */}
      <div
        id="invoice"
        style={{
          background: "#fff",
          padding: 20,
          maxWidth: 600,
          margin: "auto",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0",
          wordSpacing: "0"
        }}
      >
        {/* 🔥 ONLY FIX ADDED HERE */}
        <style>{`
          * {
            letter-spacing: 0 !important;
            word-spacing: 0 !important;
          }

          table, td, th, p, span {
            font-family: Arial, sans-serif !important;
            letter-spacing: normal !important;
            word-spacing: normal !important;
            text-align: left;
          }
        `}</style>

        {/* ===== REST IS 100% SAME ===== */}
        <h2 style={{ textAlign: "center" }}>INVOICE</h2>

        <p><b>Order ID:</b> {order.orderId}</p>
        <p><b>Payment:</b> {order.paymentMethod}</p>

        <hr />

        <p><b>Name:</b> {order.customer.name}</p>
        <p><b>Mobile:</b> {order.customer.mobile}</p>
        <p>
          <b>Address:</b> {order.customer.address},{" "}
          {order.customer.city}, {order.customer.state} -{" "}
          {order.customer.pincode}
        </p>

        <hr />

        <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.productName}</td>
              <td>{order.qty}</td>
              <td>₹{order.price}</td>
              <td>₹{order.total}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ textAlign: "right", marginTop: 10 }}>
          Grand Total: ₹{order.total}
        </h3>

        <p style={{ textAlign: "center", marginTop: 20 }}>
          Thank you for shopping with us!
        </p>
      </div>

      {/* ===== BUTTON SAME ===== */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: "12px 20px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16
          }}
        >
          Download Invoice PDF
        </button>
      </div>
    </div>
  );
    }
