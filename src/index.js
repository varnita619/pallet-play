import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {BrowserRouter as Router} from "react-router-dom";
import {VideoContextProvider} from "../src/Context/VideoContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoContextProvider>
    <App />
    </VideoContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
