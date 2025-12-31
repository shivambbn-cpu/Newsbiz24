"use client";

import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={`/post/${post.slug}`} className="post-card">
      <img src={post.image} className="card-img" />
      <h3>{post.title}</h3>
      <p className="meta">{post.author} · {post.date}</p>
    </Link>
  );
                }
