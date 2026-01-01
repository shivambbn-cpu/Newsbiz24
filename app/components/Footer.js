"use client";

export default function Footer() {
  const isClient = typeof window !== "undefined";

  return (
    <>
      {!isClient && (
        <div style={{ color: "red", padding: 20 }}>
          🚨 Server Render
        </div>
      )}

      {isClient && (
        <div style={{ color: "green", padding: 20 }}>
          ✅ Client Render
        </div>
      )}

      <footer>
        <div className="footer-buttons">
          <button>About Us</button>
          <button>Contact Us</button>
          <button>Privacy Policy</button>
          <button>Terms & Conditions</button>
        </div>

        <div className="footer-copy">
          © 2025 newsbiz24.in All rights reserved.
        </div>
      </footer>
    </>
  );
}
