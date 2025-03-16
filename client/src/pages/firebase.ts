// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
import 'firebase/storage'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);
export const auth = getAuth()
export const provider= new GoogleAuthProvider()
export const storage = getStorage(app);

export default app;