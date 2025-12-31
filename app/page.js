"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import DetailView from "./components/DetailView";
import Footer from "./components/Footer";
import GlobalSearch from "@/components/GlobalSearch";
import PostCard from "@/components/PostCard";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAllPostsForSearch } from "@/lib/globalSearch";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("astro"); // ✅ default
  const [allPosts, setAllPosts] = useState([]); // for GlobalSearch
  const [showCategory, setShowCategory] = useState("astro"); // search default

  // 🔥 Firestore category wise fetch
  useEffect(() => {
    console.log("🔥 Fetching category:", currentCategory);

    const fetchPosts = async () => {
      try {
        const colRef = collection(db, currentCategory);
        const snapshot = await getDocs(colRef);

        console.log("📄 Docs count:", snapshot.size);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort((a, b) => new Date(b.date) - new Date(a.date)); // latest first

        setPosts(data);
        setSelectedPost(null); // category change pe detail close
      } catch (err) {
        console.error("❌ Firestore Error:", err);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  // 🔥 Load all posts for GlobalSearch
  useEffect(() => {
    getAllPostsForSearch().then(setAllPosts);
  }, []);

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  // BigCard और SmallCards split
  const bigCard = posts[0];
  const smallCards = posts.slice(1, 10);

  // Filter posts for search category
  const filteredPosts = allPosts.filter((p) => p.category === showCategory);

  return (
    <>
      <Header />

      {/* ✅ Category callback */}
      <SideMenu onCategorySelect={setCurrentCategory} />

      {/* 🔍 Global Search */}
      <GlobalSearch onClose={() => setShowCategory("astro")} />

      <div className="content-wrapper">
        {!selectedPost ? (
          <HomeView
            bigCard={bigCard}
            smallCards={smallCards}
            onSelectPost={openDetail}
          />
        ) : (
          <DetailView post={selectedPost} onClose={closeDetail} />
        )}
      </div>

      {/* Search results below home content */}
      {showCategory && (
        <div className="posts-list">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}
