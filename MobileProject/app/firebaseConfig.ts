// File: app/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// GANTI DATA INI DENGAN CONFIG DARI FIREBASE CONSOLE KAMU
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "project-kamu.firebaseapp.com",
  projectId: "project-kamu",
  storageBucket: "project-kamu.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth (untuk Login) dan Firestore (untuk Database)
export const auth = getAuth(app);
export const db = getFirestore(app);