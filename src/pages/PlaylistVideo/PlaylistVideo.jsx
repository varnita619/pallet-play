import React from "react";
import { SideBar, PlaylistVideoCard } from "../../Components/index";
import { useParams } from "react-router-dom";
import { usePlaylistContext } from "../../Context/PlaylistContext";

function PlaylistVideo() {
  const { playlistId } = useParams();

  const {
    state: { playlists },
  } = usePlaylistContext();

  const isPlaylistVideo = playlists.find(
    (eachPlaylist) => eachPlaylist._id === playlistId
  );
  const getAllPlaylistVideo = isPlaylistVideo?.videos;
  console.log(getAllPlaylistVideo);

  return (
    <div className="main-container">
      <SideBar />
      <main className="videos-wrapper">
        {getAllPlaylistVideo.length === 0 ? (
          <div className="starting-text">You haven't added any video yet.</div>
        ) : (
          getAllPlaylistVideo.map((eachVideo) => {
            return <PlaylistVideoCard eachVideo={eachVideo} key={eachVideo._id} />;
          })
        )}
      </main>
    </div>
  );
}

export { PlaylistVideo };
