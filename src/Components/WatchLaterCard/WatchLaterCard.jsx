import React from "react";
import { AiFillLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useLikedVideoContext } from "../../Context/LikedVideosContext";
import { useAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { useWatchLaterContext } from "../../Context/WatchLaterContext";

const WatchLaterCard = ({ eachVideo }) => {
  const { title, description, thumbnail } = eachVideo;

  const { addToLikes } = useLikedVideoContext();
  const { removeFromWatchLater } = useWatchLaterContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="shadow-card">
      <div className="card-image">
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
        <button
          className="like-btn"
          onClick={() => {
            token ? removeFromWatchLater(eachVideo) : navigate("/login");
          }}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export { WatchLaterCard };
