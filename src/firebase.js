import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnA0b8AdRZCOeP23uh00v2jLH54ec0u5A",
  authDomain: "quizinetrivia.firebaseapp.com",
  projectId: "quizinetrivia",
  storageBucket: "quizinetrivia.appspot.com",
  messagingSenderId: "205733411449",
  appId: "1:205733411449:web:7e1123d93517542045f2a8",
  measurementId: "G-GZ2KDEW16K",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
