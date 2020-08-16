import * as React from "react";
import { NavLink as Link, Prompt } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { motion } from "framer-motion";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const notes = {
  display: "flex",
  alignItems: "baseline",
  margin: "2em 0",
};

const Onsignin = ({ user, auth }) => {
  console.log(auth.emailVerified);
  if (user) {
    return (
      <motion.div
        initial={{ x: "-100vw", opacity: "0.5" }}
        animate={{ x: "0", opacity: "1" }}
        transition={{ duration: 1, type: "tween" }}
      >
        <Link to={`/account/${user.firstName}${user.lastName}`} id="link" activeClassName="active" style={notes}>
          <AccountBoxIcon className="material-icons" style={{ fontSize: "28px", position: "relative", bottom: -7 }} />
          <h3 style={{ fontSize: "1rem", marginLeft: ".8em" }}>Account</h3>
        </Link>

        <Prompt
          when={!auth.emailVerified}
          message={(location) => {
            return location.pathname.startsWith("/account") ? `${location.pathname} requires a verified account` : true;
          }}
        />

        <Link to="/Projectlist" id="link" activeClassName="active" style={notes}>
          <HomeIcon className="material-icons" style={{ fontSize: "28px", position: "relative", bottom: -7 }} />
          <h3 style={{ fontSize: "1rem", marginLeft: ".8em" }}>Notes</h3>
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
