"use client";

import Image from "next/image";
import { memo, useCallback } from "react";

function BigPostCard({ post, onSelectPost }) {
if (!post) return null;

const handleClick = useCallback(() => {
onSelectPost(post);
}, [post, onSelectPost]);

// Ã¢Å“â€¦ Safe image URL
const imageUrl =
typeof post.image === "string" && post.image.trim() !== ""
? post.image.trim()
: null;

// Ã¢Å“â€¦ Safe date (Firestore + normal)
const postDate = post?.date?.toDate
? post.date.toDate()
: post?.date
? new Date(post.date)
: null;

return (
<div className="big-card post-card" onClick={handleClick}>
{/* Image */}
{imageUrl && (
<Image  
src={imageUrl}  
alt={post.title}  
width={800}  
height={450}  
priority  
className="big-img"  
/>
)}

<div className="big-details">  
    {/* Ã¢Å“â€¦ TITLE Ã¢â€ â€™ h3 (CSS match) */}  
    <h3>{post.title}</h3>  

    {/* Ã¢Å“â€¦ CONTENT Ã¢â€ â€™ p (CSS match) */}  
    <p  
      dangerouslySetInnerHTML={{  
        __html:  
          ((post.content || "")  
            .substring(0, 150)  
            .replace(/\n/g, "<br />")) + "...",  
      }}  
    />  

    {/* Ã¢Å“â€¦ DATE Ã¢â€ â€™ className match */}  
    {postDate && (  
      <small className="post-date-info">  
        Posted on :{" "}  
        {postDate.toLocaleDateString("en-IN", {  
          day: "2-digit",  
          month: "long",  
          year: "numeric",  
        })}  
      </small>  
    )}  
  </div>  
</div>

);
}

export default memo(BigPostCard);



