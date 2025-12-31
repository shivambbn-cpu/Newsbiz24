"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import RelatedPosts from "./RelatedPosts";

export default function DetailView({ post, onClose }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  if (!post || !post.category) return null;

  /* 🔹 Scroll top */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  /* 🔹 Mobile back + ESC */
  useEffect(() => {
    window.history.pushState(null, "");

    const back = () => onClose && onClose();
    const esc = (e) => e.key === "Escape" && onClose && onClose();

    window.addEventListener("popstate", back);
    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("popstate", back);
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  /* 🔥 FETCH RELATED POSTS (FIXED LOGIC) */
  useEffect(() => {
    const loadRelated = async () => {
      try {
        const q = query(
          collection(db, post.category),   // ✅ same category
          orderBy("date", "desc"),
          limit(12)                        // thoda zyada lao
        );

        const snap = await getDocs(q);

        const data = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(p => p.slug !== post.slug) // ❗ JS filter
          .slice(0, 8);                      // ✅ only 8

        setRelatedPosts(data);
      } catch (e) {
        console.error("❌ Related load error", e);
      }
    };

    loadRelated();
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

      {/* ✅ NOW IT WILL SHOW */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
