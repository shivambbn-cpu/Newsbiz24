"use client";

import { useRouter } from "next/navigation";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ color: "green" }}>✅ Order Placed Successfully</h1>
      <p>Thank you! Aapka order confirm ho gaya hai.</p>

      <button
        onClick={() => router.push("/shop")}
        style={{
          marginTop: 20,
          padding: 12,
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}

