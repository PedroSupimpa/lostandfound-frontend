// firebase-config.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAkKz-elwIq_PeWHK6E4KdZy91OzPDYe00",
  authDomain: "lostandfound-211e2.firebaseapp.com",
  projectId: "lostandfound-211e2",
  storageBucket: "lostandfound-211e2.appspot.com",
  messagingSenderId: "210598248940",
  appId: "1:210598248940:web:98fd74776013eb1d1140c9",
  measurementId: "G-P0P11Q6HK2"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
