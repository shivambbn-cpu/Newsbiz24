"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [openModal, setOpenModal] = useState(null);

  // Close modal
  const closeModal = () => setOpenModal(null);

  // Scroll lock + ESC + Mobile back support
  useEffect(() => {
    if (!openModal) return;

    document.body.style.overflow = "hidden";
    window.history.pushState(null, document.title);

    const onBack = () => closeModal();
    const onEsc = (e) => e.key === "Escape" && closeModal();

    window.addEventListener("popstate", onBack);
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", onBack);
      window.removeEventListener("keydown", onEsc);
    };
  }, [openModal]);

  // Footer content
  const content = {
    about: `
      <h1>About Us</h1>
      <p>NewsBiz24.in is a trusted Hindi news platform covering
      Religious, Astro, Business, Health, Lifestyle and Breaking News.</p>
    `,
    contact: `
      <h1>Contact Us</h1>
      <p>Email: contact@newsbiz24.in</p>
    `,
    privacy: `
      <h1>Privacy Policy</h1>
      <p>We respect your privacy and do not misuse user data.</p>
    `,
    terms: `
      <h1>Terms & Conditions</h1>
      <p>Using this website means you agree to our terms.</p>
    `,
  };

  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer>
        <div className="footer-buttons">
          <button onClick={() => setOpenModal("about")}>About Us</button>
          <button onClick={() => setOpenModal("contact")}>Contact Us</button>
          <button onClick={() => setOpenModal("privacy")}>Privacy Policy</button>
          <button onClick={() => setOpenModal("terms")}>
            Terms & Conditions
          </button>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} newsbiz24.in All rights reserved.
        </div>
      </footer>

      {/* ================= FULLSCREEN MODAL ================= */}
      {openModal && (
        <div className="footer-modal">
          <div
            className="footer-modal-content"
            dangerouslySetInnerHTML={{ __html: content[openModal] }}
          />
        </div>
      )}
    </>
  );
}
