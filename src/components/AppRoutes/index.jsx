import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import { Login } from "../../pages/Login";
import FavoriteList from "../../pages/FavoriteList";
import { Profile } from "../../pages/Profile";
import { OtherProfile } from "../../pages/Profile/OtherProfile";
import Search from "../../pages/Search";
import { Show } from "../../pages/Show";
import ShowDetail from "../../pages/Show/showDetail";
import { SignIn } from "../../pages/SignIn";
import { useSelector } from "react-redux";
import FindFriend from "../../pages/FindFriend";
const AppRoutes = () => {
  const userData = useSelector((state) => state.userData);
  return (
    <div className="min-h-screen my-8">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/shows" element={<Show />}></Route>
        <Route path="/shows/:id" element={<ShowDetail />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/mylist" element={<FavoriteList />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route path="/profile/:id" element={<OtherProfile />}></Route>
        <Route path="/register" element={<SignIn />}></Route>
        <Route path="/find-friend" element={<FindFriend />}></Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
