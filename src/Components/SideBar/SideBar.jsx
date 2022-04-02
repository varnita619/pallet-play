import React from "react";
import "./SideBar.css";
import { NavLink, Link } from "react-router-dom";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { FaVideo, FaHistory } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { useAuthContext } from "../../Context/AuthContext";

function SideBar() {
  const navLink = ({ activeLink }) => ({
    borderBottom: activeLink ? '.2rem solid var(--secondary-color)' : '',
  });
  const { token } = useAuthContext();
  return (
    <div className="main-div">
      <div className="side-bar">
        <NavLink to="/" className={navLink}>
          <div className="side-list">
            <h4 className="list-topic">
              {" "}
              <AiFillHome /> Home
            </h4>
          </div>
        </NavLink>

        <NavLink to="/videolisting" className={navLink}>
          <div className="side-list">
            <h4 className="list-topic">
              {" "}
              <FaVideo /> Explore
            </h4>
          </div>
        </NavLink>

        <div className="side-list">
          <h4 className="list-topic">
            {" "}
            <RiPlayListAddFill /> Playlist
          </h4>
        </div>

        <NavLink to="/likedvideos" className={navLink}>
          <div className="side-list">
            <h4 className="list-topic">
              <AiFillLike /> Liked Videos
            </h4>
          </div>
        </NavLink>

        <NavLink to="/watchlater" className={navLink}>
        <div className="side-list">
          <h4 className="list-topic">
            <MdWatchLater /> Watch Later
          </h4>
        </div>
        </NavLink>

        <div className="side-list">
          <h4 className="list-topic">
            <FaHistory /> History
          </h4>
        </div>
      </div>
    </div>
  );
}

export { SideBar };
