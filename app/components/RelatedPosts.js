"use client";

export default function RelatedPosts({ posts = [], currentPost }) {
  if (!posts || posts.length < 2 || !currentPost) return null;

  const related = posts
    .filter((p) => {
      if (!p?.slug || !p?.category) return false;
      return (
        p.slug !== currentPost.slug &&
        p.category.toLowerCase() ===
          currentPost.category?.toLowerCase()
      );
    })
    .sort((a, b) => {
      const getDate = (post) => {
        if (post.publishedAt?.toDate)
          return post.publishedAt.toDate();
        if (post.date?.toDate) return post.date.toDate();
        if (post.publishedAt) return new Date(post.publishedAt);
        if (post.date) return new Date(post.date);
        return new Date(0);
      };
      return getDate(b) - getDate(a);
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

        
