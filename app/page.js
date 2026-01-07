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
  const [currentCategory, setCurrentCategory] = useState("astro"); // default
  const [loading, setLoading] = useState(true); // spinner state

  useEffect(() => {
    const fetchPosts = async () => {  
      try {  
        setLoading(true); // start spinner

        const colRef = collection(db, currentCategory);  
        const snapshot = await getDocs(colRef);  

        const data = snapshot.docs.map(doc => ({  
          id: doc.id,  
          ...doc.data(),  
        }));  

        data.sort((a, b) => new Date(b.date) - new Date(a.date)); // latest first  

        setPosts(data);  
        setSelectedPost(null); // category change pe detail close  
      } catch (err) {  
        console.error("Firestore Error:", err);  
      } finally {
        setLoading(false); // stop spinner
      }  
    };  

    fetchPosts();
  }, [currentCategory]);

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  // BigCard & SmallCards split
  const bigCard = posts[0];
  const smallCards = posts.slice(1, 10);

  return (
    <>
      <Header />

      {/* Category callback */}
      <SideMenu onCategorySelect={setCurrentCategory} />

      <div className="content-wrapper">

        {/* 🔄 Spinner */}
        {loading && (
          <div style={loaderWrap}>
            <div style={loader}></div>
          </div>
        )}

        {/* HomeView or DetailView */}
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
