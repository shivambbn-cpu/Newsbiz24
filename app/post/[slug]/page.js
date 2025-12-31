"use client";

import { useEffect, useState } from "react";
import DetailView from "@/components/DetailView";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function PostDetail({ params }) {
  const slug = decodeURIComponent(params.slug.trim()); // Hindi & English safe
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      let found = null;

      // Loop through categories
      for (const category of categories) {
        try {
          const q = query(collection(db, category), where("slug", "==", slug));
          const snap = await getDocs(q);

          if (!snap.empty) {
            found = { id: snap.docs[0].id, ...snap.docs[0].data(), category };
            break;
          }
        } catch (err) {
          console.error("Firestore query error:", err);
        }
      }

      if (isMounted) {
        setPost(found);
        setLoading(false);
      }
    }

    fetchPost();

    return () => { isMounted = false; };
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return <DetailView post={post} onClose={() => {}} />;
}
