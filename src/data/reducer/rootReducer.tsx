import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export const RootReducer = combineReducers({
  auth: authReducer,
  projectData: projectReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
