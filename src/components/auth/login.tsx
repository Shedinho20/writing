import * as React from "react";
import { connect } from "react-redux";
import { authAction } from "../../data/action/project";
import { Redirect } from "react-router-dom";
import { credentailsLogin } from "../../interface";
import { motion } from "framer-motion";
import { container } from "../motion";

interface Props {
  signIn: (cred: credentailsLogin) => void;
  authError: string;
  auth: any;
}

class Login extends React.Component<Props> {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  handleChange = (e: any) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/Projectlist" />;

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { delay: 0.25, duration: 0.25 } }}
        className="form"
      >
        <form id="form-login" onSubmit={this.handleSubmit}>
          <h2>LOGIN</h2>
          <input type="email" id="email" placeholder="E-mail" onChange={this.handleChange} />
          <input type="password" id="password" placeholder="Password" onChange={this.handleChange} />
          <button className="btn" id="btn-login">
            Login
          </button>
          <div style={{ color: "red", marginTop: "2em", fontSize: "0.5rem" }}>
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
      </motion.div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authError: state.auth.auth_error,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (creds: credentailsLogin) => dispatch(authAction(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
