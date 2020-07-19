import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
interface Props {}

const Home = ({ auth }) => {
  if (auth.uid) return <Redirect to="/Projectlist" />;
  return (
    <div className="home">
      <h1>Writing...</h1>
      <img src="/images/bg-home.png" alt="" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Home);
