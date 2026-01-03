"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [openModal, setOpenModal] = useState(null);
  const closeModal = () => setOpenModal(null);

  useEffect(() => {
    if (!openModal) return;

    document.body.style.overflow = "hidden";
    window.history.pushState({ footerModal: true }, "");

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

  const content = {
    about: "<h1>About Us</h1><p>NewsBiz24.in एक भरोसेमंद हिंदी न्यूज़ प्लेटफ़ॉर्म है।</p>",
    contact: "<h1>Contact Us</h1><p>Email: contact@newsbiz24.in</p>",
    privacy: "<h1>Privacy Policy</h1><p>हम आपकी privacy का सम्मान करते हैं।</p>",
    terms: "<h1>Terms & Conditions</h1><p>इस वेबसाइट का उपयोग शर्तों के अधीन है।</p>",
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
        <div className="footer-copy">© {new Date().getFullYear()} newsbiz24.in</div>
      </footer>

      {openModal && (
        <div className="footer-modal">
          <button onClick={closeModal} className="modal-close">✕</button>
          <div
            className="footer-modal-content"
            dangerouslySetInnerHTML={{ __html: content[openModal] }}
          />
        </div>
      )}
    </>
  );
}
