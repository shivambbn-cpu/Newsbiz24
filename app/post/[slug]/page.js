"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Header from "@/app/components/Header";
import RelatedPosts from "@/app/components/RelatedPosts";

export default function BlogDetail({ params }) {
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function loadPost() {
      const q = query(collection(db, "posts"), where("slug", "==", slug));
      const snap = await getDocs(q);
      snap.forEach((d) => setPost({ id: d.id, ...d.data() }));
    }
    loadPost();

    async function loadAll() {
      const snap = await getDocs(collection(db, "posts"));
      setAllPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    loadAll();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 5);

  return (
    <>
      <Header />

      <main className="detail-container">
        <h1>{post.title}</h1>
        <p className="meta">
          {post.author} · {post.date}
        </p>

        <img src={post.image} alt="" className="detail-img" />

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <RelatedPosts posts={related} />
      </main>
    </>
  );
      }
