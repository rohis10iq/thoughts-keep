// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8GoZ39khiQWqNEGCEf6VJ2pzp0VrCdNs",
  authDomain: "thoughts-keep.firebaseapp.com",
  projectId: "thoughts-keep",
  storageBucket: "thoughts-keep.appspot.com",
  messagingSenderId: "453211181645",
  appId: "1:453211181645:web:5c4be645a08547d8c4c204",
  measurementId: "G-NEDGFGQVD6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Analytics only runs in the browser
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, analytics, db, auth };
