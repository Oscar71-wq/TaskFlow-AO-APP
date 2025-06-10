import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkis3QU7n8fXYuTZaii1bLjmg08qMLi7c",
  authDomain: "taskflow-b4352.firebaseapp.com",
  projectId: "taskflow-b4352",
  storageBucket: "taskflow-b4352.appspot.com",
  messagingSenderId: "788866725093",
  appId: "1:788866725093:web:db0efdb612d9047cf4900c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);