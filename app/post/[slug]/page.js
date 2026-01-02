import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import HomeView from "@/components/HomeView";
import Footer from "@/components/Footer";

import { db } from "@/lib/firebaseAdmin";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase-admin/firestore";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  return {
    title: `${params.slug} News | NewsBiz24`,
    description: `${params.slug} category ki latest aur breaking news`,
  };
}

export default async function CategoryPage({ params }) {
  const category = params.slug;

  const q = query(
    collection(db, "posts"),
    where("category", "==", category),
    where("status", "==", "published"),
    orderBy("date", "desc"),
    limit(12)
  );

  const snap = await getDocs(q);

  const posts = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <>
      <Header />
      <SideMenu />

      <HomeView
        bigCard={posts[0] || null}
        smallCards={posts.slice(1)}
      />

      <Footer />
    </>
  );
}
