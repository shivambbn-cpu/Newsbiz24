"use client";

export default function RelatedPosts({ posts = [], currentPost }) {
  if (!posts.length || !currentPost) return null;

  // 🔹 Same category + latest 5 (current post exclude)
  const related = posts
    .filter(
      (p) =>
        p.slug !== currentPost.slug &&
        p.category &&
        currentPost.category &&
        p.category.toLowerCase() === currentPost.category.toLowerCase()
    )
    .sort((a, b) => {
      const d1 = a.date?.toDate ? a.date.toDate() : new Date(a.date || 0);
      const d2 = b.date?.toDate ? b.date.toDate() : new Date(b.date || 0);
      return d2 - d1;
    })
    .slice(0, 5);

  if (!related.length) return null;

  return (
    <div id="related-posts">
      <h3>Related Posts</h3>

      {related.map((p) => (
        <div
          key={p.slug}
          className="related-title"
          onClick={() => {
            window.location.href = `/post/${p.slug}`;
          }}
        >
          {p.title}
        </div>
      ))}
    </div>
  );
}

                   
