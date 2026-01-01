"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import DetailView from "./components/DetailView";
import Footer from "./components/Footer"; // Footer import kiya
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("astro");

  const [modalType, setModalType] = useState(null);
  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, currentCategory);
        const snapshot = await getDocs(colRef);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(data);
        setSelectedPost(null);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  const bigCard = posts[0];
  const smallCards = posts.slice(1, 10);

  return (
    /* flex-col aur min-h-screen footer ko niche push karne ke liye zaroori hai */
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      <Header />
      <SideMenu onCategorySelect={setCurrentCategory} />

      {/* Main content area (flex: 1) bachi hui saari jagah le lega, jisse footer niche rahega */}
      <main style={{ flex: "1" }}>
        <div className="content-wrapper">
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>Loading posts...</div>
          ) : !selectedPost ? (
            <HomeView
              bigCard={bigCard}
              smallCards={smallCards}
              onSelectPost={openDetail}
            />
          ) : (
            <DetailView post={selectedPost} onClose={closeDetail} />
          )}
        </div>
      </main>

      {/* ✅ Footer ab hamesha content ke niche aayega */}
      <Footer />

      {/* MODAL SECTION */}
      {modalType && (
        <div className="modal-fullscreen">
          <button className="modal-close" onClick={closeModal}>X</button>
          <div className="modal-content">
            {modalType === "about" && <div>About Us Content...</div>}
            {modalType === "contact" && <div>Contact Us Content...</div>}
            {modalType === "privacy" && <div>Privacy Policy Content...</div>}
            {modalType === "terms" && <div>Terms & Conditions Content...</div>}
          </div>
        </div>
      )}
    </div>
  );
}
