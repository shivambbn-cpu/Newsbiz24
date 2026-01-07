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
  const [checked, setChecked] = useState(false); // 🔹 loading replacement

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
            setChecked(true);
            return;
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setChecked(true);
      }
    };

    fetchPost();
  }, [slug]);

  // ❌ No loading UI
  if (!checked) return null;

  if (!post) {
    return (
      <>
        <Header />
        <SideMenu />
        <div style={{ padding: 20 }}>Post not found</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <SideMenu />
      <DetailView post={post} />
      <Footer />
    </>
  );
}
