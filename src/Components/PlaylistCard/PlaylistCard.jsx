import React from "react";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from "../../Context/AuthContext";
import "./PlaylistCard.css";
import { usePlaylistContext } from "../../Context/PlaylistContext";
import { useParams,useNavigate } from "react-router-dom";

const PlaylistCard = ({ eachPlaylist }) => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const { title, videos, _id } = eachPlaylist;
  const { deletePlaylist } = usePlaylistContext();
  const { playlistId } = useParams();


  const PlaylistsVideosHandler = () =>{
      navigate(`/playlist/${_id}`)
  }

  return (
    <div className="shadow-card">
      <div className="card-image">
        <img
          src={
            videos?.length === 0
              ? "https://i.pinimg.com/originals/00/8c/75/008c75173308d7ae83aadb3d011303f1.jpg"
              : videos.slice(-1)[0]?.thumbnail
          }
          onClick={()=> PlaylistsVideosHandler()}
          alt={title}
        />
      </div>

      <div className="shadow-card-details space-between">
        <h4 className="playlist-title">
          {title} ({videos.length})
        </h4>
        <span>
          <button
            className="video-action-btn"
            onClick={() => deletePlaylist(_id)}
          >
            <MdDelete />
          </button>
        </span>
      </div>
    </div>
  );
};

export { PlaylistCard };
