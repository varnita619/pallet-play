import React from "react";
import "./VideoCard.css";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";

const VideoCard = ({ eachVideo }) => {
  const { _id, title, description, img} = eachVideo;
  return (
    <div className="shadow-card">
      <div className="card-image">
        <img
          src={img}
          alt="card-image"
        />
      </div>

      <div className="shadow-card-details">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div className="twin-btn">
        <button className="like-btn">
          <AiFillLike />
        </button>
        <button className="like-btn">
          <MdWatchLater />
        </button>
      </div>
    </div>
  );
};

export { VideoCard };
