"use client";

import Link from "next/link";

export default function RelatedPosts({ posts = [], currentPost }) {
  if (!currentPost || !currentPost.category) return null;

  const relatedPosts = posts
    .filter(
      (item) =>
        item.category === currentPost.category &&
        item.slug !== currentPost.slug
    )
    .slice(0, 4);

  if (relatedPosts.length === 0) return null;

  return (
    <div id="related-posts">

      <h3>Related Posts</h3>

      {relatedPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          style={{ textDecoration: "none" }}
        >
          <div className="related-title">
            {post.title}
          </div>
        </Link>
      ))}

    </div>
  );
}


