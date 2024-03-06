// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZO-gNKZzBl4MfQb8RhFLi7-ogCI1RFG8",
  authDomain: "swp391-f7197.firebaseapp.com",
  projectId: "swp391-f7197",
  storageBucket: "swp391-f7197.appspot.com",
  messagingSenderId: "80398098043",
  appId: "1:80398098043:web:f02df17ec0dbf020ed4cde",
  measurementId: "G-WL9XGF1RGJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

