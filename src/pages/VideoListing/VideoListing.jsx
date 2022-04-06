import React from "react";
import "../VideoListing/VideoListing.css";
import { VideoCard, SideBar, NavBar } from "../../Components";
import { useVideoContext } from "../../Context/VideoContext";

function VideoListing() {
  const {
    dispatch,
    state: { categoryName },
    getUniqueCategory,
    getFilterByCategory,
  } = useVideoContext();
  return (
    <>
    <NavBar />
    <div className="main-container">
      <SideBar />
      <div className="categories-container">
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
    </div>
    </>
  );
}

export { VideoListing };
