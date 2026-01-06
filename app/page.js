import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";

export default async function PostPage({ params }) {
  const q = query(
    collection(db, "posts"),
    where("slug", "==", params.slug)
  );

  const snap = await getDocs(q);
  if (snap.empty) return <h2>Post not found</h2>;

  const post = snap.docs[0].data();

  return (
    <article className="blog-detail-card">

      {post.image && (
        <div className="detail-image-wrapper">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="detail-img"
          />
        </div>
      )}

      <h1>{post.title}</h1>

      <div
        className="detail-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.date && (
        <p className="detail-date">
          Posted on{" "}
          {new Date(
            post.date?.toDate ? post.date.toDate() : post.date
          ).toLocaleDateString("en-IN")}
        </p>
      )}
    </article>
  );
}
