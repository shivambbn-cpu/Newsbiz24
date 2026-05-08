"use client";

import BigPostCard from "./BigCard";
import SmallPostCard from "./SmallCard";

export default function HomeView({
  bigCard,
  smallCards,
  onSelectPost,
}) {
  return (
    <div className="home-view">
      {bigCard && (
        <BigPostCard
          post={bigCard}
          onSelectPost={() => onSelectPost(bigCard)}
        />
      )}

      <div className="small-cards-container">
        {smallCards?.map((post) => (
          <SmallPostCard
            key={post.id}
            post={post}
            onSelectPost={() => onSelectPost(post)}
          />
        ))}
      </div>
    </div>
  );
}

              
