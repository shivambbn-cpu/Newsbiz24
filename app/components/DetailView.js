"use client";

export default function DetailView({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="detail-view">
      <button className="back-btn" onClick={onClose}>
        ← Back
      </button>

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

        <div className="detail-content">
          {post.content}
        </div>
      </div>
    </div>
  );
}
