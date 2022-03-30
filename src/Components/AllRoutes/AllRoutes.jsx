import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/Home/HomePage";
import { VideoListing } from "../../pages/VideoListing/VideoListing";
import { NavBar } from "../Navigation/NavBar";
import {Login} from "../../pages/Auth/Login";
import {Logout} from "../../pages/Auth/Logout";
import {Signup} from "../../pages/Auth/Signup";

const AllRoutes = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path='/videolisting' element={< VideoListing/>}></Route>
        <Route path='/login' element={< Login/>}></Route>
        <Route path='/logout' element={< Logout/>}></Route>
        <Route path='/signup' element={< Signup/>}></Route>
      </Routes>
    </div>
  );
};

export { AllRoutes };
