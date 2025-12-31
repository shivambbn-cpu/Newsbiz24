"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function DetailView({ post, onClose }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const router = useRouter();

  if (!post) return null;

  // Scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  // Back + Escape
  useEffect(() => {
    window.history.pushState(null, document.title);

    const onPop = () => onClose?.();
    const onKey = (e) => e.key === "Escape" && onClose?.();

    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // WhatsApp button (unchanged)
  useEffect(() => {
    let btn = document.getElementById("whatsapp-float-btn");
    const postUrl = `${window.location.origin}/post/${post.slug}`;
    const whatsappUrl =
      `whatsapp://send?text=${encodeURIComponent(post.title + " " + postUrl)}`;

    if (!btn) {
      btn = document.createElement("a");
      btn.id = "whatsapp-float-btn";
      btn.target = "_blank";
      btn.innerHTML =
        `<img src="https://i.ibb.co/qLnXkgVb/9d22c9bbafc5d6cde2858c982c3cb6e5.jpg"
        style="width:100%;height:100%;border-radius:30%;">`;

      const size = window.innerWidth <= 768 ? 50 : 72;
      btn.style.cssText = `
        position:fixed; top:75%; right:20px;
        transform:translateY(-50%);
        width:${size}px; height:${size}px;
        background:white; border-radius:30%;
        box-shadow:0 4px 8px rgba(0,0,0,0.25);
        z-index:9999; display:flex;
        align-items:center; justify-content:center;
      `;
      document.body.appendChild(btn);
    }

    btn.href = whatsappUrl;
    btn.style.display = "flex";

    return () => { if (btn) btn.style.display = "none"; };
  }, [post]);

  // 🔥 Fetch related posts
  useEffect(() => {
    async function fetchRelated() {
      const snap = await getDocs(collection(db, post.category));

      const data = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(p => p.slug !== post.slug)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 8);

      setRelatedPosts(data);
    }

    fetchRelated();
  }, [post]);

  return (
    <div className="detail-view">
      <div className="blog-detail-card">
        <img src={post.image} alt={post.title} className="detail-img" />
        <h1>{post.title}</h1>

        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <p className="detail-date">
          <strong>
            Posted on{" "}
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </p>
      </div>

      {/* 🔥 RELATED POSTS – Screenshot style */}
      {relatedPosts.length > 0 && (
        <div className="related-list">
          <h3>Related Posts</h3>

          {relatedPosts.map(p => (
            <div
              key={p.id}
              className="related-item"
              onClick={() =>
                router.push(`/post/${encodeURIComponent(p.slug)}`)
              }
            >
              {p.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
