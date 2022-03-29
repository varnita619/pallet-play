import React from "react"
import "../VideoListing/VideoListing.css";
import { SideBar } from "../../Components/SideBar/SideBar";
import { VideoCard } from "../../Components/VideoCard/VideoCard";
import { useVideoContext } from "../../Context/VideoContext";

function VideoListing() {
  const {videos} = useVideoContext();
  return (
    <div>
      <div className="main-container">
        <SideBar />

        <main className="products-wrapper">
          {videos.map((eachVideo, i)=>{
            return <VideoCard eachVideo={eachVideo} key={i} />
        })}
        </main>
      </div>
    </div>
  );
}

export { VideoListing };
