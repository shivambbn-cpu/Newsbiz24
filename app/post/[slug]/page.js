"use client";

import { useEffect, useState } from "react";

import Header from "@/app/components/Header";
import SideMenu from "@/app/components/SideMenu";
import Footer from "@/app/components/Footer";
import DetailView from "@/app/components/DetailView";

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";

export default function PostDetailPage({ params }) {
  const slug = decodeURIComponent(params.slug); // ✅ VERY IMPORTANT

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("slug", "==", slug),
          where("status", "==", "published"),
          limit(1)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          setPost({
            id: snap.docs[0].id,
            ...snap.docs[0].data(),
          });
        }
      } catch (err) {
        console.error("Post fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!post) {
    return <div style={{ padding: 20 }}>Post not found</div>;
  }

  return (
    <>
      <Header />
      <SideMenu />
      <DetailView post={post} onClose={null} />
      <Footer />
    </>
  );
}
