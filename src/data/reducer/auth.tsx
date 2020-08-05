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
  resetPasswordError: false,
};

const authReducer = (state = initialstate, action: Auth) => {
  switch (action.type) {
    case LOGIN_FAIL:
      return {
        ...state,
        auth_error: action.payload,
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
      return state;
    case ERRORESETEMAILSENT:
      return {
        ...state,
        resetPasswordError: true,
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
