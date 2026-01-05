"use client";

import Image from "next/image";
import { memo, useCallback } from "react";

function BigPostCard({ post, onSelectPost }) {
  if (!post) return null;

  const handleClick = useCallback(() => {
    onSelectPost(post);
  }, [post, onSelectPost]);

  // ✅ Safe image URL
  const imageUrl =
    typeof post.image === "string" && post.image.trim() !== ""
      ? post.image.trim()
      : null;

  // ✅ Safe date (Firestore + normal JS date)
  const postDate = post?.date?.toDate
    ? post.date.toDate()
    : post?.date
    ? new Date(post.date)
    : null;

  return (
    <div className="big-card post-card" onClick={handleClick}>
      {/* 🔥 Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.title || "News image"}
          width={800}
          height={450}
          priority
          className="big-img"
        />
      )}

      <div className="big-details">
        {/* ✅ Title */}
        <h2>{post.title}</h2>

        {/* ✅ Content (CSS: .big-details .big-content) */}
        <div
          className="big-content"
          dangerouslySetInnerHTML={{
            __html:
              ((post.content || "")
                .substring(0, 150)
                .replace(/\n/g, "<br />")) + "...",
          }}
        />

        {/* ✅ Date */}
        {postDate && (
          <small className="post-date-info">
            Posted on :{" "}
            {postDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </small>
        )}
      </div>
    </div>
  );
}

export default memo(BigPostCard);
