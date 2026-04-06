import "./globals.css";

const siteDescription =
  "Newsbiz24.in पर पाएं धार्मिक, ट्रेंडिंग, एस्ट्रो, व्यापार, स्वास्थ्य, जीवनशैली और ताज़ा खबरों की कवरेज।";

export const metadata = {
  title: "News Biz 24",

  // ✅ FIXED Hindi text
  description: siteDescription,

  robots: "index, follow",

  openGraph: {
    type: "website",
    title: "News Biz 24",
    description: siteDescription,
    url: "https://newsbiz24.in",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "News Biz 24",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "News Biz 24",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
