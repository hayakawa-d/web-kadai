import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvJ8RgJ7Ywl8zsvEQy3sKLAMp-yYRIX0Q",
  authDomain: "kyudo-practice-log.firebaseapp.com",
  projectId: "kyudo-practice-log",
  storageBucket: "kyudo-practice-log.appspot.com",
  messagingSenderId: "947981229998",
  appId: "1:947981229998:web:853b30b5aa0a8f559db23f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
