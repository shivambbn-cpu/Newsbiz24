import "./globals.css";

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
    images: [
      {
        url: "/og-image.jpg", // public folder me rakho
        width: 1200,
        height: 630,
        alt: "News Biz 24",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
