import React, { useState } from "react";
import "../SingleVideo/SingleVideo.css";
import { SideBar, VideoIframe, NavBar } from "../../Components";
import { useAuthContext } from "../../Context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import { MdOutlineWatchLater, MdPlaylistAdd } from "react-icons/md";
import { useVideoContext } from "../../Context/VideoContext";
import { useLikedVideoContext } from "../../Context/LikedVideosContext";
import { useWatchLaterContext } from "../../Context/WatchLaterContext";
import { useParams, useNavigate } from "react-router-dom";
import { usePlaylistContext } from "../../Context/PlaylistContext";

function SingleVideo() {
  const { addToLikes } = useLikedVideoContext();
  const { addToWatchLater } = useWatchLaterContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState({ playlist: "" });
  const {
    state: { playlists },
    createPlaylist,
    addToPlaylist,
  } = usePlaylistContext();

  const {
    state: { videos },
  } = useVideoContext();

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

  const video = videos.find((eachVideo) => eachVideo._id === videoId);

  return (
    <>
      <NavBar />
      <div className="main-container">
        <SideBar />
        <main className="single-video-wrapper">
          <div className="video-player">
            <VideoIframe videoId={video?._id} />
          </div>
          <div className="video-description">
            <h4 className="video-player-title">{video?.title}</h4>
            <h5 className="video-player-views"> {video?.description}</h5>
            <span className="video-player-views">{video?.views} views</span>
          </div>

          <div className="action-btn-container">
            <button
              className="action-btn"
              onClick={() => {
                token ? addToLikes() : navigate("/login");
              }}
            >
              <AiOutlineLike /> Like
            </button>
            <button
              className="action-btn"
              onClick={() => {
                token ? addToWatchLater() : navigate("/login");
              }}
            >
              <MdOutlineWatchLater /> Watch Later
            </button>
            <button
              className="action-btn"
              onClick={() => (token ? modalHandler() : navigate("/login"))}
            >
              <MdPlaylistAdd /> Playlist
            </button>
          </div>
        </main>

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
                      onClick={() => addToPlaylist(eachPlaylist, video)}
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
    </>
  );
}

export { SingleVideo };
