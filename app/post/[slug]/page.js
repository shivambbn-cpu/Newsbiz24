import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

async function getPostBySlug(rawSlug) {
  // 🔥 DECODE URL SLUG
  const slug = decodeURIComponent(rawSlug);

  const categories = [
    "astro",
    "business",
    "health",
    "lifestyles",
    "news",
    "religious",
    "trending",
    "weather",
  ];

  for (const cat of categories) {
    const snap = await getDocs(collection(db, cat));

    for (const doc of snap.docs) {
      const data = doc.data();

      // ✅ ONLY slug check (status optional)
      if (data.slug === slug) {
        return {
          id: doc.id,
          category: cat,
          ...data,
        };
      }
    }
  }

  return null;
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { title: "Post Not Found | NewsBiz24" };
  }

  return {
    title: post.title,
    description: post.title,
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "16px" }}>
      <h1>{post.title}</h1>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      )}

      <p style={{ color: "#666", marginTop: "8px" }}>
        {post.date} | {post.category}
      </p>

      <div
        style={{ marginTop: "20px", lineHeight: "1.8" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
