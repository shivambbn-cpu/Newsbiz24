"use client";

import { useEffect } from "react";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  // 🔹 Scroll instantly to top when detail opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // 🔹 Handle mobile back button and Escape key
  useEffect(() => {
    window.history.pushState(null, document.title);

    const handlePopState = () => { if (onClose) onClose(); };
    const handleKeyDown = (e) => { if (e.key === "Escape" && onClose) onClose(); };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // 🔹 WhatsApp floating button
  useEffect(() => {
    if (!post) return;

    let btn = document.getElementById("whatsapp-float-btn");
    const postUrl = `${window.location.origin}/post/${post.slug}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(post.title + " " + postUrl)}`;

    if (!btn) {
      btn = document.createElement("a");
      btn.id = "whatsapp-float-btn";
      btn.target = "_blank";
      btn.innerHTML = `<img src="https://i.ibb.co/qLnXkgVb/9d22c9bbafc5d6cde2858c982c3cb6e5.jpg" style="width:100%;height:100%;border-radius:30%;">`;

      const size = window.innerWidth <= 768 ? 50 : 72;
      btn.style.cssText = `
        position:fixed;
        top:65%;
        right:20px;
        transform:translateY(-50%);
        width:${size}px;
        height:${size}px;
        background:white;
        border-radius:30%;
        box-shadow:0 4px 8px rgba(0,0,0,0.25);
        z-index:9999;
        overflow:hidden;
        display:flex;
        align-items:center;
        justify-content:center;
      `;

      document.body.appendChild(btn);
    }

    btn.href = whatsappUrl;
    btn.style.display = "flex";

    // Cleanup button when DetailView closes
    return () => {
      if (btn) btn.style.display = "none";
    };
  }, [post]);

  return (
    <div className="detail-view">
      <div className="blog-detail-card">
        <img src={post.image} alt={post.title} className="detail-img" />

        <h1>{post.title}</h1>

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <p className="detail-date">
          <strong>
            Posted on :{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </p>
      </div>
    </div>
  );
}
