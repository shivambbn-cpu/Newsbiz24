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
      setLoading(true); // Load shuru
      try {
        const colRef = collection(db, currentCategory);
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(data);
        setSelectedPost(null);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false); // Load khatam
      }
    };
    fetchPosts();
  }, [currentCategory]);

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  const bigCard = posts[0];
  const smallCards = posts.slice(1, 10);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <SideMenu onCategorySelect={setCurrentCategory} />

      {/* flex: 1 footer ko hamesha niche dhakelega */}
      <main style={{ flex: "1", minHeight: "80vh" }}>
        <div className="content-wrapper">
          {loading ? (
            <div style={{ padding: "50px", textAlign: "center", fontSize: "20px" }}>
              Loading posts...
            </div>
          ) : (
            <>
              {!selectedPost ? (
                <HomeView
                  bigCard={bigCard}
                  smallCards={smallCards}
                  onSelectPost={openDetail}
                />
              ) : (
                <DetailView post={selectedPost} onClose={closeDetail} />
              )}
            </>
          )}
        </div>
      </main>

      {/* ✅ Solution: Footer tabhi dikhega jab loading khatam ho jayegi */}
      {!loading && <Footer />}
    </div>
  );
}
