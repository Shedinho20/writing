import React from "react";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { updateNote } from "../../data/action/projectAction";
import { debounce } from "lodash";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
// import { updater } from "../../data/reducer/rootReducer";

interface EditorProps {
  match: any;
  project: any;
  updateChange: (note) => void;
  auth: any;
  projectID: number | string;
  isUpdated: boolean;
}
export interface NewNote {
  projetctID: string | number;
  title: string | number;
  body: any;
}
interface EditorState {}

class Editor extends React.Component<EditorProps, EditorState> {
  state = {
    title: "",
    body: "",
    projetctID: null,
  };
  componentDidUpdate(prevProps: EditorProps) {
    if (prevProps.project !== this.props.project) {
      this.setState({
        title: this.props.project.title,
        body: this.props.project.body,
        projetctID: this.props.match.params.id,
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
    const { project, auth, projectID } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    if (project && projectID === auth.uid) {
      return (
        <div>
          <input type="text" id="title" className="titleeditor" onChange={this.handleChange} value={this.state.title} />
          <ReactQuill value={this.state.body} onChange={this.handleChangeBody} id="editor" />
        </div>
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
  const id = ownprops.match.params.id;
  const projects = state.firestore.data.projects;
  const user = state.firestore.data.User;
  // console.log(state.firestore.data.User["pQGBlVdjgIG9RSVQxxtz"]);
  const us = user ? state.firestore.data.User.dddddnjekbol446 : null;
  console.log(us);
  const project = projects ? projects[id] : null;
  const projectID = project ? project.authourId : null;
  return {
    project,
    projectID,
    auth: state.firebase.auth,
    isUpdated: state.projectData.noteupdated,
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
