"use client";
import { jsPDF } from "jspdf";
import Script from "next/script"; // ✅ ADDED

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
  const [searchText, setSearchText] = useState("");

  useEffect(() => {

    const fetchPosts = async () => {

      try {
        setLoading(true);

        const colRef = collection(db, currentCategory);
        const snapshot = await getDocs(colRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        setPosts(data);
        setSelectedPost(null);
        setSearchText("");

      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

  }, [currentCategory]);

  const filteredPosts = posts.filter((post) =>
    post?.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  const bigPosts = filteredPosts.slice(0, 3);
  const smallCards = filteredPosts.slice(3, 15);

  return (
    <>
      {/* HEADER */}
      <Header
        searchText={searchText}
        onSearch={setSearchText}
      />

      {/* SIDE MENU */}
      <SideMenu
        onCategorySelect={setCurrentCategory}
      />

      <div className="content-wrapper">

        {/* LOADER */}
        {loading && (
          <div style={loaderWrap}>
            <div style={loader}></div>
          </div>
        )}

        {/* DETAIL PAGE */}
        {!loading && selectedPost && (
          <DetailView
            post={selectedPost}
            onClose={closeDetail}
          />
        )}

        {/* HOME PAGE */}
        {!loading && !selectedPost && (
          <>
            {filteredPosts.length > 0 ? (
              <HomeView
                bigPosts={bigPosts}
                smallCards={smallCards}
                onSelectPost={openDetail}
              />
            ) : (
              <div style={noPostStyle}>
                Sorry! 😔 No matching post found!
              </div>
            )}
          </>
        )}

      </div>

      {/* FOOTER */}
      <Footer />

      {/* 🔥 ADSTERRA SCRIPT (MAIN ADDITION) */}
      <Script
        src="https://pl29380722.profitablecpmratenetwork.com/e6/5f/d5/e65fd505ce60a13973fe2ba4b6554740.js"
        strategy="afterInteractive"
      />

    </>
  );
}

/* LOADER */
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

/* NO POSTS */
const noPostStyle = {
  minHeight: "40vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  fontWeight: "600",
  color: "#555",
  textAlign: "center",
};
