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
  const [currentCategory, setCurrentCategory] = useState("astro"); // Ã¢Å“â€¦ default

  // Ã°Å¸â€Â¥ Firestore Ã Â¤Â¸Ã Â¥â€¡ posts fetch (category wise)
  useEffect(() => {
    console.log("Ã°Å¸â€Â¥ Fetching category:", currentCategory);

    const fetchPosts = async () => {
      try {
        const colRef = collection(db, currentCategory);
        const snapshot = await getDocs(colRef);

        console.log("Ã°Å¸â€œâ€ž Docs count:", snapshot.size);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort((a, b) => new Date(b.date) - new Date(a.date)); // latest first

        setPosts(data);
        setSelectedPost(null); // category change pe detail close
      } catch (err) {
        console.error("Ã¢ÂÅ’ Firestore Error:", err);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  // BigCard Ã Â¤â€Ã Â¤Â° SmallCards split
  const bigCard = posts[0];
  const smallCards = posts.slice(1, 10);

  return (
    <>
      <Header />

      {/* Ã¢Å“â€¦ category callback pass */}
      <SideMenu onCategorySelect={setCurrentCategory} />

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
