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

    let usedprojects = projects ? Object.values(projects) : null;
    usedprojects = usedprojects
      ? usedprojects.sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
      : null;
    return (
      <div>
        <div className="search"></div>
        <div className="projectlist">
          <Addproject />
          {usedprojects &&
            usedprojects.map((project: any) => {
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
  let user = data ? data[userId] : null;
  let userData = user ? user.notes : null;
  return {
    projects: userData,
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps), firestoreConnect([{ collection: "projects" }]))(Projectlist);
