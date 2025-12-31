"use client";

import { useEffect, useState } from "react";
import DetailView from "@/components/DetailView";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function PostDetail({ params }) {
  const slug = decodeURIComponent(params.slug.trim());
  const categories = [
    "astro","religious","health","business","news",
    "trending","lifestyles","weather"
  ];

  const [post, setPost] = useState(null);

  useEffect(() => {
    async function openBlogBySlug() {
      for (const cat of categories) {
        const q = query(collection(db, cat), where("slug","==",slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const d = snap.docs[0];
          setPost({ id: d.id, ...d.data(), category: cat });
          return;
        }
      }
      console.warn("No post found for slug:", slug);
      // fallback: go to home
      window.history.pushState({ page: "home" }, "", "/");
      // showHomeView();  // tumhare previous function
    }
    openBlogBySlug();
  }, [slug]);

  if (!post) return <p>Loading...</p>;
  return <DetailView post={post} onClose={() => window.history.back()} />;
}
