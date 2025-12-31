"use client";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="detail-view">
      {/* Back button */}
      <button className="back-btn" onClick={onClose}>
        ← Back
      </button>

      <div className="blog-detail-card">
        <img src={post.image} alt={post.title} className="detail-img" />

        <h1>{post.title}</h1>

        {/* Content with <br> and <strong> support */}
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* Date at the very end */}
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
      </div>
    </div>
  );
}
