import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "./icons/Search";

const SearchBar = () => {
  const [searchString, setSearchString] = useState("");
  return (
    <div className="relative mx-auto text-gray-200">
      <input
        className="border-2 border-gray-700 bg-gray-700 h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
        name="search"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Link to={`/search?q=${searchString}`}>
          <SearchIcon />
        </Link>
      </button>
    </div>
  );
};

export default SearchBar;
