// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export function Firebase() {
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZoMh04eKr61W4ZJGTy65-gUgZBJDzLyc",
  authDomain: "esc-booking-database.firebaseapp.com",
  projectId: "esc-booking-database",
  storageBucket: "esc-booking-database.appspot.com",
  messagingSenderId: "365460059692",
  appId: "1:365460059692:web:2cb0f79344cc1289330389",
  measurementId: "G-JZMXW8LXG4",
  databaseURL: "https://esc-booking-database-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);
// console.log(db);
return db;
}