import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8VALU2-yRM8d6I3hlJJECJiLRa8sGdYk",
  authDomain: "newsbiz24-a1635.firebaseapp.com",
  projectId: "newsbiz24-a1635",
  storageBucket: "newsbiz24-a1635.firebasestorage.app",
  messagingSenderId: "171662306640",
  appId: "1:171662306640:web:7e151e4b8bdcbcd9359055"
};

// ✅ SAFE INIT (VERY IMPORTANT)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { app, db };
