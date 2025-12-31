"use client";

import PostCard from "./PostCard";

export default function RelatedPosts({ posts = [] }) {
  // 🛑 Safety check
  if (!Array.isArray(posts) || posts.length === 0) return null;

  return (
    <section className="related-section">
      <h2 className="related-title">Related Posts</h2>

      <div className="related-list">
        {posts.slice(0, 8).map((p) => (
          <PostCard key={p.id || p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
