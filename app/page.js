"use client";

import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import HomeView from "./components/HomeView";
import DetailView from "./components/DetailView";
import Footer from "./components/Footer";

export default function HomePage() {
return (
<>

<Header />  
<SideMenu />  <div className="content-wrapper">    
    <HomeView />    
    <DetailView />    
  </div>      <Footer />    
</>  );
}
