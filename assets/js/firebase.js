import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdjBE2UpEFRUgkASTaKP5X7vYr0ygzuI",
  authDomain: "championnats-guyane-bt-2026.firebaseapp.com",
  projectId: "championnats-guyane-bt-2026",
  storageBucket: "championnats-guyane-bt-2026.firebasestorage.app",
  messagingSenderId: "639869315232",
  appId: "1:639869315232:web:c73adb022414faf1d641c5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
