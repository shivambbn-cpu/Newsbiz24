import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import Footer from "./components/Footer";

// 🔍 SEO
export const metadata = {
  title: "NewsBiz24 – ताज़ा खबरें, ब्रेकिंग न्यूज़",
  description:
    "धार्मिक, एस्ट्रो, व्यापार, स्वास्थ्य, ट्रेंडिंग और ताज़ा खबरें – NewsBiz24",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <SideMenu />

      <main className="content-wrapper">
        <HomeView bigCard={null} smallCards={[]} />
      </main>

      <Footer />
    </>
  );
}
