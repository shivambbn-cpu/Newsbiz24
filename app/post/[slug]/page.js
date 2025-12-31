"use client";

import { useEffect, useState } from "react";
import DetailView from "@/components/DetailView";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function PostDetail({ params }) {
  const slug = decodeURIComponent(params.slug); // Hindi / English safe
  const categories = [
    "astro",
    "health",
    "news",
    "religious",
    "weather",
    "trending",
    "lifestyles",
    "business",
  ];

  const [post, setPost] = useState(null);

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
    }

    loadPost();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return <DetailView post={post} onClose={() => {}} />;
}
