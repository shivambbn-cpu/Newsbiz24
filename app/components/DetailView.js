"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  // 🔹 Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // 🔹 Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 🔹 ESC key support (NO history push)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="detail-overlay">
      {/* Close button */}
      <button className="detail-close" onClick={onClose}>
        ✕
      </button>

      <article className="detail-card">
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

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.date && (
          <p className="detail-date">
            <strong>
              Posted on :{" "}
              {new Date(
                post.date?.toDate ? post.date.toDate() : post.date
              ).toLocaleDateString("en-IN", {
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
