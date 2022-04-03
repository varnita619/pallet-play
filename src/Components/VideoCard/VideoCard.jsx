import React from "react";
import "./VideoCard.css";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { useLikedVideoContext } from "../../Context/LikedVideosContext";
import { useAuthContext } from "../../Context/AuthContext";
import {  useNavigate } from "react-router";
import { useWatchLaterContext } from "../../Context/WatchLaterContext";
import { useHistoryContext } from "../../Context/HistoryContext";

const VideoCard = ({ eachVideo }) => {
  const { _id, title, description, thumbnail } = eachVideo;

  const { addToLikes } = useLikedVideoContext();
  const {addToWatchLater} = useWatchLaterContext();
  const {addToHistory} = useHistoryContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const singleVideoHandler = () => {
    navigate(`/video/${_id}`)
    addToHistory(eachVideo);
  }

  return (
    <div className="shadow-card">
      <div className="card-image" onClick={() => singleVideoHandler()}>
        <img src={thumbnail} alt="card-image" />
      </div>

      <div className="shadow-card-details">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div className="twin-btn">
        <button
          className="like-btn"
          onClick={() => {
            token ? addToLikes(eachVideo) : navigate("/login");
          }}
        >
          <AiFillLike />
        </button>
        <button className="like-btn"  onClick={() => {
            token ? addToWatchLater(eachVideo) : navigate("/login");
          }}>
          <MdWatchLater />
        </button>
      </div>
    </div>
  );
};

export { VideoCard };
