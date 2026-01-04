"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [active, setActive] = useState(null);

  const content = {
    about: (
      <>
        <h1>About Us</h1>
        <p>
          Newsbiz24 ek digital news platform hai jo business, jobs, health,
          lifestyle aur astrology se judi khabrein provide karta hai.
        </p>
      </>
    ),
    contact: (
      <>
        <h1>Contact Us</h1>
        <p>
          Email: <strong>contact@newsbiz24.in</strong>
        </p>
      </>
    ),
    privacy: (
      <>
        <h1>Privacy Policy</h1>
        <p>
          Hum users ki privacy ka poora dhyan rakhte hain aur kisi bhi tarah ka
          personal data bina permission ke share nahi karte.
        </p>
      </>
    ),
    terms: (
      <>
        <h1>Terms & Conditions</h1>
        <p>
          Is website ka use karke aap hamari sabhi terms & conditions se agree
          karte hain.
        </p>
      </>
    ),
  };

  /* 🔒 Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
  }, [active]);

  /* 🔙 Mobile / browser back button */
  useEffect(() => {
    if (!active) return;

    history.pushState({ footerModal: true }, "");

    const onBack = () => setActive(null);
    window.addEventListener("popstate", onBack);

    return () => window.removeEventListener("popstate", onBack);
  }, [active]);

  /* ⎋ ESC key close */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer>
        <div className="footer-buttons">
          <button onClick={() => setActive("about")}>About Us</button>
          <button onClick={() => setActive("contact")}>Contact Us</button>
          <button onClick={() => setActive("privacy")}>Privacy Policy</button>
          <button onClick={() => setActive("terms")}>
            Terms & Conditions
          </button>
        </div>

        <div className="footer-copy">© 2026 newsbiz24.in</div>
      </footer>

      {/* ================= FULLSCREEN MODAL ================= */}
      {active && (
        <div className="footer-modal">
          <div className="footer-modal-content">
            {content[active]}
          </div>
        </div>
      )}
    </>
  );
}
