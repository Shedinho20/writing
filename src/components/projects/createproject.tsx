import * as React from "react";
import { CreatprojectAction, Modalclose } from "../../data/action/project";
import { connect } from "react-redux";
import { Project } from "../../interface";
import Loader from "react-loader-spinner";

interface Props {
  createProject: (project: Project) => {};
  Modal: () => void;
}

class Createproject extends React.Component<Props> {
  state = {
    title: "",
    body: "",
    updated: true,
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ updated: !this.state.updated });
    this.props.createProject(this.state);
  };

  handleChange = (e: any) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  note = () => (
    <>
      <div className="cancle" onClick={() => this.props.Modal()}>
        X
      </div>
      <h2>ADD NOTE</h2>
      <input type="text" id="title" placeholder="Title" onChange={this.handleChange} required />
      <button className="btn" id="btn-login">
        ADD
      </button>
    </>
  );
  render() {
    return (
      <div className="modal">
        <div className="form">
          <form id="form-login" onSubmit={this.handleSubmit}>
            {this.state.updated ? (
              this.note()
            ) : (
              <div className="addNewNote">
                <Loader type="Oval" color="#32343a" height={50} width={50} timeout={30000} />
              </div>
            )}
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
