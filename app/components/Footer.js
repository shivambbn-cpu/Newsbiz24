"use client";

export default function Footer() {
  return (
    <footer>
      <div className="footer-buttons">
        <button onClick={() => openModal("about")}>About Us</button>
        <button onClick={() => openModal("contact")}>Contact Us</button>
        <button onClick={() => openModal("privacy")}>Privacy Policy</button>
        <button onClick={() => openModal("terms")}>Terms & Conditions</button>
      </div>

      <div className="footer-copy">
        Â© 2025 newsbiz24.in All rights reserved.
      </div>
    </footer>
  );
    }
