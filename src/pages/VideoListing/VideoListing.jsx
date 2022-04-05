import React from "react";
import "../VideoListing/VideoListing.css";
import { VideoCard } from "../../Components/VideoCard/VideoCard";
import { useVideoContext } from "../../Context/VideoContext";
import { SideBar } from "../../Components/SideBar/SideBar";

function VideoListing() {
  const { dispatch, state: {categoryName}, getUniqueCategory, getFilterByCategory  } = useVideoContext();
  return (
    <div className="main-container">
      <SideBar />

      <div className="categories-wrapper">
          <ul>
            <button
              className={
                categoryName === "ALL"
                  ? "category-list active"
                  : "category-list"
              }
              onClick={() => dispatch({ type: "RESET_FILTER" })}
            >
              All
            </button>

            {getUniqueCategory?.map((eachCategory, i) => (
              <button
                className={
                  eachCategory === categoryName
                    ? "category-list active"
                    : "category-list"
                }
                onClick={() =>
                  dispatch({ type: "GET_CATEGORY_NAME", payload: eachCategory })
                }
                key={i}
              >
                {eachCategory}
              </button>
             ))} 
          </ul>
        </div>

        {/* Video Listing Cards */}
      <main className="videos-wrapper">
        {getFilterByCategory.map((eachVideo) => {
          return <VideoCard eachVideo={eachVideo} key={eachVideo._id} />;
        })}
      </main>
    </div>
  );
}

export { VideoListing };
