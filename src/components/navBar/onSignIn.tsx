import * as React from "react";
import { NavLink as Link, Prompt } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { motion } from "framer-motion";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import "./style/onsignin.scss";

const Onsignin = ({ user, auth }) => {
  if (user) {
    return (
      <motion.div
        initial={{ x: "-100vw", opacity: "0.5" }}
        animate={{ x: "0", opacity: "1" }}
        transition={{ duration: 1, type: "tween" }}
        className="onSignin"
      >
        <Link to={`/account/${user.firstName}${user.lastName}`} id="link" activeClassName="active" className="link">
          <AccountBoxIcon className="material-icons" />
          <h3>Account</h3>
        </Link>

        <Prompt
          when={!auth.emailVerified}
          message={(location) => {
            return location.pathname.startsWith("/account") ? `${location.pathname} requires a verified account` : true;
          }}
        />

        <Link to="/Projectlist" id="link" activeClassName="active" className="link">
          <HomeIcon className="material-icons" />
          <h3>Notes</h3>
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
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps), firestoreConnect([{ collection: "users" }]))(Onsignin);
