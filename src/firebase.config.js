import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1wnqeETUcO8ksW8ahDtgpeY7pr9peh5s",
  authDomain: "passop-2ee71.firebaseapp.com",
  projectId: "passop-2ee71",
  storageBucket: "passop-2ee71.appspot.com",
  messagingSenderId: "243225713599",
  appId: "1:243225713599:web:eefc143992c8b5d7f31f0a",
  measurementId: "G-DVGGQL1T1M"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);



