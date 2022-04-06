import React from "react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { FaVideo, FaHistory } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { useAuthContext } from "../../Context/AuthContext";
import { useVideoContext } from "../../Context/VideoContext";

function SideBar() {
  const { active } = useVideoContext();

  const { token } = useAuthContext();
  return (
    <div className="sidebar-div">
      <div className={active ? "side-bar-active" : "side-bar"}>
        <div className="side-list">
          <h4 className="list-topic">
            <NavLink
              to="/"
              className={`({ isActive }) => (isActive ? "active" : "not-active") sidebar-icon`}
            >
              <AiFillHome className="sidebar-icon" /> Home
            </NavLink>
          </h4>
        </div>

        <div className="side-list">
          <h4 className="list-topic">
            <NavLink
              to="/videolisting"
              className={`({ isActive }) => (isActive ? "active" : "not-active") sidebar-icon`}
            >
              <FaVideo className="sidebar-icon" /> Explore
            </NavLink>
          </h4>
        </div>

        <div className="side-list">
          <h4 className="list-topic">
            <NavLink
              to="/playlist"
              className={`({ isActive }) => (isActive ? "active" : "not-active") sidebar-icon`}
            >
              <RiPlayListAddFill className="sidebar-icon" /> Playlist
            </NavLink>
          </h4>
        </div>

        <div className="side-list">
          <h4 className="list-topic">
            <NavLink
              to="/likedvideos"
              className={`({ isActive }) => (isActive ? "active" : "not-active") sidebar-icon`}
            >
              <AiFillLike className="sidebar-icon" /> Liked Videos
            </NavLink>
          </h4>
        </div>

        <div className="side-list">
          <h4 className="list-topic">
            <NavLink
              to="/watchlater"
              className={`({ isActive }) => (isActive ? "active" : "not-active") sidebar-icon`}
            >
              <MdWatchLater className="sidebar-icon" /> Watch Later
            </NavLink>
          </h4>
        </div>

        <div className="side-list">
          <h4 className="list-topic">
            <NavLink
              to="/history"
              className={`({ isActive }) => (isActive ? "active" : "not-active") sidebar-icon`}
            >
              <FaHistory /> History
            </NavLink>
          </h4>
        </div>
      </div>
    </div>
  );
}

export { SideBar };
