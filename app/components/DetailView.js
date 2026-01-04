"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  /* 🔝 Scroll to top when post opens */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  /* 🔒 Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* 🔙 Mobile / Browser BACK button support */
  useEffect(() => {
    history.pushState({ detail: true }, "");

    const onBack = () => {
      onClose?.();
    };

    window.addEventListener("popstate", onBack);
    return () => {
      window.removeEventListener("popstate", onBack);
    };
  }, [onClose]);

  /* ⎋ ESC key support (Laptop/Desktop) */
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
