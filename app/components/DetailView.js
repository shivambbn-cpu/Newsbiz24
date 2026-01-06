"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  /* 🔝 Scroll to top */
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

  /* 🔙 Back button support */
  useEffect(() => {
    history.pushState({ detail: true }, "");

    const onBack = () => onClose?.();

    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, [onClose]);

  /* ⎋ ESC key */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /* 🟢 WHATSAPP SHARE BUTTON */
  useEffect(() => {
    function updateWhatsAppShareButton(blog) {
      let btn = document.getElementById("whatsapp-float-btn");

      if (!blog) {
        if (btn) btn.style.display = "none";
        return;
      }

      const postUrl = `${window.location.origin}/post/${blog.slug}`;
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
        blog.title + " " + postUrl
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
          overflow:hidden;
          display:flex;
          align-items:center;
          justify-content:center;
        `;

        document.body.appendChild(btn);
      }

      btn.href = whatsappUrl;
      btn.style.display = "flex";
    }

    updateWhatsAppShareButton(post);

    return () => {
      const btn = document.getElementById("whatsapp-float-btn");
      if (btn) btn.remove();
    };
  }, [post]);

  return (
    <div className="detail-overlay">
      <article className="blog-detail-card">

        {/* ✅ IMAGE */}
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
