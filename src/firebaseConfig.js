// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFFW7LnR-rjVVdy79obnoaBKvLlh3kQvo",
  authDomain: "inversiones-91b79.firebaseapp.com",
  projectId: "inversiones-91b79",
  storageBucket: "inversiones-91b79.firebasestorage.app",
  messagingSenderId: "771441329953",
  appId: "1:771441329953:web:d8922f221c35b2dcc82060"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- LÍNEA CLAVE ---
// Asegúrate de que la palabra "export" esté aquí.
// Esto permite que otros archivos, como HomePage.jsx, usen la variable "db".
export const db = getFirestore(app);
export const auth = getAuth(app);