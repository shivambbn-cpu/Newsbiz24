import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const CATEGORIES = [
  "astro",
  "religious",
  "health",
  "business",
  "news",
  "trending",
  "lifestyles",
  "weather",
];

export async function getHomePosts() {
  const result = {};

  for (const cat of CATEGORIES) {
    const snap = await getDocs(collection(db, cat));

    const posts = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
    }));

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    result[cat] = posts;
  }

  return result;
}
