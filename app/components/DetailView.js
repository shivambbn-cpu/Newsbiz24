"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DetailView({ post, onClose }) {
  const [loading, setLoading] = useState(true);

  // 🔹 Scroll to top when post changes
  useEffect(() => {
    if (post) {
      window.scrollTo(0, 0);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [post]);

  // 🔹 Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  // 🔹 Back button support
  useEffect(() => {
    history.pushState({ detail: true }, "");
    const onBack = () => onClose?.();
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, [onClose]);

  // 🔹 ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 🔹 WhatsApp float button
  useEffect(() => {
    if (!post) return;

    let btn = document.getElementById("whatsapp-float-btn");

    const postUrl = `${window.location.origin}/post/${post.slug}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
      post.title + " " + postUrl
    )}`;

    if (!btn) {
      btn = document.createElement("a");
      btn.id = "whatsapp-float-btn";
      btn.target = "_blank";
      btn.innerHTML = `
        <img src="https://i.ibb.co/qLnXkgVb/9d22c9bbafc5d6cde2858c982c3cb6e5.jpg"
        style="width:100%;height:100%;border-radius:30%;" />
      `;
      const size = window.innerWidth <= 768 ? 50 : 72;
      btn.style.cssText = `
        position:fixed;
        top:75%;
        right:20px;
        transform:translateY(-50%);
        width:${size}px;
        height:${size}px;
        background:white;
        border-radius:30%;
        box-shadow:0 4px 8px rgba(0,0,0,0.25);
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:center;
      `;
      document.body.appendChild(btn);
    }

    btn.href = whatsappUrl;
    btn.style.display = "flex";

    return () => {
      if (btn) btn.remove();
    };
  }, [post]);

  // 🔹 Loader Styles
  const loaderWrap = {
    minHeight: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loader = {
    width: "46px",
    height: "46px",
    border: "4px solid rgba(22,163,74,0.2)",
    borderTop: "4px solid #16a34a",
    borderRadius: "50%",
    animation: "spinFast 0.6s linear infinite",
    boxShadow: "0 0 12px rgba(22,163,74,0.35)",
  };

  return (
    <div className="detail-overlay">
      {loading || !post ? (
        <div style={loaderWrap}>
          <div style={loader}></div>
        </div>
      ) : (
        <article className="blog-detail-card">
          {post.image && (
            <div className="detail-image-wrapper">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="detail-img"
              />
            </div>
          )}
          <h1>{post.title}</h1>
          <div
            className="detail-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.date && (
            <p className="detail-date">
              Posted on :{" "}
              {new Date(
                post.date?.toDate ? post.date.toDate() : post.date
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </article>
      )}
      <style>
        {`
          @keyframes spinFast {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

    
