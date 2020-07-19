import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { RootReducer } from "./reducer/rootReducer";
import { getFirebase } from "react-redux-firebase";
import firebase from "./fbConfig";

const initialState = {};
const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const store = createStore(
  RootReducer,
  initialState,
  compose(reduxFirestore(firebase), applyMiddleware(...middlewares))
);

export default store;
