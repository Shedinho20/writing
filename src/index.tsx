import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import firebase from "firebase/app";
import store from "./data/store";

import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./components/MUI/theme";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <App />
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
