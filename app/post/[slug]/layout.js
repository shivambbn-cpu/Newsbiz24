export async function generateMetadata({ params }) {
  const slug = params.slug;

  const title = slug.replace(/-/g, " ");

  return {
    title: title + " | Newsbiz24",

    // 👇 Global description use कर रहे हैं
    description:
      "Newsbiz24.in पर पाएं धार्मिक, ट्रेंडिंग, एस्ट्रो, व्यापार, स्वास्थ्य, जीवनशैली और ताज़ा खबरों की कवरेज।",

    keywords: `${title}, gharelu nuskhe, hindi health tips`,
  };
}

export default function Layout({ children }) {
  return children;
}
