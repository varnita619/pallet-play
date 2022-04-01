import React from "react";
import "./SideBar.css";
import { NavLink, Link } from "react-router-dom";
import {AiFillHome, AiFillLike} from "react-icons/ai";
import {FaVideo, FaHistory} from "react-icons/fa";
import {RiPlayListAddFill} from "react-icons/ri";
import {MdWatchLater} from "react-icons/md";

function SideBar() {
   const navLink= ({activeLink}) =>{
       return activeLink ? `active` : `not-active`
   } 
  return (
    <>
      <div className="side-bar">
          <Link to='/videolisting'>
        <div className="side-list">
          <h4 className="list-topic"> <AiFillHome /> Home</h4>
        </div>
        </Link>
        <div className="side-list">
          <h4 className="list-topic"> <FaVideo /> Explore</h4>
        </div>
        <div className="side-list">
          <h4 className="list-topic"> < RiPlayListAddFill /> Playlist</h4>
        </div>
        <div className="side-list">
          <h4 className="list-topic"><AiFillLike /> Liked Videos</h4>
        </div>
        <div className="side-list">
          <h4 className="list-topic">< MdWatchLater /> Watch Later</h4>
        </div>
        <div className="side-list">
          <h4 className="list-topic">< FaHistory /> History</h4>
        </div>
      </div>
    </>
  );
}

export { SideBar };
