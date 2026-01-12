"use client";

import Link from "next/link";

export default function RelatedPosts({ posts = [], currentPost }) {
  if (!currentPost || posts.length === 0) return null;

  // 🔹 Filter related posts (same category, exclude current)
  const relatedPosts = posts
    .filter(
      (p) =>
        p.category === currentPost.category &&
        p.slug !== currentPost.slug
    )
    .slice(0, 4); // max 4 posts

  if (relatedPosts.length === 0) return null;

  return (
    <div className="related-wrapper">
      <h3 className="related-title">Related Posts</h3>

      {relatedPosts.map((post) => (
        <Link
          href={`/${post.slug}`}
          key={post.slug}
          className="related-card"
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
}

