import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "../../pages/Home/HomePage";
import { VideoListing } from "../../pages/VideoListing/VideoListing";
import { NavBar } from "../Navigation/NavBar";
import { Login } from "../../pages/Auth/Login";
import { Logout } from "../../pages/Auth/Logout";
import { Signup } from "../../pages/Auth/Signup";
import { LikedVideos } from "../../pages/LikedVideos/LikedVideos";
import { SideBar } from "../SideBar/SideBar";

const AllRoutes = () => {
  const { pathname } = useLocation();
  const Sidebar = () => {
    if (pathname !== "/login" && pathname !== "/" && pathname !== "/signup" && pathname !== "/logout") {
      return <SideBar />;
    }
    return null;
  };

  return (
    <div>
      <NavBar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/videolisting" element={<VideoListing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/likedvideos" element={<LikedVideos />}></Route>
      </Routes>
    </div>
  );
};

export { AllRoutes };
