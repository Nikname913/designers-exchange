import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAka06DgqKyJ06IVlJPhRj1A97LKOIAiZw",
  authDomain: "designers-exchange.firebaseapp.com",
  databaseURL: "https://designers-exchange-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "designers-exchange",
  storageBucket: "designers-exchange.appspot.com",
  messagingSenderId: "353916278550",
  appId: "1:353916278550:web:d1e7717ede1a4cba506237"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)