// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf9wr19foHKI9-GuKKhClzbG198tW_dSo",
    authDomain: "giza-media.firebaseapp.com",
    projectId: "giza-media",
    storageBucket: "giza-media.appspot.com",
    messagingSenderId: "516376246728",
    appId: "1:516376246728:web:555a1ffd451b7dbf9ee8fd",
    measurementId: "G-6GK8XCHNNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseStorage = getStorage(app);