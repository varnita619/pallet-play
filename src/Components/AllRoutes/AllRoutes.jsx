import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/Home/HomePage";
import { NavBar } from "../Navigation/NavBar";

const AllRoutes = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
};

export { AllRoutes };
