// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCxkraTOo3ZvAtwyKbOpIciNNBMmyHirI4",
  authDomain: "chatbot-danfetea.firebaseapp.com",
  projectId: "chatbot-danfetea",
  storageBucket: "chatbot-danfetea.firebasestorage.app",
  messagingSenderId: "107316525939",
  appId: "1:107316525939:web:7fb9f24d681bcfd075a306",
  measurementId: "G-XSH138VP9J"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const  analytics = getAnalytics(app);
export const db: Firestore = getFirestore(app);