import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoContextProvider } from "../src/Context/VideoContext";
import { AuthContextProvider } from "./Context/AuthContext";
import { LikedVideosContextProvider } from "./Context/LikedVideosContext";
import { WatchLaterContextProvider } from "./Context/WatchLaterContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoContextProvider>
        <AuthContextProvider>
          <LikedVideosContextProvider>
            <WatchLaterContextProvider>
              <App />
            </WatchLaterContextProvider>
          </LikedVideosContextProvider>
        </AuthContextProvider>
      </VideoContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
