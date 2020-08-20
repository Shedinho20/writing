import * as React from "react";
import Onsignout from "./onSignOut";
import Onsignin from "./onSignIn";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { NavLink as Link } from "react-router-dom";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import "./style/nav.scss";
interface Props {}

const ask = {
  display: "flex",
  alignItems: "baseline",
  marginBottom: "10em",
};
const Navbar = ({ auth }) => {
  const links = auth.uid ? <Onsignin /> : <Onsignout />;
  return (
    <div className="nav">
      <div className="navInner">
        <img src="/images/logo.png" alt="logo" />
        <div className="signOutIn">{links}</div>
        <Link to={`/contact`} id="link" style={ask} activeClassName="active" className="link">
          <LiveHelpIcon className="material-icons" />
          <h3>Ask a question</h3>
        </Link>
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
