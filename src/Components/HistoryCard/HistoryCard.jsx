import React from "react";
import "../HistoryCard/HistoryCard.css";
import { MdDelete } from "react-icons/md";
import { useHistoryContext } from "../../Context/HistoryContext";

function HistoryCard({ eachVideo }) {
  const { _id,thumbnail, title, description, views } = eachVideo;

  const { removeFromHistory } = useHistoryContext();

  return (
    <div>
      <main className="history-video-wrapper">
        <div className="horizontal-card">
          <div className="video-image">
            <div className="horizontal-card-image">
              <img src={thumbnail} alt={title} />
            </div>
          </div>
          <div className="card-content">
            <div className="card-details space-between">
              <h3 className="card-title ">{title}</h3>
              <span className="delete-btn" onClick={() => removeFromHistory(_id)}>
                {" "}
                <MdDelete />
              </span>
            </div>
            <p className="card-description">{description}</p>
            <div className="card-views">
              <h2>{views} views</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { HistoryCard };
