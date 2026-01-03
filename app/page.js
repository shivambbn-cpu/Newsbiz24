"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import DetailView from "./components/DetailView";
import Footer from "./components/Footer";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function HomePage() {
const [posts, setPosts] = useState([]);
const [selectedPost, setSelectedPost] = useState(null);
const [currentCategory, setCurrentCategory] = useState("astro"); // ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ default

// ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Firestore Ãƒ Ã‚Â¤Ã‚Â¸Ãƒ Ã‚Â¥Ã¢â‚¬Â¡ posts fetch (category wise)
useEffect(() => {
console.log("ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Fetching category:", currentCategory);

const fetchPosts = async () => {  
  try {  
    const colRef = collection(db, currentCategory);  
    const snapshot = await getDocs(colRef);  

    console.log("ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã¢â‚¬Å¾ Docs count:", snapshot.size);  

    const data = snapshot.docs.map(doc => ({  
      id: doc.id,  
      ...doc.data(),  
    }));  

    data.sort((a, b) => new Date(b.date) - new Date(a.date)); // latest first  

    setPosts(data);  
    setSelectedPost(null); // category change pe detail close  
  } catch (err) {  
    console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Firestore Error:", err);  
  }  
};  

fetchPosts();

}, [currentCategory]);

const openDetail = (post) => setSelectedPost(post);
const closeDetail = () => setSelectedPost(null);

// BigCard Ãƒ Ã‚Â¤Ã¢â‚¬ÂÃƒ Ã‚Â¤Ã‚Â° SmallCards split
const bigCard = posts[0];
const smallCards = posts.slice(1, 10);

return (
<>
<Header />

{/* ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ category callback pass */}  
  <SideMenu onCategorySelect={setCurrentCategory} />  

  <div className="content-wrapper">  
    {!selectedPost ? (  
      <HomeView  
        bigCard={bigCard}  
        smallCards={smallCards}  
        onSelectPost={openDetail}  
      />  
    ) : (  
      <DetailView post={selectedPost} onClose={closeDetail} />  
    )}  
  </div>  

  <Footer />  
</>

);
}
