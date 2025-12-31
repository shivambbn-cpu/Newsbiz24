// app/lib/searchUtils.js

/**
 * Filter posts by title, sort by date (latest first), limit 20
 * @param {Array} posts - All posts
 * @param {string} keyword - Search keyword
 * @returns {Array} - Filtered posts
 */
export function filterSearchPosts(posts, keyword) {
  if (!keyword || keyword.trim() === "") return [];

  return posts
    .filter((post) =>
      post.title?.toLowerCase().includes(keyword.toLowerCase())
    )
    .sort((a, b) => {
      const d1 = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const d2 = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return d2 - d1; // latest first
    })
    .slice(0, 20); // only 20 posts
}
