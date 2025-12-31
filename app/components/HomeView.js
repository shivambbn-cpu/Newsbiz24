"use client";

import BigPostCard from "./BigPostCard";
import SmallPostCard from "./SmallPostCard";

export default function HomeView({ bigCard, smallCards, onSelectPost }) {
  return (
    <div className="home-view">

      {/* ⭐ Big Post Card */}
      <BigPostCard post={bigCard} onSelectPost={onSelectPost} />

      {/* ⭐ Small Post Cards */}
      <div className="small-cards-container">
        {smallCards.length === 0 && <p>Loading posts...</p>}

        {smallCards.map((post) => (
          <SmallPostCard
            key={post.id}
            post={post}
            onSelectPost={onSelectPost}
          />
        ))}
      </div>
    </div>
  );
}
