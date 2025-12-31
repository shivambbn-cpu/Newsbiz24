"use client";

export default function DetailView() {
  return (
    <div id="detail-view" style={{ display: "none" }}>
      <div id="blog-detail-card" className="blog-detail-card">
        <img id="detail-image" className="detail-img" />
        <h1 id="detail-title"></h1>
        <div id="detail-content" className="detail-content"></div>

        <p className="detail-date">
          Posted on : <span id="detail-date"></span>
        </p>
      </div>

      <h3>Related Posts</h3>
      <div id="related-posts" className="related-posts-section"></div>

      <div className="latest-section">
        <h3>Latest Posts</h3>
        <div id="latest-posts"></div>
      </div>
    </div>
  );
}
