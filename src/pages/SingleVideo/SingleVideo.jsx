import React from "react";
import "../SingleVideo/SingleVideo.css";
import { SideBar, VideoIframe } from "../../Components/index";
import { useAuthContext } from "../../Context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineWatchLater, MdPlaylistAdd } from "react-icons/md";
import { useVideoContext } from "../../Context/VideoContext";
import { useLikedVideoContext } from "../../Context/LikedVideosContext";
import { useWatchLaterContext } from "../../Context/WatchLaterContext";
import { useParams, useNavigate } from "react-router-dom";

function SingleVideo() {
  const { addToLikes } = useLikedVideoContext();
  const { addToWatchLater } = useWatchLaterContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const {videoId} = useParams();

  const {
     state: {videos}
  } = useVideoContext();

  const video = videos.find((eachVideo) => eachVideo._id === videoId)

  return (
    <div className="main-container">
      <SideBar />
      <main className="single-video-wrapper">
        <div className="video-player">
          <VideoIframe videoId = {video?._id} />
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
          <button className="action-btn">
            <MdPlaylistAdd /> Playlist
          </button>
        </div>
      </main>
    </div>
  );
}

export { SingleVideo };
