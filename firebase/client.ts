import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import  {getAuth} from 'firebase/auth';
// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy049_d_Q2opCbTyhSzqN29N5hmgMxYAs",
  authDomain: "interviewly-95fa2.firebaseapp.com",
  projectId: "interviewly-95fa2",
  storageBucket: "interviewly-95fa2.firebasestorage.app",
  messagingSenderId: "900290379363",
  appId: "1:900290379363:web:aafbd32597cee37d58c256",
  measurementId: "G-Z5FXF08L4P"
};

const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);


