"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  /* ðŸ” Scroll to top */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  /* ðŸ”’ Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* ðŸ”™ Back button support */
  useEffect(() => {
    history.pushState({ detail: true }, "");

    const onBack = () => onClose?.();

    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, [onClose]);

  /* âŽ‹ ESC key */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="detail-overlay">
      <article className="blog-detail-card">

        {/* âœ… IMAGE WITH WRAPPER */}
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

        {/* TITLE */}
        <h1>{post.title}</h1>

        {/* CONTENT */}
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* DATE */}
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
    </div>
  );
}
