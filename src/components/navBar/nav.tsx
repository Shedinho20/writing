import * as React from "react";
import Onsignout from "./onSignOut";
import Onsignin from "./onSignIn";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

interface Props {}

const Navbar = ({ auth }) => {
  const links = auth.uid ? <Onsignin /> : <Onsignout />;
  return (
    <div className="nav">
      <div className="navInner">
        <img src="/images/logo.png" alt="logo" id="logo" />
        <div className="signOutIn">{links}</div>
        <div className="askQuestion">
          <img src="/images/ask.png" alt="logo" id="askQuestion" />
          <h3>Ask a question</h3>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps), firestoreConnect([{ collection: "users" }]))(Navbar);
