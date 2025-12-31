"use client";

export default function HomeView({ bigCard, smallCards, onSelectPost }) {
  return (
    <div className="home-view">
      {bigCard ? (
        <div className="big-card post-card" onClick={() => onSelectPost(bigCard)}>
          <img src={bigCard.image} alt={bigCard.title} className="big-img" />
          <div className="big-details">
            <h2>{bigCard.title}</h2>
            <p>{(bigCard.content || "").substring(0, 150)}...</p>
            <small>{new Date(bigCard.date).toLocaleDateString("en-IN")}</small>
          </div>
        </div>
      ) : (
        <p>Loading big card...</p>
      )}

      <div className="small-cards-container">
        {smallCards.length === 0 && <p>Loading posts...</p>}
        {smallCards.map(post => (
          <div key={post.id} className="small-card post-card" onClick={() => onSelectPost(post)}>
            <img src={post.image} alt={post.title} className="small-img" />
            <h4>{post.title}</h4>
            <small>{new Date(post.date).toLocaleDateString("en-IN")}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
