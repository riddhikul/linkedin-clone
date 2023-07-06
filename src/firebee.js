import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/storage";
//import 'dotenv/config'

//require('dotenv').config()
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY ,
  authDomain: "linkedin-yt-77f81.firebaseapp.com",
  projectId: "linkedin-yt-77f81",
  storageBucket: "linkedin-yt-77f81.appspot.com",
  messagingSenderId: "432901706627",
  appId: "1:432901706627:web:166791ceb6f194a8e91cb6",
  measurementId: "G-RQPJ3GSL08"
};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

