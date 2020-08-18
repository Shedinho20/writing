import React from "react";
import { connect } from "react-redux";
import { Modal } from "../../data/action/project";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import "./style/addproject.scss";
const Addproject = ({ Modal }) => {
  return (
    <div className="addproject" onClick={() => Modal()}>
      <NoteAddIcon className="material-icons" color="primary" />
      <p>New Note</p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    Modal: () => dispatch(Modal()),
  };
};
export default connect(null, mapDispatchToProps)(Addproject);
