"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [openModal, setOpenModal] = useState(null);

  const handleClose = () => setOpenModal(null);

  // Scroll lock + ESC + back button
  useEffect(() => {
    if (!openModal) return;

    document.body.style.overflow = "hidden";
    window.history.pushState(null, document.title);

    const handlePopState = () => handleClose();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  const contentMap = {
    about: "<h1>About Us</h1><p>NewsBiz24 is your trusted source for news...</p>",
    contact: "<h1>Contact Us</h1><p>Email: contact@newsbiz24.in</p>",
    privacy: "<h1>Privacy Policy</h1><p>Your privacy is important to us...</p>",
    terms: "<h1>Terms & Conditions</h1><p>By using our website, you agree...</p>",
  };

  return (
    <>
      <footer style={{ position: "relative", zIndex: 1 }}>
        <div className="footer-buttons">
          <button onClick={() => setOpenModal("about")}>About Us</button>
          <button onClick={() => setOpenModal("contact")}>Contact Us</button>
          <button onClick={() => setOpenModal("privacy")}>Privacy Policy</button>
          <button onClick={() => setOpenModal("terms")}>Terms & Conditions</button>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} newsbiz24.in All rights reserved.
        </div>
      </footer>

      {/* Fullscreen Modal */}
      {openModal && (
        <div
          className="footer-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "#ff3b30",
              color: "#fff",
              border: "none",
              fontSize: "24px",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            ✕
          </button>
          <div
            className="footer-modal-content"
            style={{
              background: "#fff",
              maxWidth: "800px",
              width: "100%",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
              fontFamily: "Inter, sans-serif",
            }}
            dangerouslySetInnerHTML={{ __html: contentMap[openModal] || "" }}
          />
        </div>
      )}
    </>
  );
}
