import React from "react";
import "../History/History.css";
import { SideBar, HistoryCard } from "../../Components/index";
import { useNavigate } from "react-router-dom";
import { useHistoryContext } from "../../Context/HistoryContext";

function History() {
  const navigate = useNavigate();

  const {
    state: { history },
    clearHistory,
  } = useHistoryContext();

  return (
    <div className="history-container">
      <SideBar />

      <div className="history">History ({history.length})</div>
      <div className="clear-btn-container">
        <button className="clear-btn" onClick={() => clearHistory()}>
          Clear All
        </button>
      </div>

      {history.map((eachVideo, i) => (
        <HistoryCard eachVideo={eachVideo} key={i} />
      ))}
    </div>
  );
}

export { History };
