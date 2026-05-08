"use client";

import Image from "next/image";
import {
  memo,
  useCallback,
  useEffect,
  useState,
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

  // CLICK
  const handleClick = useCallback(() => {
    onSelectPost(post);
  }, [post, onSelectPost]);

  // SAFE IMAGE
  const imageUrl =
    typeof post.image === "string" &&
    post.image.trim() !== ""
      ? post.image.trim()
      : null;

  // SAFE DATE
  const postDate = post?.date?.toDate
    ? post.date.toDate()
    : post?.date
    ? new Date(post.date)
    : null;

  return (
    <div className="big-slider-card">

      {/* IMAGE */}
      {imageUrl && (
        <div
          className="big-slider-image-wrap"
          onClick={handleClick}
        >
          <Image
            src={imageUrl}
            alt={post.title}
            width={1200}
            height={700}
            priority
            className="big-slider-image"
          />
        </div>
      )}

      {/* DETAILS */}
      <div
        className="big-slider-details"
        onClick={handleClick}
      >

        {/* CATEGORY */}
        {post.category && (
          <span className="big-slider-category">
            {post.category}
          </span>
        )}

        {/* TITLE */}
        <h2 className="big-slider-title">
          {post.title}
        </h2>

        {/* CONTENT */}
        <p
          className="big-slider-content"
          dangerouslySetInnerHTML={{
            __html:
              ((post.content || "")
                .substring(0, 180)
                .replace(/\n/g, "<br />")) + "...",
          }}
        />

        {/* DATE */}
        {postDate && (
          <small className="big-slider-date">
            Posted on :{" "}
            {postDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </small>
        )}

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
