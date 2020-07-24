import React from "react";
import { connect } from "react-redux";
import { deleteNote } from "../../data/action/project";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import moment from "moment";
export interface Props {}

const Project = ({ project, delNote }) => {
  return (
    <div className="project">
      <Link to={"/editor/" + project.id} id="link">
        <h3>{title(project.title)}</h3>
        <p className="body">{body(project.body).sentence}</p>
        <div className="footerproject">
          <p id="footerword">{body(project.body).len} words</p>
          <p>{moment(project.createdAt.toDate()).calendar()}</p>
        </div>
      </Link>
      <div id="del" onClick={() => delNote(project.id)}>
        <h5>Delete</h5>
      </div>
    </div>
  );
};

const body = (word) => {
  let newWord = word.replace(/(<([^>]+)>)/gi, "");
  const len = newWord.split(" ").join("").length;
  let words = newWord.split(" ");
  let sentence = "";
  words.forEach((word) => {
    if (sentence.length < 120) {
      sentence = sentence + " " + word;
    }
  });
  return { sentence, len };
};

const title = (word) => {
  let words = word.split(" ");
  let title = "";
  words.forEach((word) => {
    if (title.length < 20) {
      title = title + " " + word;
    }
  });
  return title;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    delNote: (id) => dispatch(deleteNote(id)),
  };
};

const mapSTateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default compose(
  firestoreConnect([{ collection: "projects" }]),
  connect(mapSTateToProps, mapDispatchToProps)
)(Project);
