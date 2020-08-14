import {
  CREATPROJECT,
  ERROR,
  MODAL,
  MODALCLOSE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGN_SUCESS,
  SIGN_FAIL,
  SIGN_OUT,
  DELETE,
  NOTEUPDATED,
  Action,
  RESETEMAILSENT,
  ERRORESETEMAILSENT,
  REMOVEMESSAGE,
} from "./constant";
import { Project, credentailsLogin } from "../../interface";
import { Dispatch } from "react";
import uuid from "react-uuid";
import { NewNote } from "../../components/editor/editor";

export const CreatprojectAction = (project: Project) => {
  return async (dispact: Dispatch<Action>, getState: any, { getFirestore }) => {
    const firestore = getFirestore();
    const auth = getState().firebase.auth.uid;
    console.log(getFirestore);
    try {
      const key = uuid();
      const note = {
        ...project,
        createdAt: new Date(),
        id: key,
      };
      await firestore
        .collection("users")
        .doc(auth)
        .update({
          [`notes.${key}`]: note,
        });
      dispact({
        type: CREATPROJECT,
        payload: project,
      });
    } catch (error) {
      dispact({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const Modal = () => {
  return {
    type: MODAL,
  };
};

export const Modalclose = () => {
  return {
    type: MODALCLOSE,
  };
};

export const authAction = (credentails: credentailsLogin) => {
  return async (dispatch: Dispatch<Action>, getState: any, { getFirebase, getFirestore }: any) => {
    try {
      const firebase = getFirebase();
      await firebase.auth().signInWithEmailAndPassword(credentails.email, credentails.password);
      dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: "The password or email is invalid.",
      });
    }
  };
};

export const signUp = (newUser) => {
  return async (dispatch: Dispatch<Action>, getState: any, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
      await firebase.auth().currentUser.sendEmailVerification();
      await firestore
        .collection("users")
        .doc(res.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.Surname,
          inititals: newUser.firstName[0] + newUser.Surname[0],
          createdAt: new Date(),
          friends: null,
          notes: [],
        });

      dispatch({
        type: SIGN_SUCESS,
      });
    } catch (error) {
      dispatch({
        type: SIGN_FAIL,
        payload: error.message,
      });
    }
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch<Action>, getstate: any, { getFirebase }: any) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT,
      });
    } catch (error) {}
  };
};

export const deleteNote = (id: string | number) => {
  return async (dispatch: Dispatch<Action>, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const auth = getState().firebase.auth.uid;
    try {
      await firestore
        .collection("users")
        .doc(auth)
        .update({
          [`notes.${id}`]: firebase.firestore.FieldValue.delete(),
        });

      dispatch({
        type: DELETE,
        payload: id,
      });
    } catch (error) {}
  };
};

export const updateNote = (user: NewNote) => {
  const { projetctID, title, body, userID } = user;
  return async (dispatch: Dispatch<Action>, getState, { getFirestore }: any) => {
    const firestore = getFirestore();
    try {
      const note = {
        title,
        body,
        createdAt: new Date(),
        id: projetctID,
      };
      await firestore
        .collection("users")
        .doc(userID)
        .update({
          [`notes.${projetctID}`]: note,
        });
      dispatch({
        type: NOTEUPDATED,
        payload: user,
      });
    } catch (error) {}
  };
};

export const resetEmail = (email) => {
  return async (dispatch: Dispatch<Action>, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch({
        type: RESETEMAILSENT,
        payload: "Reset link sent to your email",
      });
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        dispatch({
          type: ERRORESETEMAILSENT,
          payload: "Account blocked. Try again later.",
        });
      } else {
        dispatch({
          type: ERRORESETEMAILSENT,
          payload: "Please enter a correct email address",
        });
      }
    }
  };
};

export const removeMessage = () => {
  return (dispact) => {
    dispact({
      type: REMOVEMESSAGE,
    });
  };
};
