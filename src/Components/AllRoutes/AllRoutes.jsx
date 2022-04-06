import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  LikedVideos,
  SingleVideo,
  HomePage,
  VideoListing,
  Login,
  Logout,
  Signup,
  WatchLater,
  History,
  Playlist,
  PlaylistVideo,
} from "../../pages/index";
import { NavBar } from "../../Components/index";

const AllRoutes = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/videolisting" element={<VideoListing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/likedvideos" element={<LikedVideos />}></Route>
        <Route path="/watchlater" element={<WatchLater />}></Route>
        <Route path="/video/:videoId" element={<SingleVideo />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/playlist" element={<Playlist />}></Route>
        <Route path="/playlist/:playlistId" element={<PlaylistVideo />}></Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export { AllRoutes };
