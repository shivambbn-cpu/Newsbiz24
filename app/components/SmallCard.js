"use client";

export default function SmallPostCard({ post, onSelectPost }) {
  return (
    <div className="small-card post-card" onClick={() => onSelectPost(post)}>
      <img src={post.image} alt={post.title} className="small-img" />

      <h4>{post.title}</h4>

      <small>
        {new Date(post.date).toLocaleDateString("en-IN")}
      </small>
    </div>
  );
}
