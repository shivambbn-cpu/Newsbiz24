"use client";

import Image from "next/image";
import { memo, useCallback } from "react";

function BigPostCard({ post, onSelectPost }) {
  if (!post) return null; // ❌ no loading text

  // 🚀 stable click handler (performance boost)
  const handleClick = useCallback(() => {
    onSelectPost(post);
  }, [post, onSelectPost]);

  return (
    <div className="big-card post-card" onClick={handleClick}>
      {/* 🔥 Next.js Image = Turbopack optimized */}
      <Image
  src={post.image ? post.image.trim() : ""}
  alt={post.title}
  width={800}
  height={450}
  priority // LCP improve
  className="big-img"
/>
     <div className="big-details">
        <h2>{post.title}</h2>

        {/* ✅ <br> & <strong> supported content */}
        <div
          className="big-content"
          dangerouslySetInnerHTML={{
            __html:
              ((post.content || "")
                .substring(0, 150)
                .replace(/\n/g, "<br>")) + "...",
          }}
        />

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

/**
 * 🔥 memo() = unnecessary re-render stop
 * Turbopack + React 19 ready
 */
export default memo(BigPostCard);
