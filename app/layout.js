export const metadata = {
  title: "News Biz 24",
  description:
    "Newsbiz24.in à¤ªà¤° à¤ªà¤¾à¤à¤‚ à¤§à¤¾à¤°à¥à¤®à¤¿à¤•, à¤Ÿà¥à¤°à¥‡à¤‚à¤¡à¤¿à¤‚à¤—, à¤à¤¸à¥à¤Ÿà¥à¤°à¥‹, à¤µà¥à¤¯à¤¾à¤ªà¤¾à¤°, à¤¸à¥à¤µà¤¾à¤¸à¥à¤¥à¥à¤¯, à¤œà¥€à¤µà¤¨à¤¶à¥ˆà¤²à¥€ à¤”à¤° à¤¤à¤¾à¤œà¤¼à¤¾ à¤–à¤¬à¤°à¥‹à¤‚ à¤•à¥€ à¤•à¤µà¤°à¥‡à¤œà¥¤",
  robots: "index, follow",

  openGraph: {
    type: "website",
    title: "News Biz 24",
    description: "à¤¤à¤¾à¤œà¤¼à¤¾ à¤”à¤° à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤–à¤¬à¤°à¥‡à¤‚",
    url: "https://newsbiz24.in",
    images: ["about:blank"],
  },
  twitter: {
    card: "summary",
  },
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
