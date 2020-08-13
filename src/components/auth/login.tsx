import * as React from "react";
import { connect } from "react-redux";
import { authAction, resetEmail } from "../../data/action/project";
import { Redirect, Link } from "react-router-dom";
import { credentailsLogin } from "../../interface";
import { motion } from "framer-motion";
import { container } from "../motion";
import Mybutton from "../MUI/button";

interface Props {
  signIn: (cred: credentailsLogin) => void;
  resetPassword: (email: string) => void;
  authError: string;
  auth: any;
  resetPasswordError: string;
  resetEmail: string;
}

class Login extends React.Component<Props> {
  state = {
    email: "",
    password: "",
    isMessage: false,
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ isMessage: false });
    this.setState({ [e.target.id]: e.target.value });
  };
  passwordReset = () => {
    if (this.state.email === "") {
      this.setState({ isMessage: true });
    } else {
      this.setState({ isMessage: false });
      this.props.resetPassword(this.state.email);
    }
  };

  erroMessage = () => {
    if (this.state.isMessage) {
      return (
        <div className="errorMesage">
          <p>please enter a correct email address</p>
        </div>
      );
    }
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/Projectlist" />;

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0, transition: { delay: 0.25, duration: 0.25 } }}
        className="form"
      >
        <form id="form-login" onSubmit={this.handleSubmit}>
          <h2>LOGIN</h2>
          <p className="noAccount">
            Don't have an account?{" "}
            <Link to="/siginin" id="link" className="noAccountSign">
              Sign up
            </Link>
          </p>

          <div>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              onChange={this.handleChange}
              className="emailLogin"
              required
            />
            <p className="errorMesage noAccountSign">{this.props.resetEmail}</p>
            <p className="errorMesage ">{this.props.resetPasswordError}</p>
            {this.erroMessage()}
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
              className="emailLogin"
            />
            <p className="noAccountLost" onClick={this.passwordReset}>
              Lost your password?
            </p>
          </div>
          <Mybutton name="Login" type="submit" />

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
    resetPasswordError: state.auth.resetPasswordError,
    resetEmail: state.auth.resetEmail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (creds: credentailsLogin) => dispatch(authAction(creds)),
    resetPassword: (email) => dispatch(resetEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
