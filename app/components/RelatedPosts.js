"use client";

export default function RelatedPosts({ posts = [], currentPost }) {
  if (!posts.length || !currentPost) return null;

  // 🔥 Same category → latest → current post remove → limit 5
  const related = posts
    .filter(
      (p) =>
        p.category === currentPost.category &&
        p.slug !== currentPost.slug
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt) - new Date(a.publishedAt)
    )
    .slice(0, 5);

  if (!related.length) return null;

  return (
    <div id="related-posts">
      <h3>Related Posts</h3>

      {related.map((p) => (
        <div
          key={p.id}
          className="related-card"
          onClick={() => (window.location.href = `/post/${p.slug}`)}
        >
          {p.title}
        </div>
      ))}
    </div>
  );
}
