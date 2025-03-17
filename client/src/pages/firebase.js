import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getStorage } from "firebase/storage";
import 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyA1bM5UOnxGXnSRaX-CK8EKaFrnEkXFnkA",
  authDomain: "cardekho-f0892.firebaseapp.com",
  projectId: "cardekho-f0892",
  storageBucket: "cardekho-f0892.firebasestorage.app",
  messagingSenderId: "750229060208",
  appId: "1:750229060208:web:40ac696f85dc7eccf2d2b5",
  measurementId: "G-357J73LHSW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider= new GoogleAuthProvider()
export const storage = getStorage(app);

export default app;