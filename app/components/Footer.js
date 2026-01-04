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

  /* 🔙 Mobile back button + browser back */
  useEffect(() => {
    if (!active) return;

    history.pushState({ modal: true }, "");

    const handlePopState = () => {
      setActive(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [active]);

  /* ⎋ ESC key close (Laptop/Desktop) */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setActive(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Footer */}
      <footer className="site-footer">
        <button onClick={() => setActive("about")}>About Us</button>
        <button onClick={() => setActive("contact")}>Contact Us</button>
        <button onClick={() => setActive("privacy")}>Privacy Policy</button>
        <button onClick={() => setActive("terms")}>Terms & Conditions</button>

        <p>© 2026 newsbiz24.in</p>
      </footer>

      {/* Fullscreen Content */}
      {active && (
        <div className="footer-overlay">
          <div className="footer-modal">{content[active]}</div>
        </div>
      )}
    </>
  );
}
