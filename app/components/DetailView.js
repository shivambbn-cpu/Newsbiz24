"use client";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="detail-view">
      {/* Back button */}
      <button className="back-btn" onClick={onClose}>
        ← Back
      </button>

      {/* Blog detail card */}
      <div className="blog-detail-card">
        <img
          src={post.image}
          alt={post.title}
          className="detail-img"
        />

        <h1>{post.title}</h1>

        <p className="detail-date">
          <strong>
            Posted on :{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </p>

        {/* Content with HTML / <br> support */}
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>

      {/* Related posts */}
      <h3>Related Posts</h3>
      <div id="related-posts" className="related-posts-section"></div>

      {/* Latest posts */}
      <div className="latest-section">
        <h3>Latest Posts</h3>
        <div id="latest-posts"></div>
      </div>
    </div>
  );
}
