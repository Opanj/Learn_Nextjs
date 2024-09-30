// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBWTNti119HJuTxjtgWH05CJmCUVALQMY8",
//   authDomain: "my-next-app-a0c82.firebaseapp.com",
//   projectId: "my-next-app-a0c82",
//   storageBucket: "my-next-app-a0c82.appspot.com",
//   messagingSenderId: "520131169767",
//   appId: "1:520131169767:web:947733e0cab11c4a47c142",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

// caution
// harus menjaga data ini agar tidak terpublish di github dengan menggunakan .env
