"use client";

import Image from "next/image";
import {
  memo,
  useEffect,
  useState,
  useCallback,
} from "react";

function BigPostCard({
  posts = [],
  onSelectPost,
}) {

  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {

    if (posts.length <= 1) return;

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === posts.length - 1
          ? 0
          : prev + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, [posts]);

  // NO POSTS
  if (!posts.length) return null;

  const post = posts[current];

  // SAFE IMAGE
  const imageUrl =
    typeof post.image === "string" &&
    post.image.trim() !== ""
      ? post.image.trim()
      : null;

  // OPEN DETAIL
  const handleClick = useCallback(() => {
    onSelectPost(post);
  }, [post, onSelectPost]);

  return (
    <div className="hero-slider">

      {/* SLIDE */}
      <div
        className="slide-card"
        onClick={handleClick}
      >

        {/* IMAGE */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.title}
            width={1200}
            height={700}
            priority
            className="hero-image"
          />
        )}

        {/* CONTENT */}
        <div className="slide-content">

          {/* CATEGORY */}
          {post.category && (
            <span className="category-name">
              {post.category}
            </span>
          )}

          {/* TITLE */}
          <h2>{post.title}</h2>

        </div>

      </div>

      {/* DOTS */}
      <div className="slider-dots">

        {posts.map((_, index) => (

          <span
            key={index}
            className={`dot ${
              current === index ? "active" : ""
            }`}
            onClick={() => setCurrent(index)}
          />

        ))}

      </div>

    </div>
  );
}

export default memo(BigPostCard);

    
