// Your web app's Firebase configuration
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
