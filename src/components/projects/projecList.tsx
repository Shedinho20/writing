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

    if (!this.props.auth.uid) return <Redirect to="/" />;

    return (
      <div>
        <div className="search"></div>
        <div className="projectlist">
          <Addproject />
          {projects &&
            projects.map((project: any) => {
              return <Project key={project.id} project={project} />;
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const userId = state.firebase.auth.uid;
  const data = state.firestore.data.users;
  let user = data ? data[userId].notes : null;
  user = user ? Object.values(user) : null;
  user = user
    ? user.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    : null;
  return {
    projects: user,
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps), firestoreConnect([{ collection: "projects" }]))(Projectlist);
