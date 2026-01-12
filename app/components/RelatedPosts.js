"use client";

export default function RelatedPosts({ posts }) {
  return (
    <div style={{ padding: 20, background: "#e8f3ff" }}>
      <h3>Related Posts TEST</h3>
      {posts?.map((p) => (
        <div key={p.slug}>{p.title}</div>
      ))}
    </div>
  );
}
