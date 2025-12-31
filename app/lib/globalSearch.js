// app/lib/globalSearch.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { CATEGORIES } from "./categories";

/**
 * Fetch all posts from all categories
 */
export async function getAllPostsForSearch() {
  let allPosts = [];

  for (const category of CATEGORIES) {
    const snapshot = await getDocs(collection(db, category));

    snapshot.forEach((doc) => {
      const data = doc.data();
      allPosts.push({
        id: doc.id,
        category: category,
        title: data.title || "",
        slug: data.slug || "",
        image: data.image || "",
        date: data.date || null,
      });
    });
  }

  return allPosts;
}
