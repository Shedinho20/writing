import React from "react";
import "./App.css";
import Navbar from "./components/navBar/nav";
import Home from "./components/home/home";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Signin from "./components/auth/Signin";
import Projectlist from "./components/projects/projecList";
import Createproject from "./components/projects/createproject";
import { connect } from "react-redux";
import Editor from "./components/editor/editor";
import Account from "./components/account/account";
import Loader from "react-loader-spinner";

function App({ addNote, isLoaded }) {
  if (isLoaded) {
    return (
      <React.Fragment>
        <Navbar />
        {addNote ? <Createproject /> : null}
        <div className="writingContent">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/siginin" component={Signin} />
            <Route path="/Projectlist" component={Projectlist} />
            <Route path="/editor/:id" component={Editor} />
            <Route path="/account/:name" component={Account} />
          </Switch>
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
  };
};
export default connect(mapStateToProps)(App);
