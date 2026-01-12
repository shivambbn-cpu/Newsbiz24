"use client";

import { useEffect } from "react";
import Image from "next/image";
import RelatedPosts from "./RelatedPosts"; // ✅ IMPORT

export default function DetailView({ post, allPosts = [], onClose }) {
  if (!post) return null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  useEffect(() => {
    history.pushState({ detail: true }, "");
    const onBack = () => onClose?.();
    window.addEventListener("popstate", onBack);
    return () => window.removeEventListener("popstate", onBack);
  }, [onClose]);

  return (
    <div className="detail-overlay">
      <article className="blog-detail-card">

        {/* IMAGE */}
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

        <h1>{post.title}</h1>

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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

        {/* 🔥 RELATED POSTS (DETAIL KE NICHE) */}
        <RelatedPosts
          posts={allPosts}
          currentPost={post}
        />

      </article>
    </div>
  );
}


