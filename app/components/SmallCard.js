"use client";

import Link from "next/link";

export default function SmallCard({ post }) {
  return (
    <Link href={`/post/${post.slug}`} className="small-card">
      <img src={post.image} className="small-img" />
      <div>
        <h4>{post.title}</h4>
        <p className="meta">{post.date}</p>
      </div>
    </Link>
  );
  }
