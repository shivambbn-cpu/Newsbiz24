"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RelatedPosts from "./RelatedPosts";

export default function DetailView({ post, onClose }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  if (!post) return null;

  // 🔹 Scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // 🔹 Back button + ESC
  useEffect(() => {
    window.history.pushState(null, "");

    const pop = () => onClose && onClose();
    const esc = (e) => e.key === "Escape" && onClose && onClose();

    window.addEventListener("popstate", pop);
    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("popstate", pop);
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  // 🔹 FETCH RELATED POSTS (🔥 MAIN FIX)
  useEffect(() => {
    async function loadRelated() {
      if (!post?.category) return;

      try {
        const q = query(
          collection(db, post.category),
          where("slug", "!=", post.slug),
          limit(8)
        );

        const snap = await getDocs(q);

        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setRelatedPosts(list);
      } catch (e) {
        console.error("Related post error:", e);
      }
    }

    loadRelated();
  }, [post]);

  // 🔹 WhatsApp floating
  useEffect(() => {
    let btn = document.getElementById("whatsapp-float-btn");
    if (!btn) {
      btn = document.createElement("a");
      btn.id = "whatsapp-float-btn";
      btn.target = "_blank";
      btn.innerHTML = "🟢";
      btn.style.cssText =
        "position:fixed;right:20px;bottom:80px;font-size:32px;z-index:9999;";
      document.body.appendChild(btn);
    }

    btn.href = `whatsapp://send?text=${encodeURIComponent(
      post.title + " " + window.location.href
    )}`;

    return () => btn && btn.remove();
  }, [post]);

  return (
    <div className="detail-view">
      <div className="blog-detail-card">
        <img src={post.image} className="detail-img" />
        <h1>{post.title}</h1>

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <p className="detail-date">
          {new Date(post.date).toLocaleDateString("en-IN")}
        </p>

        {/* ✅ RELATED POSTS SHOW HERE */}
        <RelatedPosts posts={relatedPosts} />
      </div>
    </div>
  );
}
