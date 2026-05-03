import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// CONFIG DE TON PROJET (OK VALIDÉE)
const firebaseConfig = {
  apiKey: "AIzaSyAdjBE2UpEFRUgkASTaKP5X7vYr0ygZuZI",
  authDomain: "championnats-guyane-bt-2026.firebaseapp.com",
  projectId: "championnats-guyane-bt-2026",
  storageBucket: "championnats-guyane-bt-2026.firebasestorage.app",
  messagingSenderId: "639869315232",
  appId: "1:639869315232:web:c73adb022414faf1d641c5"
};

// INIT
const app = initializeApp(firebaseConfig);

// EXPORTS
export const db = getFirestore(app);
export const auth = getAuth(app);
