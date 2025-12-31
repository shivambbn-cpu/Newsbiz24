"use client";

export default function SmallPostCard({ post, onSelectPost }) {
  return (
    <div className="small-card post-card" onClick={() => onSelectPost(post)}>
      <img src={post.image} alt={post.title} className="small-img" />

      <div>
        <h4>{post.title}</h4>

        <p>{(post.content || "").substring(0, 80)}...</p>

        <small>
          Posted on :{" "}
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </small>
      </div>
    </div>
  );
}
