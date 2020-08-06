import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { signOut } from "../../data/action/project";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import { motion } from "framer-motion";
import { container } from "../motion";

const Account = ({ signout, auth, singleUser }) => {
  console.log(auth.emailVerified);
  if (!auth.uid) return <Redirect to="/" />;
  if (singleUser && auth.emailVerified) {
    const date = moment(singleUser.createdAt.toDate()).format("LL");
    const NumProjects = Object.values(singleUser.notes).length;
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0, transition: { delay: 0.25, duration: 0.25 } }}
      >
        <div className="account">
          <h1>{`${singleUser.firstName} ${singleUser.lastName}`}</h1>
          <div className="userIn">{singleUser.inititals}</div>
          <h3>{auth.email}</h3>
          <h4>{`Writing user since ${date}`}</h4>
          <h5>{`You have written ${NumProjects} notes`}</h5>
          <motion.button className="btn" id="btn-signout2" onClick={signout} whileHover={{ scale: 1.1 }}>
            Sign-out
          </motion.button>
        </div>
      </motion.div>
    );
  }
  if (!auth.emailVerified) {
    return <div className="account">verify your email please</div>;
  } else {
    return null;
  }
};

const mapDispactToProps = (dispact) => {
  return {
    signout: () => dispact(signOut()),
  };
};

const mapStateToProps = (state) => {
  const userID = state.firebase.auth.uid;
  const allUser = state.firestore.data.users;
  const singleUser = allUser ? allUser[userID] : null;
  return {
    auth: state.firebase.auth,
    singleUser,
  };
};

export default compose(
  connect(mapStateToProps, mapDispactToProps),
  firestoreConnect([{ collection: "users" }, { collection: "projects" }])
)(Account);
