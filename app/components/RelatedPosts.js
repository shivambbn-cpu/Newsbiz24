"use client";

import Link from "next/link";

export default function RelatedPosts({ posts = [], currentPost }) {
  // Agar data hi nahi hai toh return null
  if (!currentPost || !currentPost.category || !posts.length) {
    return null;
  }

  const currentCategory = currentPost.category.toString().trim().toLowerCase();

  const relatedPosts = posts
    .filter((p) => {
      if (!p.category || !p.slug) return false;
      
      const postCategory = p.category.toString().trim().toLowerCase();
      return (
        postCategory === currentCategory && 
        p.slug !== currentPost.slug
      );
    })
    .slice(0, 4);

  // Debugging ke liye:
  console.log("Related Posts found:", relatedPosts.length);

  if (relatedPosts.length === 0) return null;

  return (
    <section id="related-posts" style={{ marginTop: "2rem", borderTop: "1px solid #eee" }}>
      <h3>Related Posts</h3>
      <div className="related-grid">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            style={{ textDecoration: "none", display: "block", marginBottom: "10px" }}
          >
            <div className="related-title" style={{ color: "blue" }}>
              {post.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}



                          
