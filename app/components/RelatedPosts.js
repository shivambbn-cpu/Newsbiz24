"use client";

export default function RelatedPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div id="related-posts">
      <h3>Related Posts</h3>

      {posts.map((p) => (
        <div
          key={p.id}
          className="related-title"
          onClick={() => window.location.href = `/post/${p.slug}`}
        >
          {p.title}
        </div>
      ))}
    </div>
  );
}
