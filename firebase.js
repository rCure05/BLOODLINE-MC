// firebase.js

import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDocs
}
from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyAGd9GOJAnPkoYkyQvlUcqIxQuJwoAPgW4",
  authDomain: "bloodlinemc-warehouse.firebaseapp.com",
  projectId: "bloodlinemc-warehouse",
  storageBucket: "bloodlinemc-warehouse.firebasestorage.app",
  messagingSenderId: "882322986783",
  appId: "1:882322986783:web:0a946711a861bd52e9c22a"

};

const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);

export {
  db,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDocs
};