import { combineReducers } from "redux";
import authReducer from "./auth";
import projectReducer from "./project";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export const RootReducer = combineReducers({
  auth: authReducer,
  projectData: projectReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
