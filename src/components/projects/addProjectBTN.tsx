import React from "react";
import { connect } from "react-redux";
import { Modal } from "../../data/action/project";

const Addproject = ({ Modal }) => {
  return (
    <div className="project" id="newProject" onClick={() => Modal()}>
      <img src="/images/new.png" alt="" />
      <div className="footerprojectNew">
        <p>New Note</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    Modal: () => dispatch(Modal()),
  };
};
export default connect(null, mapDispatchToProps)(Addproject);
