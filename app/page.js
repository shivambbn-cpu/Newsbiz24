"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import DetailView from "./components/DetailView";
import Footer from "./components/Footer";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const DEFAULT_CATEGORY = "astro";

  // Firestore से posts fetch करना
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const colRef = collection(db, DEFAULT_CATEGORY);
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => new Date(b.date) - new Date(a.date)); // latest ऊपर
        setPosts(data);
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  // BigCard और SmallCards split करना
  const bigCard = posts[0];
  const smallCards = posts.slice(1, 10); // next 9 posts

  return (
    <>
      <Header />
      <SideMenu />

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

      <Footer />
    </>
  );
}
