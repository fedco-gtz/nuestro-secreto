import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3FZ9J_kHOECc3DRZIKMkqsJJW5dljRHg",
  authDomain: "el-secreto-d1218.firebaseapp.com",
  projectId: "el-secreto-d1218",
  storageBucket: "el-secreto-d1218.firebasestorage.app",
  messagingSenderId: "232056204354",
  appId: "1:232056204354:web:dc2e29c8f85207a22c91db"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);