"use client";

import Link from "next/link";
import Image from "next/image";

export default function RelatedPosts({ posts = [], currentPost }) {
  if (!currentPost || posts.length === 0) return null;

  const relatedPosts = posts
    .filter(
      (post) =>
        post.category === currentPost.category &&
        post.slug !== currentPost.slug
    )
    .slice(0, 3); // 3 related posts

  if (relatedPosts.length === 0) return null;

  return (
    <div className="related-wrapper">
      <h3 className="related-title">Related Posts</h3>

      {relatedPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          className="related-card"
        >
          {/* 🔹 Image */}
          {post.Image && (
            <div className="related-img">
              <Image
                src={post.Image}
                alt={post.title}
                width={90}
                height={70}
                unoptimized
              />
            </div>
          )}

          {/* 🔹 Text */}
          <div className="related-text">
            <p className="related-post-title">{post.title}</p>
            {post.Date && (
              <span className="related-date">
                Posted on : {post.Date}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

