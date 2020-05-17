import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";

// Firebase
import firebase from "firebase/app";
import fbconfig from "./fbconfig";
import "firebase/auth";
import "firebase/firestore";

import "./styles.scss";
import "./layout.scss";
import Routes from "./Routes.jsx";

export const fb = firebase.initializeApp(fbconfig);
export const db = fb.firestore();

function App() {
  return (
    <BrowserRouter>
      <div className="nav-bar">
        <Link to="/">GE Parts</Link>
      </div>
      <div className="container">
        <Routes />
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
