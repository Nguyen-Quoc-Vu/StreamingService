import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import { Login } from "../../pages/Login";
import Search from "../../pages/Search";
import { Show } from "../../pages/Show";
import ShowDetail from "../../pages/Show/showDetail";
import { SignIn } from "../../pages/SignIn";
const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/shows" element={<Show />}></Route>
      <Route path="/shows/:id" element={<ShowDetail />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<SignIn />}></Route>
    </Routes>
  );
};

export default AppRoutes;
