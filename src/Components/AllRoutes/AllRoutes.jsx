import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/Home/HomePage";
import { VideoListing } from "../../pages/VideoListing/VideoListing";
import { NavBar } from "../Navigation/NavBar";

const AllRoutes = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path='/videolisting' element={< VideoListing/>}></Route>
      </Routes>
    </div>
  );
};

export { AllRoutes };
