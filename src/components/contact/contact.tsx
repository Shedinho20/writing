import * as React from "react";
import { connect } from "react-redux";
import { signUp } from "../../data/action/project";
import TextField from "@material-ui/core/TextField";
import { container } from "../motion";
import { motion } from "framer-motion";
import Mybutton from "../MUI/button";
import "./contact.scss";
interface Props {
  signNewUser: (any) => void;
  auth: any;
  authError: string;
}

class Contactus extends React.Component<Props> {
  state = {
    message: "",
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
  };
  handleChange = (e: any) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { auth, authError } = this.props;

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { delay: 0.25, duration: 0.25 } }}
        className="form"
      >
        <form id="form-sigin" onSubmit={this.handleSubmit}>
          <div className="form-body">
            <h2>Reach out</h2>
            <TextField
              id="message"
              label="Ask question"
              multiline
              rows={10}
              variant="outlined"
              style={{ width: "300px", borderRadius: "10px" }}
              required
              color="secondary"
            />
            <Mybutton name="Reach out" type="submit" color="primary" />
          </div>
        </form>
      </motion.div>
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

export default connect(mapStateToProps, mapDispactToProps)(Contactus);
