import { CREATPROJECT, ERROR, MODAL, MODALCLOSE, DELETE, NOTEUPDATED, ProjectReducer } from "../action/constant";

const initialstate = {
  addNote: false,
  noteupdated: true,
};

const projectReducer = (state = initialstate, action: ProjectReducer) => {
  switch (action.type) {
    case CREATPROJECT:
      return { ...state, addNote: false };
    case ERROR:
      return state;
    case MODAL:
      return { ...state, addNote: true };
    case MODALCLOSE:
      return { ...state, addNote: false };
    case DELETE:
      return { ...state };
    case NOTEUPDATED:
      return { ...state, noteupdated: false };

    default:
      return state;
  }
};

export default projectReducer;
