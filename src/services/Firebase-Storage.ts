import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export function Firebase() {
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

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  return db;
}