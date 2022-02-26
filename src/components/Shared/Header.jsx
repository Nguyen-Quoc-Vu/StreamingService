import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, getUserData, logout } from "../../firebase/firebase";
import { LogOutIcon } from "../../assets/icons/LogOutIcon";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/actions/userData";
import NoImg from "../../assets/no-img.png";

export const Header = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setTimeout(() => {
          getUserData(currentUser.uid).then(
            (res) => res && dispatch(setUserData(res))
          );
        }, 100);
        //Wait 1000s for the async task that add data to firestore
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

  const onUserNameClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="flex flex-col md:flex-row gap-4 backdrop-blur-xl sticky z-10 top-0 w-full border-b border-gray-700 justify-between items-center font-bold text-xl text-gray-300 px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
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
        <Link className="cursor-pointer text-gray-200" to="/find-friend">
          Find friends
        </Link>
      </div>
      <div className="gap-4 justify-center items-center flex md:flex-row flex-col">
        <SearchBar />
        {userData ? (
          <div className="text-sm font-bold bg-gray-700 text-gray-200 py-2 px-2 rounded-full flex items-center justify-between gap-2 cursor-pointer">
            <img
              onClick={onUserNameClick}
              src={userData.photoURL ? userData.photoURL : NoImg}
              alt="avatar"
              className="rounded-full w-6 h-6"
            />
            {/* <div
              className="text-green-500 hover:text-green-400 cursor-pointer"
              onClick={onUserNameClick}
            >
              {userData?.name ? userData.name : "Guest"}
            </div> */}
            <button onClick={logOutBtnHandle}>
              <LogOutIcon />
            </button>
          </div>
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
