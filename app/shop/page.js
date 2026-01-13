"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "shop_products"), where("active", "==", true));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(p => p.id === item.id);
    if (index >= 0) cart[index].qty += 1;
    else cart.push({ ...item, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart");
  };

  if (loading) return <p style={{ padding: 40, textAlign: "center" }}>Loading shop...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>🛍️ Our Shop</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
        {products.map(item => (
          <div key={item.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10, textAlign: "center" }}>
            {item.image && <img src={item.image} alt={item.name} style={{ width: "100%", borderRadius: 8, maxHeight: 180, objectFit: "cover" }} />}
            <h3 style={{ margin: "10px 0" }}>{item.name}</h3>
            <p style={{ color: "#4caf50", fontWeight: "bold" }}>₹{item.price}</p>

            {openId === item.id ? (
              <>
                <button style={btnStyle("#f0ad4e")} onClick={() => addToCart(item)}>Add to Cart</button>
                <button style={btnStyle("#4caf50")} onClick={() => router.push(`/product/${item.id}`)}>Buy Now</button>
              </>
            ) : (
              <button style={btnStyle("#2196f3")} onClick={() => setOpenId(item.id)}>Add</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const btnStyle = (bg) => ({
  width: "100%",
  padding: 10,
  marginTop: 8,
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
});

    
