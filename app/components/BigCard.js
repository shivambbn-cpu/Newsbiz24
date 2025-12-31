"use client";

import Link from "next/link";

export default function BigCard({ post }) {
  return (
    <Link href={`/post/${post.slug}`} className="big-card">
      <img src={post.image} className="big-img" />
      <div className="big-info">
        <h2>{post.title}</h2>
        <p>{post.short}</p>
      </div>
    </Link>
  );
  }
