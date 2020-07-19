import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9C4BNxszvkkW_orwm8tjConmOv-qqaMw",
  authDomain: "writing-81784.firebaseapp.com",
  databaseURL: "https://writing-81784.firebaseio.com",
  projectId: "writing-81784",
  storageBucket: "writing-81784.appspot.com",
  messagingSenderId: "306684844413",
  appId: "1:306684844413:web:0389cddd7f5ea315265414",
  measurementId: "G-MC4XBSGYJM",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
