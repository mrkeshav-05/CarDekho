import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getStorage } from "firebase/storage";
import 'firebase/storage'; 

const FIREBASE_API_KEY = import.meta.FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = import.meta.FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = import.meta.FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = import.meta.FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = import.meta.FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = import.meta.FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = import.meta.FIREBASE_MEASUREMENT_ID;


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider= new GoogleAuthProvider()
export const storage = getStorage(app);

export default app;