"use client";

import BigPostCard from "./BigCard";
import SmallPostCard from "./SmallCard";

export default function HomeView({
  bigPosts,
  smallCards,
  onSelectPost,
}) {

  return (
    <div className="home-view">

      {/* BIG SLIDER */}
      {bigPosts?.length > 0 && (
        <BigPostCard
          posts={bigPosts}
          onSelectPost={onSelectPost}
        />
      )}

      {/* SMALL CARDS */}
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

        
