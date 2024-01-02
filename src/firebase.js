import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLWsgyA1RgmEsL1p39oyLxufQTY_5O9l8",
  authDomain: "blog-5e5c5.firebaseapp.com",
  projectId: "blog-5e5c5",
  storageBucket: "blog-5e5c5.appspot.com",
  messagingSenderId: "176363580035",
  appId: "1:176363580035:web:ca6b52466b3adf1a56c9b6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(auth);
export default app;
