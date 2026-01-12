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

  // 🔍 SEARCH STATE (HEADER SE CONNECTED)
  const [searchText, setSearchText] = useState("");

  // 🔥 Firestore data load
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

        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setPosts(data);
        setSelectedPost(null);
        setSearchText(""); // category change pe search reset
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  // 🔍 TITLE SEARCH LOGIC
  const filteredPosts = posts.filter((post) =>
    post?.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  // Cards filtered data se
  const bigCard = filteredPosts[0];
  const smallCards = filteredPosts.slice(1, 10);

  return (
    <>
      <Header searchText={searchText} onSearch={setSearchText} />

      <SideMenu onCategorySelect={setCurrentCategory} />

      <div className="content-wrapper">
        {/* 🔄 Loader */}
        {loading && (
          <div style={loaderWrap}>
            <div style={loader}></div>
          </div>
        )}

        {/* DetailView */}
        {!loading && selectedPost && (
          <DetailView post={selectedPost} onClose={closeDetail} />
        )}

        {/* HomeView or No matching posts */}
        {!loading && !selectedPost && (
          <>
            {filteredPosts.length > 0 ? (
              <HomeView
                bigCard={bigCard}
                smallCards={smallCards}
                onSelectPost={openDetail}
              />
            ) : (
              <div style={noPostStyle}>
                Sorry.! 😔😔 No matching post found.!
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

const loader = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "6px solid transparent",
  borderTop: "6px solid #16a34a",
  borderRight: "6px solid #22c55e",
  borderBottom: "6px solid #4ade80",
  animation: "spinFast 0.8s linear infinite",
  boxShadow: "0 0 15px rgba(22,163,74,0.4)",
};

    
