import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdHN8y2eslFbaRsM4Gl9APZE2PW6ZoQj8",
    authDomain: "world-bank-hackaton-2022.firebaseapp.com",
    projectId: "world-bank-hackaton-2022",
    storageBucket: "world-bank-hackaton-2022.appspot.com",
    messagingSenderId: "770214372028",
    appId: "1:770214372028:web:b7ca7d43fca2b664eb26b9",
    measurementId: "G-PH7WCW5BTF"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);