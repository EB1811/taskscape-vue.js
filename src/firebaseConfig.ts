import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB5rix-51cdg-sowosvsOX4mfI_Qz1SZzM",
    authDomain: "taskscape-3cca5.firebaseapp.com",
    projectId: "taskscape-3cca5",
    storageBucket: "taskscape-3cca5.appspot.com",
    messagingSenderId: "580485145439",
    appId: "1:580485145439:web:cfa7d44a4e7210bd98ccea",
    measurementId: "G-DQLJH6EYZZ",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
