import * as React from "react";
import { CreatprojectAction, Modalclose } from "../../data/action/project";
import { connect } from "react-redux";
import { Project } from "../../interface";

interface Props {
  createProject: (project: Project) => {};
  Modal: () => void;
}

class Createproject extends React.Component<Props> {
  state = {
    title: "",
    body: "",
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.createProject(this.state);
  };

  handleChange = (e: any) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <div className="modal">
        <div className="form">
          <form id="form-login" onSubmit={this.handleSubmit}>
            <div className="cancle" onClick={() => this.props.Modal()}>
              X
            </div>
            <h2>ADD NOTE</h2>
            <input type="text" id="title" placeholder="Title" onChange={this.handleChange} required />
            <button className="btn" id="btn-login">
              ADD
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project: Project) => dispatch(CreatprojectAction(project)),
    Modal: () => dispatch(Modalclose()),
  };
};

export default connect(null, mapDispatchToProps)(Createproject);
