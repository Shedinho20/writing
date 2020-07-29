import * as React from "react";
import { NavLink as Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { motion } from "framer-motion";

interface Props {}

const Onsignin = ({ user }) => {
  console.log(user);
  if (user) {
    return (
      <motion.div
        initial={{ x: "-100vw", opacity: "0.5" }}
        animate={{ x: "0", opacity: "1" }}
        transition={{ duration: 1, type: "tween" }}
      >
        <Link to={`/account/${user.firstName}${user.lastName}`} id="link" activeClassName="active">
          <div className="intiail">
            <div id="intiail">{user.inititals}</div>
            <h3>Account</h3>
          </div>
        </Link>
        <Link to="/Projectlist" id="link" activeClassName="active">
          <div className="notes">
            <img src="/images/home.png" alt="" />
            <h3>Notes</h3>
          </div>
        </Link>
      </motion.div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  const userID = state.firebase.auth.uid;
  const users = state.firestore.data.users;
  const user = users ? users[userID] : null;
  return {
    user,
  };
};

export default compose(connect(mapStateToProps), firestoreConnect([{ collection: "users" }]))(Onsignin);
