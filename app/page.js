import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import HomeView from "@/components/HomeView";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Footer from "@/components/Footer";

export const revalidate = 60; // 🔥 ISR cache
export const dynamic = "force-static";

export default async function HomePage() {
  const q = query(
    collection(db, "astro"), // default category
    orderBy("date", "desc"),
    limit(12)
  );

  const snap = await getDocs(q);

  const posts = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  const bigCard = posts[0] || null;
  const smallCards = posts.slice(1);

  return (
    <>
      <Header />
      <SideMenu />
      <HomeView bigCard={bigCard} smallCards={smallCards} />
      <Footer />
    </>
  );
}
