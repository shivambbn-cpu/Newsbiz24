import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import HomeView from "@/components/HomeView";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Footer from "@/components/Footer";

export const revalidate = 60;
export const dynamic = "force-static";

export default async function CategoryPage({ params }) {
  const category = params.slug;

  const q = query(
    collection(db, category),
    orderBy("date", "desc"),
    limit(12)
  );

  const snap = await getDocs(q);

  const posts = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <>
      <Header />
      <SideMenu />
      <HomeView
        bigCard={posts[0]}
        smallCards={posts.slice(1)}
      />
      <Footer />
    </>
  );
}
