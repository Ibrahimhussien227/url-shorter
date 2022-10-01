import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4U_bdUs3r3SJ8mXYEKuloYMQtdlA7DcM",
  authDomain: "shorter-46cd7.firebaseapp.com",
  projectId: "shorter-46cd7",
  storageBucket: "shorter-46cd7.appspot.com",
  messagingSenderId: "346635900611",
  appId: "1:346635900611:web:51933c397f12e3b586f476",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
