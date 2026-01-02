"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
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

  // ================= Fetch Posts Category Wise =================
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const colRef = collection(db, currentCategory);
        const snapshot = await getDocs(colRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(data);
        setSelectedPost(null); // category change pe detail close
      } catch (err) {
        console.error("Firestore Error:", err);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

  // ================= Memoization for LCP boost =================
  const bigCard = useMemo(() => posts[0], [posts]);
  const smallCards = useMemo(() => posts.slice(1, 10), [posts]);

  return (
    <>
      {/* ================= Header ================= */}
      <Header />

      {/* ================= Side Menu ================= */}
      <SideMenu onCategorySelect={setCurrentCategory} />

      {/* ================= Content Wrapper ================= */}
      <main className="content-wrapper">
        {/* ================= Hero Section (Ultra LCP) ================= */}
        {bigCard && !selectedPost && (
          <section className="hero-section">
            <h1 className="hero-title">{bigCard.title}</h1>

            <Image
              src={bigCard.image}
              alt={bigCard.title}
              width={1200}
              height={600}
              priority={true} // ðŸ”¥ LCP fast
              placeholder="blur"
              blurDataURL={bigCard.image} // optional blur
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </section>
        )}

        {!selectedPost ? (
          <HomeView
            bigCard={bigCard}
            smallCards={smallCards}
            onSelectPost={openDetail}
          />
        ) : (
          <DetailView post={selectedPost} onClose={closeDetail} />
        )}
      </main>

      {/* ================= Footer ================= */}
      <Footer />

      {/* ================= Critical CSS Inline ================= */}
      <style jsx>{`
        main.content-wrapper {
          padding: 20px;
          font-family: "Inter", sans-serif;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 15px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* ================= Preload Fonts ================= */}
      <link
        rel="preload"
        href="/fonts/Inter-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Inter-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* ================= LCP Performance Tweaks ================= */}
      <link rel="preload" as="image" href={bigCard?.image || ""} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    </>
  );
}
