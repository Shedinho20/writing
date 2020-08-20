import * as React from "react";
import Onsignout from "./onSignOut";
import Onsignin from "./onSignIn";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import "./style/nav.scss";
import { motion, AnimatePresence } from "framer-motion";
import { navmob } from "../motion";
import { navMobile, navClass } from "../../data/action/project";
interface Props {}

const Navbarmob = ({ auth, navMobil, navClass }) => {
  const links = auth.uid ? <Onsignin /> : <Onsignout />;
  return (
    <AnimatePresence>
      <motion.div
        key="key"
        variants={navmob}
        initial="hidden"
        animate="visible"
        exit={{ x: "100vh", transition: { delay: 2, duration: 5 } }}
        className="navmob"
      >
        <div className="navInner">
          <img src="/images/logo.png" alt="logo" />
          <div
            className="signOutIn"
            onClick={() => {
              navMobil();
              navClass();
            }}
          >
            {links}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navMobil: () => dispatch(navMobile()),
    navClass: () => dispatch(navClass()),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "users" }])
)(Navbarmob);
