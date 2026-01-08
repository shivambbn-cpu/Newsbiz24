import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function sitemap() {
  const baseUrl = "https://www.newsbiz24.in";

  const postsSnapshot = await getDocs(collection(db, "posts"));

  const posts = postsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      url: `${baseUrl}/post/${data.slug}`,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...posts,
  ];
}
