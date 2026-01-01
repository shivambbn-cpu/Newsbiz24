"use client";

import { useState } from "react";

import Header from "./Header";
import SideMenu from "./SideMenu";
import HomeView from "./HomeView";
import DetailView from "./DetailView";
import Footer from "./Footer";

export default function HomeClient({ initialData }) {
  const [currentCategory, setCurrentCategory] = useState("astro");
  const [posts, setPosts] = useState(initialData["astro"] || []);
  const [selectedPost, setSelectedPost] = useState(null);

  // category change (NO Firestore call here ❌)
  const handleCategorySelect = (cat) => {
    setCurrentCategory(cat);
    setPosts(initialData[cat] || []);
    setSelectedPost(null);
  };

  const bigCard = posts[0];
  const smallCards = posts.slice(1, 10);

  return (
    <>
      <Header />

      <SideMenu onCategorySelect={handleCategorySelect} />

      <div className="content-wrapper">
        {!selectedPost ? (
          <HomeView
            bigCard={bigCard}
            smallCards={smallCards}
            onSelectPost={setSelectedPost}
          />
        ) : (
          <DetailView
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>

      <Footer />
    </>
  );
             }
