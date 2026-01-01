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
  const [loading, setLoading] = useState(true); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("astro");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, currentCategory);
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(data);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentCategory]);

  return (
    /* Yeh structure footer ko hamesha niche rakhega */
    <div style={{ 
      display: "grid", 
      gridTemplateRows: "auto 1fr auto", 
      minHeight: "100vh",
      width: "100%" 
    }}>
      
      {/* 1. TOP: Header */}
      <Header />
      
      <SideMenu onCategorySelect={setCurrentCategory} />

      {/* 2. MIDDLE: Content (Yeh area bachi hui sari jagah lega) */}
      <main style={{ width: "100%" }}>
        {loading ? (
          <div style={{ 
            height: "60vh", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            fontSize: "1.2rem" 
          }}>
            Loading posts...
          </div>
        ) : (
          <div className="content-wrapper">
            {!selectedPost ? (
              <HomeView
                bigCard={posts[0]}
                smallCards={posts.slice(1, 10)}
                onSelectPost={setSelectedPost}
              />
            ) : (
              <DetailView post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
          </div>
        )}
      </main>

      {/* 3. BOTTOM: Footer (Hamesha aakhir mein) */}
      {!loading && <Footer />}
      
    </div>
  );
}
