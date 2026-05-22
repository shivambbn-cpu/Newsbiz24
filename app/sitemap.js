import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 60;

export default async function sitemap() {

  const baseUrl = "https://newsbiz24.in";

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

  const urls = [];

  // Homepage
  urls.push({
    url: baseUrl,

    lastModified: new Date(),

    changeFrequency: "hourly",

    priority: 1,
  });

  // Categories
  categories.forEach((cat) => {

    urls.push({
      url: `${baseUrl}/${cat}`,

      lastModified: new Date(),

      changeFrequency: "daily",

      priority: 0.9,
    });
  });

  // Posts
  for (const cat of categories) {

    try {

      const snap = await getDocs(
        collection(db, cat)
      );

      snap.docs.forEach((doc) => {

        const data = doc.data();

        // slug missing skip
        if (!data.slug) return;

        urls.push({

          url: `${baseUrl}/post/${data.slug}`,

          lastModified:
            data.updatedAt?.toDate?.() ||
            data.createdAt?.toDate?.() ||
            new Date(),

          changeFrequency: "daily",

          priority: 0.8,
        });
      });

    } catch (error) {

      console.error(
        `Sitemap error in ${cat}:`,
        error
      );
    }
  }

  return urls;
}
