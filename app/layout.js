import "./globals.css";
import Script from "next/script";

const siteDescription =
  "Newsbiz24.in पर पाएं धार्मिक, ट्रेंडिंग, एस्ट्रो, व्यापार, स्वास्थ्य, जीवनशैली और ताज़ा खबरों की कवरेज।";

export const metadata = {
  title: "News Biz 24",
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
      <body>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RRHYP5Y8ZZ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RRHYP5Y8ZZ');
          `}
        </Script>
      </body>
    </html>
  );
}




