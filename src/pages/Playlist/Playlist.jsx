import React from "react";
import "./Playlist.css";
import { SideBar } from "../../Components/SideBar/SideBar";
import { PlaylistCard } from "../../Components/index";
import { usePlaylistContext } from "../../Context/PlaylistContext";
import { useAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

function Playlist() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const {
    state: { playlists },
  } = usePlaylistContext();

  return (
    <div className="main-container">
      <SideBar />
      <main className="videos-wrapper">
        {playlists.length === 0 ? (
          <div className="starting-text">You haven't created any playlist.</div>
        ) : (
          playlists.map((eachPlaylist, i) => {
            return <PlaylistCard eachPlaylist={eachPlaylist} key={i} />;
          })
        )}
      </main>
    </div>
  );
}

export { Playlist };
