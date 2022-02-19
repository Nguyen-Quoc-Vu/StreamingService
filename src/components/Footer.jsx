import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "./icons/Search";
import SearchBar from "./SearchBar";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center shadow-xl mt-24 bg-gray-800 font-bold text-base text-gray-300 px-4 py-2">
      <p>MazeFlix © 2021 All rights reserved. Designed by Vu Nguyen</p>
    </div>
  );
};
