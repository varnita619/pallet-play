import React from "react";
import "../LikedVideos/LikedVideos.css";
import { MdDelete, MdWatchLater } from "react-icons/md";
import { useLikedVideoContext } from "../../Context/LikedVideosContext";

const LikedVideos = () => {
  const {
    state: { likes },
    removeFromLikes,
  } = useLikedVideoContext();

  return (
    <div className="liked-videos-container">
      {likes?.length === 0 ? (
        <div className="starting-text">You haven't liked any video yet.</div>
      ) : (
        likes.map((eachVideo) => (
          <div className="shadow-card" key={eachVideo._id}>
            <div className="card-image">
              <img src={eachVideo.thumbnail} alt={eachVideo.title} />
            </div>

            <div className="shadow-card-details">
              <h4>{eachVideo.title}</h4>
              <p>{eachVideo.description}</p>
            </div>

            <div className="twin-btn">
              <button className="like-btn" onClick={() => removeFromLikes(eachVideo._id)}>
                <MdDelete />
              </button>
              <button className="like-btn">
                <MdWatchLater />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export { LikedVideos };
