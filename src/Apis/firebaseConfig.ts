// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAt1FAopxKw0ZeqsDTKoRD5hw9cKvPZzrk",
  authDomain: "expensetracker-5d779.firebaseapp.com",
  projectId: "expensetracker-5d779",
  storageBucket: "expensetracker-5d779.firebasestorage.app",
  messagingSenderId: "956793249710",
  appId: "1:956793249710:web:31c6affab180435e45f23f",
  measurementId: "G-427C8B65EW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
