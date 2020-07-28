import React from "react";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { updateNote } from "../../data/action/project";
import { debounce } from "lodash";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import { motion } from "framer-motion";
import { container } from "../motion";

// import { updater } from "../../data/reducer/rootReducer";

interface EditorProps {
  match: any;
  project: any;
  updateChange: (note: NewNote) => void;
  auth: any;
  projectID: number | string;
  userId: number | string;
  isUpdated: boolean;
}
export interface NewNote {
  projetctID: string | number;
  title: string | number;
  body: any;
  userID: number | string;
}
interface EditorState {}

class Editor extends React.Component<EditorProps, EditorState> {
  state = {
    title: "",
    body: "",
    projetctID: null,
    userID: null,
  };

  componentDidMount() {
    const projects = this.props.project;
    if (projects) {
      this.setState({
        title: projects.title,
        body: projects.body,
        projetctID: this.props.match.params.id,
        userID: this.props.userId,
      });
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) {
      const projects = this.props.project;
      this.setState({
        title: projects.title,
        body: projects.body,
        projetctID: this.props.match.params.id,
        userID: this.props.userId,
      });
    }
  }

  handleChange = (e: any) => {
    this.setState(
      { [e.target.id]: e.target.value },
      debounce(() => {
        this.props.updateChange(this.state);
      }, 1000)
    );
  };

  handleChangeBody = debounce((val: any) => {
    this.setState({ body: val });
    this.props.updateChange(this.state);
  }, 1000);

  render() {
    const { project, auth } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    if (project) {
      return (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, scale: 0, transition: { delay: 0.5, duration: 0.5 } }}
        >
          <input type="text" id="title" className="titleeditor" onChange={this.handleChange} value={this.state.title} />
          <ReactQuill value={this.state.body} onChange={this.handleChangeBody} id="editor" />
        </motion.div>
      );
    } else {
      return (
        <div className="loaderEditior">
          <Loader type="Oval" color="#32343a" height={50} width={50} timeout={300} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownprops) => {
  const userId = state.firebase.auth.uid;
  const id = ownprops.match.params.id;
  const data = state.firestore.data.users;
  const userNotes = data ? data[userId].notes : null;
  const userNote = userNotes ? userNotes[id] : null;
  return {
    project: userNote,
    projectID: id,
    auth: state.firebase.auth,
    isUpdated: state.projectData.noteupdated,
    userId,
  };
};

const mapDispactToProps = (dispatch) => {
  return {
    updateChange: (newNote: NewNote) => dispatch(updateNote(newNote)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispactToProps),
  firestoreConnect([{ collection: "projects" }, { collection: "User" }])
)(Editor);
