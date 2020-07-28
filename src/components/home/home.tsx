import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { container } from "../motion";
interface Props {}

const Home = ({ auth }) => {
  if (auth.uid) return <Redirect to="/Projectlist" />;
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0, transition: { delay: 0.25, duration: 0.25 } }}
      className="home"
    >
      <h1>Writing...</h1>
      <img src="/images/bg-home.png" alt="" />
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Home);
