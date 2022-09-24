import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

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

if (process.env.NODE_ENV) {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { app, db, auth };
