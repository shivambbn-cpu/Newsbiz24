import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "News Biz 24",
  description:
    "Newsbiz24.in पर पाएं धार्मिक, ट्रेंडिंग, एस्ट्रो, व्यापार, स्वास्थ्य, जीवनशैली और ताज़ा खबरों की कवरेज।",
  robots: "index, follow",

  openGraph: {
    type: "website",
    title: "News Biz 24",
    description: "ताज़ा और भरोसेमंद खबरें",
    url: "https://newsbiz24.in",
    images: ["about:blank"],
  },

  twitter: {
    card: "summary",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>
        {/* PAGE CONTENT */}
        {children}

        {/* ALWAYS AT BOTTOM */}
        <Footer />
      </body>
    </html>
  );
}
