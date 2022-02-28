import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, getUserData, logout } from "../../firebase/firebase";
import { LogOutIcon } from "../../assets/icons/LogOutIcon";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/actions/userData";
import NoImg from "../../assets/no-img.png";
import MenuIcon from "../../assets/icons/MenuIcon";
import SearchBar from "./SearchBar";

export const Header = () => {
  const userData = useSelector((state) => state.userData);
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="w-full sticky z-10 backdrop-blur-xl top-0  border-b border-gray-700 mb-8">
      <div className="h-16 md:hidden flex items-center justify-between px-6">
        <button onClick={() => setIsOpen((state) => !state)}>
          <MenuIcon />
        </button>
        {userData && (
          <img
            onClick={onUserNameClick}
            src={userData.photoURL ? userData.photoURL : NoImg}
            alt="avatar"
            className="rounded-full w-7 h-7 border-2 cursor-pointer"
          />
        )}
      </div>
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-4 duration-75 w-full justify-between items-center font-bold text-xl text-gray-300 px-4 py-4`}
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            className="cursor-pointer text-gray-200"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            className="cursor-pointer text-gray-200"
            to="/shows?page=1"
            onClick={() => setIsOpen(false)}
          >
            Show
          </Link>
          {userData && (
            <Link
              className="cursor-pointer text-gray-200"
              to="/mylist"
              onClick={() => setIsOpen(false)}
            >
              My List
            </Link>
          )}
          <Link
            className="cursor-pointer text-gray-200"
            to="/find-friend"
            onClick={() => setIsOpen(false)}
          >
            Find friends
          </Link>
        </div>
        <div
          className="gap-4 justify-center items-center flex md:flex-row flex-col"
          onClick={() => setIsOpen(false)}
        >
          <SearchBar />
          {userData ? (
            <div className="text-sm font-bold bg-opacity-50 bg-gray-600 text-gray-100 py-2 px-2 rounded-full flex items-center justify-between gap-2 cursor-pointer">
              <img
                onClick={onUserNameClick}
                src={userData.photoURL ? userData.photoURL : NoImg}
                alt="avatar"
                className="rounded-full w-6 h-6"
              />
              <div>{userData.name}</div>
              <button onClick={logOutBtnHandle}>
                <LogOutIcon />
              </button>
            </div>
          ) : (
            <Link
              className="rounded-full font-bold flex justify-around items-center bg-opacity-50 bg-green-800 hover:bg-green-700 px-5 py-2 text-sm"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};
