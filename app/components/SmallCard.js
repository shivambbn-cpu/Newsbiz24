"use client";

export default function SmallPostCard({ post, onSelectPost }) {
  return (
    <div className="small-card post-card" onClick={() => onSelectPost(post)}>
      <img src={post.image} alt={post.title} className="small-img" />

      <div>
        <h4>{post.title}</h4>

        {/* Content with <br> and <strong> support */}
        <div
          className="small-content"
          dangerouslySetInnerHTML={{
            __html:
              ((post.content || "").substring(0, 80) + "...").replace(
                /\n/g,
                "<br>"
              ),
          }}
        ></div>

        <small>
          {/* Date bold */}
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
