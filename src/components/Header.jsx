import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "./icons/Search";
import SearchBar from "./SearchBar";

export const Header = () => {
  return (
    <nav className="flex backdrop-blur-lg sticky z-10 top-0 w-full max-w-6xl justify-between items-center shadow-xl font-bold text-xl text-gray-300 px-4 py-2">
      <div className="flex gap-4 justify-center items-center">
        <Link className="cursor-pointer text-gray-200" to="/">
          Home
        </Link>
        <Link className="cursor-pointer text-gray-200" to="/shows?page=1">
          Show
        </Link>
      </div>
      <div className="gap-4 justify-center items-center hidden md:flex">
        <SearchBar />
        <Link
          className="rounded-full font-bold flex justify-around items-center bg-green-800 hover:bg-green-700 px-5 py-2 text-sm"
          to="/login"
        >
          Login
        </Link>
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
