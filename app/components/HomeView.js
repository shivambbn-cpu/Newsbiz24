"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import BigPostCard from "./BigCard";
import SmallPostCard from "./SmallCard";

/**
 * Ã°Å¸â€Â¥ Turbopack Optimized Dynamic Import
 * - DetailView JS tabhi load hoga jab click hoga
 * - Initial bundle super small rahega
 */
const DetailView = dynamic(() => import("./DetailView"), {
  ssr: false, // client-only (modal / overlay ke liye best)
});

export default function HomeView({ bigCard, smallCards }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Ã¢Â­Â Card click handler
  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  return (
    <div className="home-view">
      {/* Ã¢Â­Â Big Card */}
      {bigCard && (
        <BigPostCard
          post={bigCard}
          onSelectPost={handleSelectPost}
        />
      )}

      {/* Ã¢Â­Â Small Cards */}
      <div className="small-cards-container">
        {smallCards?.map((post) => (
          <SmallPostCard
            key={post.id}
            post={post}
            onSelectPost={handleSelectPost}
          />
        ))}
      </div>

      {/* Ã°Å¸â€Â¥ Dynamic Detail View (NO loading UI) */}
      {isOpen && selectedPost && (
        <DetailView
          post={selectedPost}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
