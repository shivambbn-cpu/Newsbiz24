"use client";

export default function BigPostCard({ post, onSelectPost }) {
  if (!post) return <p>Loading big card...</p>;

  return (
    <div className="big-card post-card" onClick={() => onSelectPost(post)}>
      <img src={post.image} alt={post.title} className="big-img" />

      <div className="big-details">
        <h2>{post.title}</h2>

        {/* Content with <br> support */}
        <div
          className="big-content"
          dangerouslySetInnerHTML={{
            __html: (post.content || "").substring(0, 150) + "...",
          }}
        ></div>

        <small>
          <strong>
            Posted on :{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </small>
      </div>
    </div>
  );
}
