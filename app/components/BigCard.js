"use client";

export default function BigPostCard({ post, onSelectPost }) {
  if (!post) return <p>Loading big card...</p>;

  return (
    <div className="big-card post-card" onClick={() => onSelectPost(post)}>
      <img src={post.image} alt={post.title} className="big-img" />

      <div className="big-details">
        <h2>{post.title}</h2>

        <p>{(post.content || "").substring(0, 150)}...</p>

        <small>
          {new Date(post.date).toLocaleDateString("en-IN")}
        </small>
      </div>
    </div>
  );
}
