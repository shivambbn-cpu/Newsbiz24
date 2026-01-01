"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import BigPostCard from "./BigCard";
import SmallPostCard from "./SmallCard";

const DetailView = dynamic(() => import("./DetailView"), {
  ssr: false,
});

export default function HomeView({ bigCard, smallCards }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="content-wrapper">
      {!selectedPost ? (
        <>
          {bigCard && (
            <BigPostCard post={bigCard} onSelectPost={setSelectedPost} />
          )}

          {smallCards.map(post => (
            <SmallPostCard
              key={post.id}
              post={post}
              onSelectPost={setSelectedPost}
            />
          ))}
        </>
      ) : (
        <DetailView post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}
