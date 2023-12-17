/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFSsqhgB4jemdX4fLWCdA2YJF2JupaSbA",
  authDomain: "blog-4acf0.firebaseapp.com",
  projectId: "blog-4acf0",
  storageBucket: "blog-4acf0.appspot.com",
  messagingSenderId: "523491264028",
  appId: "1:523491264028:web:2e428a0bb4a16bf43a81d9",
  measurementId: "G-TE37EW8S8L",
};

const app = initializeApp(firebaseConfig);

// google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      console.log(error);
    });

  return user;
};
