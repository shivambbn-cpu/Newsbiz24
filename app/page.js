import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import Footer from "./components/Footer";
import { db } from "@/lib/firebaseAdmin";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase-admin/firestore";

// 🔥 ISR – 60 sec
export const revalidate = 60;

// 🔍 SEO
export const metadata = {
  title: "NewsBiz24 – ताज़ा खबरें, ब्रेकिंग न्यूज़",
  description:
    "धार्मिक, एस्ट्रो, व्यापार, स्वास्थ्य, ट्रेंडिंग और ताज़ा खबरें – NewsBiz24",
};

async function getHomePosts() {
  const q = query(
    collection(db, "posts"),
    where("status", "==", "published"),
    orderBy("date", "desc"),
    limit(20)
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default async function HomePage() {
  const posts = await getHomePosts();

  const bigCard = posts[0] || null;
  const smallCards = posts.slice(1, 10);

  return (
    <>
      <Header />
      <SideMenu />

      <main className="content-wrapper">
        <HomeView bigCard={bigCard} smallCards={smallCards} />
      </main>

      <Footer />
    </>
  );
}
