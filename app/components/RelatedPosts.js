"use client";

export default function RelatedPosts({ posts = [], currentPost }) {
  if (!posts.length || !currentPost) return null;

  const related = posts
    .filter(
      p =>
        p.slug !== currentPost.slug &&
        p.category === currentPost.category
    )
    .slice(0, 5);

  if (!related.length) return null;

  return (
    <div id="related-posts">
      <h3>Related Posts</h3>

      {related.map(p => (
        <div
          key={p.slug}
          className="related-title"
          onClick={() => window.location.href = `/post/${p.slug}`}
        >
          {p.title}
        </div>
      ))}
    </div>
  );
}
