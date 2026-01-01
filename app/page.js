// ❌ "use client" yahan bilkul nahi

import HomeClient from "./components/HomeClient";
import { getHomePosts } from "@/lib/getHomePosts";

/**
 * 🔥 ISR + CDN cache
 */
export const revalidate = 300; // 5 min

/**
 * 🔥 Fully static page
 */
export const dynamic = "force-static";

export default async function Page() {
  // ⚡ Firestore data SERVER par (cached)
  const postsByCategory = await getHomePosts();

  return (
    <HomeClient initialData={postsByCategory} />
  );
}
