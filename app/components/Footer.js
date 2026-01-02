"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [openModal, setOpenModal] = useState(null);

  // Footer modal close
  const handleClose = () => setOpenModal(null);

  // ESC key + mobile back button support
  useEffect(() => {
    if (!openModal) return;

    // Scroll lock
    document.body.style.overflow = "hidden";

    // Back button support
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

  // Footer modal content
  const contentMap = {
    about: "<h1>About Us</h1><p>NewsBiz24 is your trusted source for news...</p>",
    contact: "<h1>Contact Us</h1><p>Email: contact@newsbiz24.in</p>",
    privacy: "<h1>Privacy Policy</h1><p>Your privacy is important to us...</p>",
    terms: "<h1>Terms & Conditions</h1><p>By using our website, you agree...</p>",
  };

  return (
    <>
      <footer>
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

      {/* Fullscreen Footer Modal */}
      {openModal && (
        <div className="footer-modal-overlay">
          <button className="modal-close" onClick={handleClose}>
            ✕
          </button>
          <div
            className="footer-modal-content"
            dangerouslySetInnerHTML={{ __html: contentMap[openModal] || "" }}
          />
        </div>
      )}
    </>
  );
}
