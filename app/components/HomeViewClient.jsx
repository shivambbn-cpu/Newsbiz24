"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import BigPostCard from "./BigCard";
import SmallPostCard from "./SmallCard";

/**
 * 🔥 DetailView lazy load
 * - JS tabhi load hoga jab click hoga
 */
const DetailView = dynamic(() => import("./DetailView"), {
  ssr: false,
});

export default function HomeViewClient({ bigCard, smallCards }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  return (
    <>
      {/* ⭐ Big Card */}
      {bigCard && (
        <BigPostCard
          post={bigCard}
          onSelectPost={handleSelectPost}
        />
      )}

      {/* ⭐ Small Cards */}
      <div className="small-cards-container">
        {smallCards?.map((post) => (
          <SmallPostCard
            key={post.id}
            post={post}
            onSelectPost={handleSelectPost}
          />
        ))}
      </div>

      {/* ⭐ Detail Modal */}
      {isOpen && selectedPost && (
        <DetailView
          post={selectedPost}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
