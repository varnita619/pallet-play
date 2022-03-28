import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="main-div">
      <div className="container">
        <img
          src="https://www.gifcen.com/wp-content/uploads/2021/12/guitar-gif-1.gif"
          alt="Avatar"
          className="image"
        />

        <div className="middle">
          <p className="middle-para">
            Welcome to Pallet Play. Browse your favorite videos and learn
            guitar from basic to advance.
          </p>
          <div className="text">Explore Now</div>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
