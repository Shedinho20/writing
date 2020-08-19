import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { signOut } from "../../data/action/project";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import { motion } from "framer-motion";
import { container } from "../motion";
import Mybutton from "../MUI/button";
import "./account.scss";

const Account = ({ signout, auth, singleUser }) => {
  if (!auth.uid || !auth.emailVerified) return <Redirect to="/" />;

  if (singleUser && auth.emailVerified) {
    const date = moment(singleUser.createdAt.toDate()).format("LL");
    const NumProjects = Object.values(singleUser.notes).length;
    return (
      <motion.div
        className="account"
        variants={container}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0, transition: { delay: 0.25, duration: 0.25 } }}
      >
        <h1>{`${singleUser.firstName} ${singleUser.lastName}`}</h1>
        <div className="userIn">{singleUser.inititals}</div>
        <h3>{auth.email}</h3>
        <h4>{`Writing user since ${date}`}</h4>
        <h5>{`You have written ${NumProjects} notes`}</h5>
        <motion.div onClick={signout} whileHover={{ scale: 1.1 }}>
          <Mybutton name="Signout" type="button" />
        </motion.div>
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
