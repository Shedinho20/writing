import React from "react";
import "./App.css";
import Navbar from "./components/navBar/nav";
import Home from "./components/home/home";
import { Switch, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/login";
import Signin from "./components/auth/Signin";
import Projectlist from "./components/projects/projecList";
import Createproject from "./components/projects/createproject";
import { connect } from "react-redux";
import Editor from "./components/editor/editor";
import Account from "./components/account/account";
import Loader from "react-loader-spinner";
import { AnimatePresence } from "framer-motion";

function App({ addNote, isLoaded, auth }) {
  const location = useLocation();
  console.log(auth);
  if (isLoaded) {
    return (
      <React.Fragment>
        <Navbar />
        {addNote ? <Createproject /> : null}
        <div className="writingContent">
          <AnimatePresence exitBeforeEnter>
            <Switch location={location}>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/siginin" component={Signin} />
              <Route path="/Projectlist" component={Projectlist} />
              <Route path="/editor/:id" component={Editor} />
              <Route path="/account/:name" component={Account} />
            </Switch>
          </AnimatePresence>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div className="loader">
        <Loader type="Oval" color="#32343a" height={50} width={50} timeout={30000} />
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    addNote: state.projectData.addNote,
    isLoaded: state.firebase.auth["isLoaded"],
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(App);
