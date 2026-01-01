"use client";

import Image from "next/image";
import { memo, useCallback } from "react";

function SmallPostCard({ post, onSelectPost }) {
  if (!post) return null;

  // 🚀 Stable click handler
  const handleClick = useCallback(() => {
    onSelectPost(post);
  }, [post, onSelectPost]);

  return (
    <div className="small-card post-card" onClick={handleClick}>
      {/* 🔥 Next.js Image = Turbopack optimized */}
      <Image
        src={post.image}
        alt={post.title}
        width={400}
        height={225}
        loading="lazy"       // above fold ke liye lazy / default
        className="small-img"
        style={{ objectFit: "cover" }}
      />

      {/* TEXT BLOCK */}
      <div>
        <h4>{post.title}</h4>

        {/* CONTENT */}
        <p>{(post.content || "").substring(0, 100)}...</p>

        {/* DATE */}
        <small>
          <strong>
            Posted on :{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </small>
      </div>
    </div>
  );
}

// 🔥 memo() = prevent unnecessary re-renders
export default memo(SmallPostCard);
