"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PostCard from "@/components/PostCard";

export default function DetailView({ post, onClose }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  if (!post) return null;

  // 🔹 Scroll instantly to top when detail opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // 🔹 Handle mobile back button and Escape key
  useEffect(() => {
    window.history.pushState(null, document.title);

    const handlePopState = () => onClose?.();
    const handleKeyDown = (e) => e.key === "Escape" && onClose?.();

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // 🔹 WhatsApp floating button
  useEffect(() => {
    let btn = document.getElementById("whatsapp-float-btn");

    const postUrl = `${window.location.origin}/post/${post.slug}`;
    const whatsappUrl =
      `whatsapp://send?text=${encodeURIComponent(post.title + " " + postUrl)}`;

    if (!btn) {
      btn = document.createElement("a");
      btn.id = "whatsapp-float-btn";
      btn.target = "_blank";
      btn.innerHTML =
        `<img src="https://i.ibb.co/qLnXkgVb/9d22c9bbafc5d6cde2858c982c3cb6e5.jpg"
         style="width:100%;height:100%;border-radius:30%;">`;

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
      if (btn) btn.style.display = "none";
    };
  }, [post]);

  // 🔥 Fetch 8 related posts (same category)
  useEffect(() => {
    async function fetchRelated() {
      try {
        const snap = await getDocs(collection(db, post.category));

        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(p => p.slug !== post.slug)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 8);

        setRelatedPosts(data);
      } catch (err) {
        console.error("Related posts error:", err);
      }
    }

    fetchRelated();
  }, [post]);

  return (
    <div className="detail-view">
      <div className="blog-detail-card">
        <img src={post.image} alt={post.title} className="detail-img" />

        <h1>{post.title}</h1>

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <p className="detail-date">
          <strong>
            Posted on{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </p>
      </div>

      {/* 🔥 RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <div className="related-section">
          <h2>Related Posts</h2>

          <div className="related-grid">
            {relatedPosts.map(p => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
