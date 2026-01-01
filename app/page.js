import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import SideMenu from "./components/SideMenu";

import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

// 🔥 ADD 1: ISR cache (NO blank + ultra fast)
export const revalidate = 60; // 60 sec me data auto update

// 🔥 SERVER COMPONENT (NO "use client")
export default async function HomePage({ searchParams }) {
  const category = searchParams?.cat || "astro";

  const q = query(
    collection(db, category),
    orderBy("date", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const bigCard = posts[0] ?? null;
  const smallCards = posts.slice(1);

  return (
    <>
      <Header />

      {/* client component */}
      <SideMenu currentCategory={category} />

      {/* 🔥 HTML server se hi ready */}
      <HomeView bigCard={bigCard} smallCards={smallCards} />

      <Footer />
    </>
  );
}
