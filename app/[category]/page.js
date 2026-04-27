
import { db } from "@/lib/firebase";
import Link from "next/link";
import { categorySEO } from "@/lib/categorySEO";

// ✅ SEO metadata
export async function generateMetadata({ params }) {
  const category = params?.category;

  const data = categorySEO[category] || {
    title: category?.toUpperCase() || "News",
    description: "Latest Hindi News",
  };

  const url = `https://www.newsbiz24.in/${category}`;

  return {
    title: `${data.title} | News Biz 24`,
    description: data.description,

    openGraph: {
      title: data.title,
      description: data.description,
      url,
      images: [
        {
          url: "https://www.newsbiz24.in/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: ["https://www.newsbiz24.in/og-image.jpg"],
    },

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },
  };
}

// ✅ Page component
export default async function CategoryPage({ params }) {
  const category = params?.category;

  let posts = [];

  try {
    if (!category) throw new Error("No category");

    // 🔥 safe dynamic import (no crash)
    const { collection, getDocs } = await import("firebase/firestore");

    const snap = await getDocs(collection(db, category));

    posts = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Firestore error:", error);
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* ✅ SEO-friendly heading */}
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        {categorySEO[category]?.title || category.toUpperCase()}
      </h1>

      {/* ❗ empty state */}
      {posts.length === 0 && <p>No posts found</p>}

      {/* ✅ posts list */}
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <Link href={`/post/${encodeURIComponent(post.slug)}`}>
            <h2>{post.title}</h2>
          </Link>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              width="100%"
              style={{ maxWidth: "400px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// 🔥 caching
export const revalidate = 3600;
