"use client";

import { useState } from "react";

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

  return (
    <>
      {/* Footer Buttons */}
      <footer style={styles.footer}>
        <button onClick={() => setActive("about")}>About Us</button>
        <button onClick={() => setActive("contact")}>Contact Us</button>
        <button onClick={() => setActive("privacy")}>Privacy Policy</button>
        <button onClick={() => setActive("terms")}>Terms & Conditions</button>

        <p style={{ marginTop: 10 }}>© 2026 newsbiz24.in</p>
      </footer>

      {/* Fullscreen Modal */}
      {active && (
        <div style={styles.overlay} onClick={() => setActive(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.close} onClick={() => setActive(null)}>
              ✕
            </button>
            {content[active]}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  footer: {
    background: "#a8d0a8",
    padding: "15px",
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    height: "100%",
    padding: "20px",
    overflowY: "auto",
  },
  close: {
    float: "right",
    fontSize: "18px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
};
