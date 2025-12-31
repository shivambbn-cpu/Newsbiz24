"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import RelatedPosts from "./RelatedPosts";

export default function DetailView({ post, onClose }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  if (!post || !post.category) return null;

  /* 🔹 Top scroll */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  /* 🔹 Mobile back + ESC */
  useEffect(() => {
    window.history.pushState(null, "");

    const onBack = () => onClose && onClose();
    const onEsc = (e) => e.key === "Escape" && onClose && onClose();

    window.addEventListener("popstate", onBack);
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("popstate", onBack);
      window.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  /* 🔥 FETCH RELATED POSTS (SAME CATEGORY ONLY) */
  useEffect(() => {
    const loadRelated = async () => {
      try {
        const q = query(
          collection(db, post.category), // ✅ SAME CATEGORY
          where("slug", "!=", post.slug),
          orderBy("slug"),
          orderBy("date", "desc"),
          limit(8)
        );

        const snap = await getDocs(q);

        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          category: post.category,
        }));

        setRelatedPosts(data);
      } catch (err) {
        console.error("❌ Related posts error", err);
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

      {/* ✅ SAME CATEGORY RELATED POSTS */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
