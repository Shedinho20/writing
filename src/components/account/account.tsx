import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { signOut } from "../../data/action/project";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import { motion } from "framer-motion";
import { container } from "../motion";

const Account = ({ signout, auth, UserInititals, projects }) => {
  if (!auth.uid) return <Redirect to="/" />;
  if (UserInititals && projects) {
    const date = moment(UserInititals.createdAt.toDate()).format("LL");
    const NumProjects = Object.values(UserInititals.notes).length;
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0, transition: { delay: 0.25, duration: 0.25 } }}
      >
        <div className="account">
          <h1>{`${UserInititals.firstName} ${UserInititals.lastName}`}</h1>
          <div className="userIn">{UserInititals.inititals}</div>
          <h3>{auth.email}</h3>
          <h4>{`Writing user since ${date}`}</h4>
          <h5>{`You have written ${NumProjects} notes`}</h5>
          <motion.button className="btn" id="btn-signout2" onClick={signout} whileHover={{ scale: 1.1 }}>
            Sign-out
          </motion.button>
        </div>
      </motion.div>
    );
  } else {
    return null;
  }
};

// const numProjects = (projects, auth) => {
//   return projects.filter((project) => project.authourId === auth);
// };

const mapDispactToProps = (dispact) => {
  return {
    signout: () => dispact(signOut()),
  };
};

const mapStateToProps = (state) => {
  const userID = state.firebase.auth.uid;
  const allUser = state.firestore.data.users;
  const UserInititals = allUser ? allUser[userID] : null;
  return {
    auth: state.firebase.auth,
    UserInititals,
    projects: state.firestore.ordered.projects,
  };
};

export default compose(
  connect(mapStateToProps, mapDispactToProps),
  firestoreConnect([{ collection: "users" }, { collection: "projects" }])
)(Account);
