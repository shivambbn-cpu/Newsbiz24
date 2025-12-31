"use client";

import { useEffect, useState } from "react";
import DetailView from "@/components/DetailView";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function PostDetail({ params }) {
  const slug = decodeURIComponent(params.slug.trim());
  const categories = [
    "astro",
    "health",
    "news",
    "religious",
    "weather",
    "trending",
    "lifestyles",
    "business"
  ];

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      let found = null;
      for (const category of categories) {
        const q = query(collection(db, category), where("slug", "==", slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
          found = { id: snap.docs[0].id, ...snap.docs[0].data(), category };
          break;
        }
      }
      setPost(found);
      setLoading(false);
    }
    loadPost();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return <DetailView post={post} onClose={() => {}} />;
}
