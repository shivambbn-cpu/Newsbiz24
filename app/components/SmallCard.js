"use client";

export default function SmallPostCard({ post, onSelectPost }) {
return (
<div
className="small-card post-card"
onClick={() => onSelectPost(post)}
>
{/* IMAGE */}
<img  
src={post.image}  
alt={post.title}  
className="small-img"  
/>

{/* TEXT BLOCK */}  
  <div>  
    <h4>{post.title}</h4>  

    {/* CONTENT */}  
    <p>  
      {(post.content || "").substring(0, 100)}...  
    </p>  

    {/* DATE */}  
    <small>  
      {new Date(post.date).toLocaleDateString("en-IN")}  
    </small>  
  </div>  
</div>

);
}
Iske jaise same rahe aur <br> and <strong> support kare code do
