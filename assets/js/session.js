import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

export async function register(email, password){
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export async function login(email, password){
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export async function logout(){
  await signOut(auth);
}

export async function getRoleByUid(uid){
  if(!uid) return null;

  const ref = doc(db, "roles", uid);
  const snap = await getDoc(ref);

  if(!snap.exists()) return null;

  return snap.data()?.role || null;
}

export async function getRoleByEmail(){
  const user = auth.currentUser;
  if(!user) return null;
  return getRoleByUid(user.uid);
}

export function isAdmin(role){
  return role === "admin";
}

export function isJat(role){
  return role === "admin" || role === "jat";
}

export function isArbitre(role){
  return role === "admin" || role === "jat" || role === "arbitre";
}
