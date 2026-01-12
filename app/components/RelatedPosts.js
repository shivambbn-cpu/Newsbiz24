"use client";

export default function RelatedPosts({ posts = [], currentPost }) {
  if (!posts || posts.length < 2 || !currentPost) return null;

  const related = posts
    .filter((p) => {
      return (
        p.slug !== currentPost.slug &&
        p.category?.toLowerCase() ===
          currentPost.category?.toLowerCase()
      );
    })
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt) : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt) : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  if (!related.length) return null;

  return (
    <div id="related-posts">
      <h3>Related Posts</h3>

      {related.map((p) => (
        <div
          key={p.id || p.slug}
          className="related-card"
          onClick={() => (window.location.href = `/post/${p.slug}`)}
        >
          {p.title}
        </div>
      ))}
    </div>
  );
}
