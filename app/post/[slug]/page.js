"use client";

import { useEffect, useState } from "react";

import Header from "@/app/components/Header";
import SideMenu from "@/app/components/SideMenu";
import HomeView from "@/app/components/HomeView";
import Footer from "@/app/components/Footer";

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

export default function CategoryPage({ params }) {
  const category = params.slug;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("category", "==", category),
          where("status", "==", "published"),
          orderBy("date", "desc"),
          limit(12)
        );

        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      } catch (err) {
        console.error("Firestore error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <>
      <Header />
      <SideMenu />

      <HomeView
        bigCard={posts[0] || null}
        smallCards={posts.slice(1)}
      />

      <Footer />
    </>
  );
}
