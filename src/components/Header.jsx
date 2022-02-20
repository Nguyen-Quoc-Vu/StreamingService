import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth, getUserData, logout } from "../firebase/firebase";
import { LogOutIcon } from "./icons/LogOutIcon";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/actions/userData";

export const Header = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUserData(currentUser.uid).then((res) => dispatch(setUserData(res)));
      } else {
        dispatch(setUserData(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const logOutBtnHandle = () => {
    if (window.confirm("Do you want to log out?")) {
      logout();
      dispatch(setUserData(null));
    }
  };

  return (
    <nav className="flex backdrop-blur-xl sticky z-10 top-0 w-full max-w-6xl justify-between items-center shadow-xl font-bold text-xl text-gray-300 px-4 py-2">
      <div className="flex gap-4 justify-center items-center">
        <Link className="cursor-pointer text-gray-200" to="/">
          Home
        </Link>
        <Link className="cursor-pointer text-gray-200" to="/shows?page=1">
          Show
        </Link>
        {userData && (
          <Link className="cursor-pointer text-gray-200" to="/mylist">
            My List
          </Link>
        )}
      </div>
      <div className="gap-4 justify-center items-center hidden md:flex">
        <SearchBar />
        {userData ? (
          <button
            className="text-base font-bold bg-gray-700 text-gray-200 py-2 px-3 rounded-full flex items-center gap-2"
            onClick={logOutBtnHandle}
          >
            {userData?.name ? userData.name : "Guest"}

            <LogOutIcon />
          </button>
        ) : (
          <Link
            className="rounded-full font-bold flex justify-around items-center bg-green-800 hover:bg-green-700 px-5 py-2 text-sm"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
      {/* <div className="gap-4 justify-center items-center md:hidden flex">
        <SearchIcon />
        <Link
          className="rounded-full font-bold flex justify-around items-center bg-green-800 hover:bg-green-700 px-5 py-2 text-sm"
          to="/login"
        >
          Login
        </Link>
      </div> */}
    </nav>
  );
};
