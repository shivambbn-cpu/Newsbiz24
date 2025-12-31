"use client";

import { useEffect } from "react";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  // ðŸ”¹ Scroll instantly to top when detail opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // ðŸ”¹ Handle mobile back button and Escape key
  useEffect(() => {
    // Push new state to history so back button can be detected
    window.history.pushState(null, document.title);

    const handlePopState = () => {
      // Mobile back button pressed
      if (onClose) onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // Escape key pressed
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
