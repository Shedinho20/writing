import * as React from "react";
import { connect } from "react-redux";
import { signUp } from "../../data/action/projectAction";
import { Redirect } from "react-router-dom";

interface Props {
  signNewUser: (any) => void;
  auth: any;
  authError: string;
}

class Signin extends React.Component<Props> {
  state = {
    email: "",
    password: "",
    firstName: "",
    Surname: "",
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.signNewUser(this.state);
  };
  handleChange = (e: any) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { auth, authError } = this.props;

    // if (auth.uid) return <Redirect to="/Projectlist" />;

    return (
      <div className="form">
        <form id="form-sigin" onSubmit={this.handleSubmit}>
          <h2>JOIN</h2>
          <input type="text" id="firstName" placeholder="First Name" onChange={this.handleChange} required />
          <input type="text" id="Surname" placeholder="Name" onChange={this.handleChange} required />
          <input type="email" id="email" placeholder="E-mail" onChange={this.handleChange} required />
          <input type="password" id="password" placeholder="Password" onChange={this.handleChange} required />
          <button className="btn" id="btn-join">
            Join
          </button>
          {authError ? <p style={{ color: "red", marginTop: "2em", fontSize: "0.5rem" }}>{authError}</p> : null}
        </form>
      </div>
    );
  }
}

const mapDispactToProps = (disptch) => {
  return {
    signNewUser: (newUser) => disptch(signUp(newUser)),
  };
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.auth_error,
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, mapDispactToProps)(Signin);
