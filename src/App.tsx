import React, { Suspense } from "react";
import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/navBar/nav";
// import Home from "./components/home/home";
import Loaderspinner from "./components/loader";

const Signin = React.lazy(() => import("./components/auth/Signin"));
const Home = React.lazy(() => import("./components/home/home"));
const Login = React.lazy(() => import("./components/auth/login"));
const Account = React.lazy(() => import("./components/account/account"));
const Projectlist = React.lazy(() => import("./components/projects/projecList"));
const Editor = React.lazy(() => import("./components/editor/editor"));
const Createproject = React.lazy(() => import("./components/projects/createproject"));
const Contactus = React.lazy(() => import("./components/contact/contact"));
function App({ addNote, isLoaded, auth }) {
  const location = useLocation();
  if (isLoaded) {
    return (
      <React.Fragment>
        <Navbar />
        {addNote ? (
          <Suspense fallback={<Loaderspinner />}>
            <Createproject />
          </Suspense>
        ) : null}
        <div className="writingContent">
          <AnimatePresence exitBeforeEnter>
            <Switch location={location}>
              <Suspense fallback={<Loaderspinner />}>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/siginin" component={Signin} />
                <Route path="/Projectlist" component={Projectlist} />
                <Route path="/editor/:id" component={Editor} />
                <Route path="/account/:name" component={Account} />
                <Route path="/contact" component={Contactus} />
              </Suspense>
            </Switch>
          </AnimatePresence>
        </div>
      </React.Fragment>
    );
  } else {
    return <Loaderspinner />;
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
