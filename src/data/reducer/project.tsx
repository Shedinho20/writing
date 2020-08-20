import {
  CREATPROJECT,
  ERROR,
  MODAL,
  MODALCLOSE,
  DELETE,
  NOTEUPDATED,
  ProjectReducer,
  REMOVEMESSAGE,
  NAVMOBILE,
  NAVCLASSOPEN,
  NAVCLASSCLOSE,
} from "../action/constant";

const initialstate = {
  addNote: false,
  noteupdated: false,
  navmob: false,
  style1: "menustyle",
  style2: "menustyle",
  style3: "menustyle",
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
      return { ...state, noteupdated: true };
    case REMOVEMESSAGE:
      return { ...state, noteupdated: false };
    case NAVMOBILE:
      const { navmob } = state;
      if (navmob) {
        return { ...state, navmob: false };
      } else {
        return { ...state, navmob: true };
      }
    case NAVCLASSOPEN:
      return { ...state, style1: "menustyle menu1", style2: "menustyle menu2", style3: "menustyle menu3" };
    case NAVCLASSCLOSE:
      return { ...state, style1: "menustyle", style2: "menustyle ", style3: "menustyle " };
    default:
      return state;
  }
};

export default projectReducer;
