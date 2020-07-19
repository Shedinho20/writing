// @ts-nocheck
import React from "react";
import Project from "./project";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import Addproject from "./addProjectBTN";
import { Redirect } from "react-router-dom";

export interface Props {
  projects: any;
  auth: any;
}

class Projectlist extends React.Component<Props, {}> {
  state = {};
  render() {
    const { projects } = this.props;

    const ownProject =
      projects &&
      projects.filter((project) => {
        return project.authourId === this.props.auth.uid;
      });

    if (!this.props.auth.uid) return <Redirect to="/" />;

    return (
      <div>
        <div className="search"></div>
        <div className="projectlist">
          <Addproject />
          {ownProject &&
            ownProject.map((project: any) => {
              return <Project key={project.id} project={project} />;
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps), firestoreConnect([{ collection: "projects" }]))(Projectlist);
