"use client";

import PostCard from "./PostCard";

export default function RelatedPosts({ posts }) {
  if (posts.length === 0) return null;

  return (
    <section className="related-section">
      <h2>Related Posts</h2>
      <div className="related-grid">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
            }
