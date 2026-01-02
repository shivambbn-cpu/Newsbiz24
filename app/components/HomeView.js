"use client";

import BigPostCard from "./BigCard";
import SmallPostCard from "./SmallCard";
import { useRouter } from "next/navigation";

export default function HomeView({ bigCard, smallCards }) {
  const router = useRouter();

  const openPost = (slug) => {
    router.push(`/news/${slug}`);
  };

  return (
    <div className="home-view">
      {bigCard && (
        <BigPostCard
          post={bigCard}
          onSelectPost={() => openPost(bigCard.slug)}
        />
      )}

      <div className="small-cards-container">
        {smallCards?.map((post) => (
          <SmallPostCard
            key={post.id}
            post={post}
            onSelectPost={() => openPost(post.slug)}
          />
        ))}
      </div>
    </div>
  );
}
