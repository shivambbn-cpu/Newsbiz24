import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://newsbiz24.in"),

  title: {
    default: "News Biz 24",
    template: "%s | Newsbiz24",
  },

  description:
    "Newsbiz24.in पर पाएं धार्मिक, ट्रेंडिंग, एस्ट्रो, व्यापार, स्वास्थ्य, जीवनशैली और ताज़ा खबरों की कवरेज।",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: "https://newsbiz24.in",
    siteName: "Newsbiz24",
    title: "News Biz 24",
    description: "ताज़ा और भरोसेमंद खबरें",
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
    description: "ताज़ा और भरोसेमंद खबरें",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
