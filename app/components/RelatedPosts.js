"use client";

export default function RelatedPosts({ posts }) {
  return (
    <div style={{ padding: 20, background: "#e8f3ff" }}>
      <h3>Related Posts TEST</h3>

      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
