import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoContextProvider } from "../src/Context/VideoContext";
import { AuthContextProvider } from "./Context/AuthContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </VideoContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
