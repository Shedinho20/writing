import * as React from "react";
import { NavLink as Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

interface Props {}

const Onsignin = ({ user }) => {
  if (user) {
    return (
      <div>
        <Link to="/account/imani" id="link" activeClassName="active">
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
      </div>
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
