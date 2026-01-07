"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/app/components/Header";
import SideMenu from "@/app/components/SideMenu";
import Footer from "@/app/components/Footer";
import DetailView from "@/app/components/DetailView";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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

export default function PostPage() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        for (const cat of CATEGORIES) {
          const snap = await getDocs(collection(db, cat));

          const found = snap.docs.find(
            (doc) => doc.data().slug === slug
          );

          if (found) {
            setPost({ id: found.id, ...found.data(), category: cat });
            return;
          }
        }
      } catch (e) {
        console.error(e);
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
