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
  const [checked, setChecked] = useState(false);

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

  return (
    <>
      <Header />
      <SideMenu />

      {/* 🔄 ROUND LOADER */}
      {!checked && (
        <div style={loaderWrap}>
          <div style={loader}></div>
        </div>
      )}

      {/* ❌ Post not found */}
      {checked && !post && (
        <div style={{ padding: 20 }}>Post not found</div>
      )}

      {/* ✅ Post found */}
      {checked && post && <DetailView post={post} />}

      <Footer />
    </>
  );
}

/* 🔵 Loader Styles */
const loaderWrap = {
  minHeight: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loader = {
  width: "42px",
  height: "42px",
  border: "4px solid #ddd",
  borderTop: "4px solid #16a34a", // green (change if needed)
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};
