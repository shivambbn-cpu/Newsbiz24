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

/* 🔹 SERVER SIDE POST FETCH */
async function getPostBySlug(slug) {
  for (const cat of CATEGORIES) {
    const snap = await getDocs(collection(db, cat));
    const found = snap.docs.find(
      (doc) => doc.data().slug === slug
    );

    if (found) {
      return {
        id: found.id,
        ...found.data(),
        category: cat,
      };
    }
  }
  return null;
}

/* 🔥 SEO METADATA (GOOGLE KE LIYE) */
export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found - NewsBiz24",
      description: "This post does not exist",
    };
  }

  return {
    title: post.title,
    description: post.content.replace(/<[^>]+>/g, "").slice(0, 150),
    alternates: {
      canonical: `https://www.newsbiz24.in/post/${post.slug}`,
    },
  };
}

/* 🔹 PAGE COMPONENT */
export default async function PostPage({ params }) {
  const slug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(slug);

  return (
    <>
      <Header />
      <SideMenu />

      {!post && (
        <div style={{ padding: 20 }}>Post not found</div>
      )}

      {post && <DetailView post={post} />}

      <Footer />
    </>
  );
}
