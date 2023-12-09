// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-29a96.firebaseapp.com",
  projectId: "mern-estate-29a96",
  storageBucket: "mern-estate-29a96.appspot.com",
  messagingSenderId: "116032540281",
  appId: "1:116032540281:web:11cbfb6d8a817b0aadcea8",
  measurementId: "G-F1VVRVR0EV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);