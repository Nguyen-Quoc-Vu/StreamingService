import React from "react";
import { useNavigate } from "react-router-dom";
import HeartIcon from "./icons/HeartIcon";
const ShowCard = ({ thumbnail, name, episode, id }) => {
  const navigate = useNavigate();
  const handleOnCardClick = (id) => {
    navigate(`/shows/${id}`);
  };
  return (
    <div
      className="pb-4 flex flex-col rounded-lg"
      onClick={() => handleOnCardClick(id)}
    >
      <div className="relative h-64">
        <img
          src={
            thumbnail
              ? thumbnail.medium
              : "https://img.lovepik.com/free-png/20210924/lovepik-black-question-mark-png-image_401357217_wh1200.png"
          }
          alt=""
          className="cursor-pointer rounded-t-md w-full h-full"
        />
        <button className="absolute bottom-2 shadow-xl border-gray-600 left-1 backdrop-blur-md shadow-lg float-right rounded-full text-blue-400 hover:text-blue-500 hover:bg-gray-600 font-semibold p-2 mt-2">
          <HeartIcon />
        </button>
      </div>
      <div className="relative text-left px-3 pt-2 cursor-pointer">
        <div className="text-xl font-bold">{name}</div>
        <div className="text-md text-gray-400">{episode}</div>
      </div>
    </div>
  );
};

export default ShowCard;
