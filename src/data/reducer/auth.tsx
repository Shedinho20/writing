import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGN_SUCESS,
  SIGN_FAIL,
  SIGN_OUT,
  Auth,
  RESETEMAILSENT,
  ERRORESETEMAILSENT,
} from "../action/constant";

const initialstate = {
  auth_error: null,
  resetPasswordError: null,
  resetEmail: null,
};

const authReducer = (state = initialstate, action: Auth) => {
  switch (action.type) {
    case LOGIN_FAIL:
      return {
        ...state,
        auth_error: action.payload,
        resetPasswordError: false,
        resetEmail: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth_error: null,
      };
    case SIGN_SUCESS:
      return {
        ...state,
        auth_error: null,
      };
    case SIGN_FAIL:
      return {
        ...state,
        auth_error: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        auth_error: null,
      };
    case RESETEMAILSENT:
      return {
        ...state,
        resetEmail: action.payload,
        resetPasswordError: false,
        auth_error: null,
      };
    case ERRORESETEMAILSENT:
      return {
        ...state,
        resetPasswordError: action.payload,
        resetEmail: null,
        auth_error: null,
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
