"use client";

import { useEffect, useState } from "react";
import { getAllPostsForSearch } from "@/lib/globalSearch";
import { filterSearchPosts } from "@/lib/searchUtils";
import PostCard from "./PostCard";

export default function GlobalSearch({ onClose }) {
  const [allPosts, setAllPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Load all posts
  useEffect(() => {
    getAllPostsForSearch().then(setAllPosts);
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    setResults(filterSearchPosts(allPosts, query));
  }, [query, allPosts]);

  // Handle closing search
  const handleClose = () => {
    setQuery("");         // Clear search
    if (onClose) onClose(); // Trigger parent to show default category (astro)
  };

  return (
    <div className="global-search">
      <div className="search-header">
        <input
          type="search"
          placeholder="Search blog title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleClose}>Close</button>
      </div>

      {query ? (
        <div className="search-results">
          {results.length === 0 && <p>No result found</p>}

          {results.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
