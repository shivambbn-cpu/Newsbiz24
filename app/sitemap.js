import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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
    },
  ];

  for (const cat of categories) {
    const snap = await getDocs(collection(db, cat));

    snap.docs.forEach((doc) => {
      const data = doc.data();

      if (!data.slug) return;

      urls.push({
        url: `${baseUrl}/post/${data.slug}`,
        lastModified: new Date(),
      });
    });
  }

  return urls;
}
