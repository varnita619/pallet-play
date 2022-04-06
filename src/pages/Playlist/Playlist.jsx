import React from "react";
import { PlaylistCard, SideBar, NavBar } from "../../Components";
import { usePlaylistContext } from "../../Context/PlaylistContext";

function Playlist() {
  const {
    state: { playlists },
  } = usePlaylistContext();

  return (
    <>
    <NavBar/>
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
    </>
  );
}

export { Playlist };
