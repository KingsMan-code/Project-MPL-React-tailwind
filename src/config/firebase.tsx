import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import {getFirestore} from 'firebase/firestore'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAc9_D048jCGhWu7-gx4BhydW6Ei4syE4w",
  authDomain: "mpl-teste.firebaseapp.com",
  projectId: "mpl-teste",
  storageBucket: "mpl-teste.appspot.com",
  messagingSenderId: "271215955607",
  appId: "1:271215955607:web:965ef9ec19ac80e9a663d2"
};

 // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const database = getFirestore(app)
 export const imageDb = getStorage(app)
 export const firebase = { app, auth }; // Correção: crie um objeto chamado 'firebase' e inclua 'app' e 'auth'
 export const dataBaseRealTime = getDatabase(app)