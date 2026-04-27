import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 3600; // 1 hour cache

export default async function sitemap() {
  const baseUrl = "https://www.newsbiz24.in";

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

  let urls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
  ];

  // ✅ Category pages add
  categories.forEach((cat) => {
    urls.push({
      url: `${baseUrl}/${cat}`,
      lastModified: new Date(),
      priority: 0.9,
    });
  });

  // ✅ Posts add
  for (const cat of categories) {
    const snap = await getDocs(collection(db, cat));

    snap.docs.forEach((doc) => {
      const data = doc.data();

      if (!data.slug) return;

      urls.push({
        url: `${baseUrl}/post/${data.slug}`,
        lastModified: data.updatedAt?.toDate() || new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });
  }

  return urls;
}
