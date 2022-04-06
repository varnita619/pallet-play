import React from "react";
import { MdDelete } from "react-icons/md";
import {useParams, useNavigate} from "react-router-dom"
import { usePlaylistContext } from "../../Context/PlaylistContext";

const PlaylistVideoCard = ({ eachVideo }) => {
  const { _id, title, description, thumbnail } = eachVideo;
  const { deleteEachVideo } = usePlaylistContext();
  const { playlistId}  = useParams();
  const navigate = useNavigate(); 

  const VideoHandler = () =>{
    navigate(`/video/${_id}`)
  }
 
  return (
    <div className="shadow-card" key={_id}>
      <div className="card-image" onClick={() => VideoHandler()}>
        <img src={thumbnail} alt="card-image" />
      </div>

      <div className="shadow-card-details">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div className="twin-btn">
        <button
          className="video-action-btn"
          onClick={() => deleteEachVideo(eachVideo._id, playlistId)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export { PlaylistVideoCard };
