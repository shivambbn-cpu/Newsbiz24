
export const revalidate = 60; // हर 60 sec में refresh (ISR)

async function getNews() {
  const res = await fetch("https://api.example.com/news", {
    next: { revalidate: 60 },
  });

  return res.json();
}

export default async function Page() {
  const news = await getNews();

  return (
    <div>
      <h1>Latest News</h1>

      {news.map((item) => (
        <h2 key={item.id}>{item.title}</h2>
      ))}
    </div>
  );
}

        
