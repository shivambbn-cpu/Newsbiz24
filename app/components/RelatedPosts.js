"use client";

import Link from "next/link";

export default function RelatedPosts({ posts = [], currentPost }) {
  // 🔍 DEBUG — यही add करो
  console.log("CURRENT POST CATEGORY 👉", currentPost?.category);
  console.log(
    "ALL POSTS CATEGORIES 👉",
    posts.map((p) => p.category)
  );

  if (!currentPost || posts.length === 0) return null;

  const relatedPosts = posts
    .filter(
      (post) =>
        post.category === currentPost.category &&
        post.slug !== currentPost.slug
    )
    .slice(0, 4);

  if (relatedPosts.length === 0) return null;

  return (
    <div id="related-posts" style={{ marginTop: "20px" }}>
      <h3>Related Posts</h3>

      {relatedPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          style={{ textDecoration: "none" }}
        >
          <div className="related-title">{post.title}</div>
        </Link>
      ))}
    </div>
  );
}


