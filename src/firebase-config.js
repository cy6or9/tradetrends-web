import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUU-nZOb6jP1KgDAodB3c_PK7VLmFFdcc",
  authDomain: "tradetrends-89a9d.firebaseapp.com",
  projectId: "tradetrends-89a9d",
  storageBucket: "tradetrends-89a9d.appspot.com",
  messagingSenderId: "990950180616",
  appId: "1:990950180616:web:ddadabd319d9c188a78ebd",
  measurementId: "G-JP0GCH7QWZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
