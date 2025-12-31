"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import RelatedPosts from "./RelatedPosts";

export default function DetailView({ post, onClose }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  if (!post) return null;

  /* 🔹 Scroll top */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  /* 🔹 Mobile back + ESC */
  useEffect(() => {
    window.history.pushState(null, document.title);

    const pop = () => onClose && onClose();
    const esc = (e) => e.key === "Escape" && onClose && onClose();

    window.addEventListener("popstate", pop);
    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("popstate", pop);
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  /* 🔥 FETCH RELATED POSTS (MAIN FIX) */
  useEffect(() => {
    if (!post?.category) return;

    const loadRelated = async () => {
      try {
        const q = query(
          collection(db, post.category),
          where("slug", "!=", post.slug),
          orderBy("slug"),
          orderBy("date", "desc"),
          limit(8)
        );

        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }));

        setRelatedPosts(data);
      } catch (e) {
        console.error("Related post error", e);
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

      {/* ✅ RELATED POSTS FINALLY SHOW */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
