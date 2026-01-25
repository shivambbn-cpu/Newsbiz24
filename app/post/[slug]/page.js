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

      {/* Ã°Å¸â€â€ž ADVANCED FAST SPINNER */}
      {!checked && (
        <div style={loaderWrap}>
          <div style={loader}></div>
        </div>
      )}

      {/* Ã¢ÂÅ’ Post not found */}
      {checked && !post && (
        <div style={{ padding: 20 }}>Post not found</div>
      )}

      {/* Ã¢Å“â€¦ Post found */}
      {checked && post && <DetailView post={post} />}

      <Footer />
    </>
  );
}

/* Ã°Å¸â€Âµ Loader Styles */
const loaderWrap = {
  minHeight: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loader = {
  width: "46px",
  height: "46px",
  border: "4px solid rgba(22,163,74,0.2)",
  borderTop: "4px solid #16a34a",
  borderRadius: "50%",
  animation: "spinFast 0.6s linear infinite",
  boxShadow: "0 0 12px rgba(22,163,74,0.35)",
};
