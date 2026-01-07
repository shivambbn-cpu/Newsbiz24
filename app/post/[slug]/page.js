"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import SideMenu from "@/app/components/SideMenu";
import Footer from "@/app/components/Footer";
import DetailView from "@/app/components/DetailView";

import { db } from "@/lib/firebase";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

const CATEGORIES = [
  "astro",
  "business",
  "health",
  "lifestyles",
  "news",
  "religious",
  "trending",
  "weather",
];

export const dynamic = "force-dynamic";

export default function PostDetailPage({ params }) {
  const slug = decodeURIComponent(params.slug);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        for (const category of CATEGORIES) {
          const q = query(
            collection(db, category),
            where("slug", "==", slug),
            limit(1)
          );

          const snap = await getDocs(q);

          if (!snap.empty) {
            setPost({
              id: snap.docs[0].id,
              category,
              ...snap.docs[0].data(),
            });
            break;
          }
        }
      } catch (err) {
        console.error("Post fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!post) return <div style={{ padding: 20 }}>Post not found</div>;

  return (
    <>
      <Header />
      <SideMenu />
      <DetailView post={post} />
      <Footer />
    </>
  );
}
