import React from "react";
import { WatchLaterCard } from "../../Components/WatchLaterCard/WatchLaterCard";
import { useWatchLaterContext } from "../../Context/WatchLaterContext";
import { SideBar } from "../../Components/SideBar/SideBar";

function WatchLater() {
  const {
    state: { watchLater },
  } = useWatchLaterContext();

  return (
    <div className="main-container">
      <SideBar />
      <main className="videos-wrapper">
        {watchLater.length === 0 ? (
          <div className="starting-text">You haven't added any video yet.</div>
        ) : (
          watchLater.map((eachVideo, i) => {
            return <WatchLaterCard eachVideo={eachVideo} key={i} />;
          })
        )}
      </main>
    </div>
  );
}

export { WatchLater };
