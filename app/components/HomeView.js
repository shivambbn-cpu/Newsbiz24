"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import BigPostCard from "./BigCard";
import SmallPostCard from "./SmallCard";

/**
 * 🔥 Turbopack Optimized Dynamic Import
 * - DetailView JS tabhi load hoga jab click hoga
 * - Initial bundle super small rahega
 */
const DetailView = dynamic(() => import("./DetailView"), {
  loading: () => (
    <div style={{ padding: 20, textAlign: "center" }}>
      Loading...
    </div>
  ),
  ssr: false, // DetailView client-only (modal / overlay ke liye best)
});

export default function HomeView({ bigCard, smallCards }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // ⭐ Card click handler
  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  return (
    <div className="home-view">
      {/* ⭐ Big Card */}
      {bigCard && (
        <BigPostCard
          post={bigCard}
          onSelectPost={handleSelectPost}
        />
      )}

      {/* ⭐ Small Cards */}
      <div className="small-cards-container">
        {(!smallCards || smallCards.length === 0) && (
          <p>Loading posts...</p>
        )}

        {smallCards?.map((post) => (
          <SmallPostCard
            key={post.id}
            post={post}
            onSelectPost={handleSelectPost}
          />
        ))}
      </div>

      {/* 🔥 Dynamic Detail View (Turbopack friendly) */}
      {isOpen && selectedPost && (
        <DetailView
          post={selectedPost}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
