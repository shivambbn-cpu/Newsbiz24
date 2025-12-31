"use client";

export default function RelatedPosts({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <div id="related-posts">   {/* 🔥 ID MUST MATCH CSS */}
      <h3>Related Posts</h3>

      {posts.map((p) => (
        <div
          key={p.id}
          className="related-title"
          onClick={() => (window.location.href = `/post/${p.slug}`)}
        >
          {p.title}
        </div>
      ))}
    </div>
  );
}
