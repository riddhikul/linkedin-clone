// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// //import { getAnalytics  } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDIFH6fVWyJbavkZMsNZqyMfCtlKAXEz00",
//   authDomain: "linkedin-yt-77f81.firebaseapp.com",
//   projectId: "linkedin-yt-77f81",
//   storageBucket: "linkedin-yt-77f81.appspot.com",
//   messagingSenderId: "432901706627",
//   appId: "1:432901706627:web:166791ceb6f194a8e91cb6",
//   measurementId: "G-RQPJ3GSL08"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const auth = getAuth();
//   // const fireBaseApp = firebase.initializeApp(firebaseConfig);
//   // const db=fireBaseApp.firestore();
//   // const auth=firebase.auth();

//    export{db,auth};

//import { FirebaseApp } from "firebase/app";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// Other necessary imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//import { initializeApp } from "firebase/app";
//import { getFirestore } from "@firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIFH6fVWyJbavkZMsNZqyMfCtlKAXEz00",
  authDomain: "linkedin-yt-77f81.firebaseapp.com",
  projectId: "linkedin-yt-77f81",
  storageBucket: "linkedin-yt-77f81.appspot.com",
  messagingSenderId: "432901706627",
  appId: "1:432901706627:web:166791ceb6f194a8e91cb6",
  measurementId: "G-RQPJ3GSL08"
};

initializeApp(firebaseConfig);
//export const firestore = getFirestore(app)

export const db = getFirestore();
export const auth = getAuth();




