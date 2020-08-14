import { Project } from "../../interface";

export const CREATPROJECT = "CREATPROJECT";
export const ERROR = "ERROR";
export const MODAL = "MODAL";
export const MODALCLOSE = "MODALCLOSE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SIGN_SUCESS = "SIGN_SUCESS";
export const SIGN_FAIL = "SIGN_FAIL";
export const SIGN_OUT = "SIGN_OUT";
export const DELETE = "DELETE";
export const NOTEUPDATED = "NOTEUPDATED";
export const RESETEMAILSENT = "RESETEMAILSENT";
export const ERRORESETEMAILSENT = "ERRORESETEMAILSENT";
export const REMOVEMESSAGE = "REMOVEMESSAGE";

interface CREATPROJECT {
  type: typeof CREATPROJECT;
  payload: Project;
}
interface MODAL {
  type: typeof MODAL;
  payload?: any;
}
interface ERROR {
  type: typeof ERROR;
  payload: any;
}
interface MODALCLOSE {
  type: typeof MODALCLOSE;
  payload?: any;
}
interface LOGIN_SUCCESS {
  type: typeof LOGIN_SUCCESS;
  payload?: any;
}
interface LOGIN_FAIL {
  type: typeof LOGIN_FAIL;
  payload?: any;
}
interface SIGN_SUCESS {
  type: typeof SIGN_SUCESS;
  payload?: any;
}
interface SIGN_FAIL {
  type: typeof SIGN_FAIL;
  payload?: any;
}
interface SIGN_OUT {
  type: typeof SIGN_OUT;
  payload?: any;
}
interface DELETE {
  type: typeof DELETE;
  payload: string | number;
}
interface NOTEUPDATED {
  type: typeof NOTEUPDATED;
  payload?: any;
}
interface RESETEMAILSENT {
  type: typeof RESETEMAILSENT;
  payload?: any;
}
interface ERRORESETEMAILSENT {
  type: typeof ERRORESETEMAILSENT;
  payload?: any;
}
interface REMOVEMESSAGE {
  type: typeof REMOVEMESSAGE;
  payload?: any;
}

export type ProjectReducer = CREATPROJECT | MODAL | MODALCLOSE | ERROR | DELETE | NOTEUPDATED | REMOVEMESSAGE;
export type Auth =
  | LOGIN_FAIL
  | LOGIN_SUCCESS
  | SIGN_SUCESS
  | SIGN_FAIL
  | SIGN_OUT
  | RESETEMAILSENT
  | ERRORESETEMAILSENT;

export type Action = ProjectReducer | Auth;
