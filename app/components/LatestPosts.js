"use client";

import PostCard from "./PostCard";

export default function LatestPosts({ posts }) {
  return (
    <section className="latest-section">
      <h2>Latest Posts</h2>
      <div className="latest-grid">
        {posts.slice(0, 6).map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
  }
