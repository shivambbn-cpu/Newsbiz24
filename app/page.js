"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import DetailView from "./components/DetailView";
import Footer from "./components/Footer";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Example: Load posts from 'astro' category
        const snapshot = await getDocs(collection(db, "astro"));
        const loadedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(loadedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        {/* HomeView को posts भेजें */}
        <HomeView posts={posts} onSelectPost={setSelectedPost} />

        {/* DetailView को selectedPost भेजें */}
        <DetailView post={selectedPost} />
      </div>

      <Footer />
    </>
  );
}
