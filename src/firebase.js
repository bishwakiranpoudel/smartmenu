// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBGtJLVFr-Tv16GyRqLiWTAryXpinnffwc",
  authDomain: "binary-menu.firebaseapp.com",
  projectId: "binary-menu",
  storageBucket: "binary-menu.appspot.com",
  messagingSenderId: "591525112688",
  appId: "1:591525112688:web:de58110440a4665d5e3db5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);