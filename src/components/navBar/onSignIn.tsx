import * as React from "react";
import { NavLink as Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { motion } from "framer-motion";

interface Props {}

const Onsignin = ({ user }) => {
  if (user) {
    return (
      <motion.div
        initial={{ x: "-100vw", opacity: "0.5" }}
        animate={{ x: "0", opacity: "1" }}
        transition={{ duration: 1, type: "tween" }}
      >
        <div className="intiail">
          <div id="intiail">{user.inititals}</div>
          <h3>
            <Link to={`/account/${user.firstName}${user.lastName}`} id="link" activeClassName="active">
              Account
            </Link>
          </h3>
        </div>
        <div className="notes">
          <img src="/images/home.png" alt="" />
          <h3>
            <Link to="/Projectlist" id="link" activeClassName="active">
              Notes
            </Link>
          </h3>
        </div>
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
