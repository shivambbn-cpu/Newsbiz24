import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { categorySEO } from "@/lib/categorySEO";

// ✅ SEO metadata (AUTO)
export async function generateMetadata({ params }) {
  const { category } = params;

  const data = categorySEO[category] || {
    title: "News Biz 24",
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

    alternates: {
      canonical: url,
    },
  };
}

// ✅ Page component
export default async function CategoryPage({ params }) {
  const { category } = params;

  let posts = [];

  try {
    const snap = await getDocs(collection(db, category));

    posts = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        {category.toUpperCase()} NEWS
      </h1>

      {posts.length === 0 && <p>No posts found</p>}

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

// 🔥 Performance boost
export const revalidate = 3600;


