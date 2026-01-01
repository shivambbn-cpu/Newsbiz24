"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function DetailView({ post, onClose }) {
  // ❌ Post nahi hai → kuch render mat karo (FAST)
  if (!post) return null;

  /**
   * 🔹 1. Scroll to top instantly on open
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  /**
   * 🔹 2. Scroll lock (background freeze)
   * Turbopack friendly
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /**
   * 🔹 3. Mobile back button + ESC key support
   */
  useEffect(() => {
    // History me ek state push karo (back detect ke liye)
    window.history.pushState(null, document.title);

    const handlePopState = () => {
      if (onClose) onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (onClose) onClose();
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="detail-overlay">
      {/* 🔙 Close Button */}
      <button className="detail-close" onClick={onClose}>
        ✕
      </button>

      <article className="detail-card">
        {/* 🚀 Optimized Image (Next/Image) */}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            priority
            className="detail-img"
          />
        )}

        <h1>{post.title}</h1>

        {/* ⚡ Blog Content */}
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 📅 Date */}
        {post.date && (
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
        )}
      </article>
    </div>
  );
}
