import React, { useState } from "react";
import "./VideoCard.css";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { FcPlus } from "react-icons/fc";
import { useLikedVideoContext } from "../../Context/LikedVideosContext";
import { useAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import { useWatchLaterContext } from "../../Context/WatchLaterContext";
import { useHistoryContext } from "../../Context/HistoryContext";
import { RiPlayListAddFill } from "react-icons/ri";
import { usePlaylistContext } from "../../Context/PlaylistContext";

const VideoCard = ({ eachVideo }) => {
  const { _id, title, description, thumbnail, categoryName } = eachVideo;

  const { addToLikes } = useLikedVideoContext();
  const { addToWatchLater } = useWatchLaterContext();
  const { addToHistory } = useHistoryContext();
  const {
    state: { playlists },
    createPlaylist,
    addToPlaylist,
  } = usePlaylistContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState({ playlist: "" });

  const singleVideoHandler = () => {
    navigate(`/video/${_id}`);
    addToHistory(eachVideo);
  };

  const modalHandler = () => {
    setPlaylistModal(true);
  };

  const playlistHandler = () => {
    createPlaylist(playlistName);
  };

  const playlistNameHandler = (event) => {
    setPlaylistName((prev) => ({
      ...prev,
      playlist: event.target.value,
    }));
    if (event.key === "Enter" || event.key === "13") {
      event.preventDefault();
      createPlaylist(playlistName);
    }
  };

  return (
    <div className="shadow-card">
      <div className="card-image" onClick={() => singleVideoHandler()}>
        <img src={thumbnail} alt={title} />
      </div>

      <div className="shadow-card-details">
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{categoryName}</p>
      </div>

      <div className="twin-btn">
        <button
          className="video-action-btn"
          onClick={() => {
            token ? addToLikes(eachVideo) : navigate("/login");
          }}
        >
          <AiFillLike />
        </button>
        <button
          className="video-action-btn"
          onClick={() => {
            token ? addToWatchLater(eachVideo) : navigate("/login");
          }}
        >
          <MdWatchLater />
        </button>

        <button className="video-action-btn" onClick={() => modalHandler()}>
          <RiPlayListAddFill />
        </button>
      </div>

      {/* Playlist Modal */}

      <div
        id="myModal"
        className="modal"
        style={playlistModal ? { display: "flex" } : { display: "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={() => setPlaylistModal(false)}>
            &times;
          </span>
          <h5 className="model-heading">Playlist</h5>
          <div className="model-subheading">
            <div className="display-playlists">
              {playlists?.map((eachPlaylist) => {
                return (
                  <button
                    key={eachPlaylist._id}
                    className="add-to-playlist-btn"
                    onClick={() => addToPlaylist(eachPlaylist, eachVideo)}
                  >
                    <FcPlus className="add-icon" /> {eachPlaylist.title}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              className="playlist-input"
              onChange={(event) => playlistNameHandler(event)}
            ></input>
          </div>
          <div className="add-btn-container">
            <button className="add-btn" onClick={() => playlistHandler()}>
              Create Playlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
