import React from "react";
import "../VideoListing/VideoListing.css";
import { VideoCard } from "../../Components/VideoCard/VideoCard";
import { useVideoContext } from "../../Context/VideoContext";
import {SideBar} from "../../Components/SideBar/SideBar";

function VideoListing() {
  const { videos } = useVideoContext();
  return (
    <div className="main-container">
      <SideBar />
      <main className="videos-wrapper">
        {videos.map((eachVideo, i) => {
          return <VideoCard eachVideo={eachVideo} key={i} />;
        })}
      </main>
    </div>
  );
}

export { VideoListing };
