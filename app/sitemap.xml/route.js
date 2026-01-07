import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  const categories = [
    "astro","business","health","lifestyles",
    "news","religious","trending","weather"
  ];

  let urls = [];

  for (const cat of categories) {
    const snap = await getDocs(collection(db, cat));
    snap.docs.forEach(doc => {
      const data = doc.data();
      if (!data.slug) return;

      urls.push(`
        <url>
          <loc>https://newsbiz24.in/post/${encodeURIComponent(data.slug)}</loc>
          <lastmod>${data.date ? new Date(data.date.seconds*1000).toISOString() : new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `);
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://newsbiz24.in/</loc>
      <priority>1.0</priority>
    </url>
    ${urls.join("")}
  </urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
