// ❌ NO "use client" — This page is now SSR (fastest)
import Image from "next/image";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import DetailView from "./components/DetailView";
import Footer from "./components/Footer";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// ========================
// 🔥 SSR FETCH (Runs on Server Before Page Loads)
// ========================
async function fetchInitialPosts() {
  const colRef = collection(db, "astro"); // default category
  const snapshot = await getDocs(colRef);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  data.sort((a, b) => new Date(b.date) - new Date(a.date));
  return data;
}

export default async function HomePage() {
  // =======================
  // 🔥 Server Side Loaded Posts — Super Fast
  // =======================
  const initialPosts = await fetchInitialPosts();

  return (
    <>
      <ClientPage initialPosts={initialPosts} />
    </>
  );
}

// =======================
// 🔥 Client Component (UI logic here)
// =======================
"use client";
import { useState, useEffect, useMemo } from "react";

function ClientPage({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("astro");

  // ================= Fetch Posts Category Wise =================
  useEffect(() => {
    if (currentCategory === "astro") return; // Astro already loaded by SSR

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
        setSelectedPost(null);
      } catch (err) {
        console.error("Firestore Error:", err);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  const openDetail = (post) => setSelectedPost(post);
  const closeDetail = () => setSelectedPost(null);

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
        {/* ================= Hero Section (Instant LCP) ================= */}
        {bigCard && !selectedPost && (
          <section className="hero-section">
            <h1 className="hero-title">{bigCard.title}</h1>

            <Image
              src={bigCard.image}
              alt={bigCard.title}
              width={1200}
              height={600}
              priority={true} // Fastest LCP
              placeholder="blur"
              blurDataURL={bigCard.image}
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

      {/* ================= Footer (Loads Instantly) ================= */}
      <Footer />

      {/* ================= Critical CSS ================= */}
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

      {/* ================= Preloads ================= */}
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
      <link rel="preload" as="image" href={bigCard?.image || ""} />
    </>
  );
}
