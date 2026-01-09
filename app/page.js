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
  const [currentCategory, setCurrentCategory] = useState("astro");
  const [loading, setLoading] = useState(true);

  // 🔍 SEARCH STATE
  const [searchText, setSearchText] = useState("");

  // 🔥 Fetch Firestore Data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const colRef = collection(db, currentCategory);
        const snapshot = await getDocs(colRef);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setPosts(data);
        setSelectedPost(null);
        setSearchText(""); // 🔁 category change pe search reset
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  // 🔍 TITLE SEARCH (FINAL)
  const filteredPosts = posts.filter(post => {
    if (!searchText) return true;

    return post?.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
  });

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  // Cards use filtered data
  const bigCard = filteredPosts[0];
  const smallCards = filteredPosts.slice(1, 10);

  return (
    <>
      <Header />

      <SideMenu onCategorySelect={setCurrentCategory} />

      {/* 🔍 SEARCH INPUT (NO EXTRA FILE) */}
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
          }}
        />
      </div>

      <div className="content-wrapper">

        {/* 🔄 Loader */}
        {loading && (
          <div style={loaderWrap}>
            <div style={loader}></div>
          </div>
        )}

        {!loading && !selectedPost && (
          <HomeView
            bigCard={bigCard}
            smallCards={smallCards}
            onSelectPost={openDetail}
          />
        )}

        {!loading && selectedPost && (
          <DetailView post={selectedPost} onClose={closeDetail} />
        )}
      </div>

      <Footer />
    </>
  );
}

/* 🔵 Loader Styles */
const loaderWrap = {
  minHeight: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loader = {
  width: "46px",
  height: "46px",
  border: "4px solid rgba(22,163,74,0.2)",
  borderTop: "4px solid #16a34a",
  borderRadius: "50%",
  animation: "spinFast 0.6s linear infinite",
  boxShadow: "0 0 12px rgba(22,163,74,0.35)",
};

    
