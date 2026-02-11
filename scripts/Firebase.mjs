import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAon2En6oClLGNHJuVDC7PYbFGzPy6bW5c",
  authDomain: "the-golden-scroll.firebaseapp.com",
  projectId: "the-golden-scroll",
  storageBucket: "the-golden-scroll.firebasestorage.app",
  messagingSenderId: "162425132870",
  appId: "1:162425132870:web:0f8e982e27cae87d1eb747",
  measurementId: "G-TMKSXWGNL9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function saveTeamToCloud(teamData) {
    
    await setDoc(doc(db, "teams", teamData.name), teamData);
}